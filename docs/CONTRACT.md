# ngeBall Backend Requirements & Architecture Specification

Dokumen ini adalah panduan lengkap arsitektur, skema database, dan aturan bisnis backend **ngeBall**. Backend harus dibangun mengikuti spesifikasi di dokumen ini serta kontrak API pada `docs/api-contract.md`.

---

## 1. Tech Stack Options & Non-Functional Requirements

Proyek ini dirancang agar dapat diimplementasikan menggunakan berbagai teknologi backend (untuk keperluan pembelajaran / perbandingan):

- **Tech Stack Options:**
  - **Node.js:** Express / NestJS / Hono (TypeScript, Prisma ORM / Drizzle / TypeORM).
  - **Bun:** ElysiaJS / Hono (TypeScript, Prisma ORM / Drizzle).
  - **Go:** Gin / Echo / Fiber (GORM / SQLx).
  - **PHP:** Laravel 11+ (Eloquent ORM, Sanctum / JWT Auth).
  - **Python:** FastAPI / Django REST Framework.
- **Database:** PostgreSQL (atau MySQL / MariaDB).
- **Authentication:** JWT (JSON Web Token) dengan Access Token (short-lived) & Refresh Token (long-lived, disimpan di DB dan dapat di-revoke saat logout).
- **Payment Gateway:** Xendit (Invoice API & Webhook).
- **Soft Deletes:** Seluruh tabel menggunakan fitur Soft Delete (`deletedAt` timestamp). Data yang dihapus tidak benar-benar dihapus dari database, melainkan diset nilai `deletedAt`-nya.
- **Audit Timestamps:** Seluruh tabel wajib memiliki `createdAt`, `updatedAt`, dan `deletedAt`.
- **Security:**
  - Password hashing: Bcrypt (min 10 rounds) / Argon2.
  - CORS policy diaktifkan untuk domain frontend.
  - Rate limiting pada endpoint publik (auth login/register).
  - Webhook Xendit **wajib** memvalidasi header `x-callback-token` atau signature.

---

## 2. Database Entity Relationships (ERD)

Seluruh tabel menyertakan kolom standar audit timestamp & soft deletes:
- `createdAt` (TIMESTAMP, DEFAULT NOW(), NOT NULL)
- `updatedAt` (TIMESTAMP, DEFAULT NOW(), NOT NULL)
- `deletedAt` (TIMESTAMP, NULLABLE) — jika bermaksud soft delete

### A. `users`
Menyimpan akun player dan admin.
| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID / String | PK | Unique identifier (e.g. `USR-001`) |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | Email login |
| `password` | VARCHAR(255) | NOT NULL | Hashed password |
| `firstName` | VARCHAR(100) | NOT NULL | Nama depan |
| `lastName` | VARCHAR(100) | NOT NULL | Nama belakang |
| `role` | VARCHAR(20) | NOT NULL, DEFAULT 'PLAYER' | `PLAYER` \| `ADMIN` |
| `verified` | BOOLEAN | DEFAULT FALSE | Status verifikasi akun oleh admin |
| `createdAt` | TIMESTAMP | DEFAULT NOW(), NOT NULL | |
| `updatedAt` | TIMESTAMP | DEFAULT NOW(), NOT NULL | |
| `deletedAt` | TIMESTAMP | NULL | Soft delete timestamp |

### B. `refresh_tokens`
Menyimpan refresh token yang valid untuk tiap sesi user, memungkinkan revocation saat logout atau refresh token rotation.
| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID / String | PK | |
| `userId` | VARCHAR(50) | FK (`users.id`, ON DELETE CASCADE), NOT NULL | User pemilik token |
| `token` | VARCHAR(255) | UNIQUE, NOT NULL | Hashed refresh token |
| `revoked` | BOOLEAN | DEFAULT FALSE, NOT NULL | Status pencabutan token |
| `expiresAt` | TIMESTAMP | NOT NULL | Waktu kadaluarsa token |
| `createdAt` | TIMESTAMP | DEFAULT NOW(), NOT NULL | |
| `updatedAt` | TIMESTAMP | DEFAULT NOW(), NOT NULL | |
| `deletedAt` | TIMESTAMP | NULL | Soft delete timestamp |

### C. `sports`
Kategori olahraga yang didukung (Futsal, Basketball, Tennis, Padel, dll).
| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | VARCHAR(50) | PK | e.g. `sport-futsal` |
| `name` | VARCHAR(100) | NOT NULL | Nama olahraga |
| `iconSvg` | TEXT | NOT NULL | SVG raw string icon |
| `colorHex` | VARCHAR(7) | NOT NULL | Warna tema hex (e.g. `#285A48`) |
| `createdAt` | TIMESTAMP | DEFAULT NOW(), NOT NULL | |
| `updatedAt` | TIMESTAMP | DEFAULT NOW(), NOT NULL | |
| `deletedAt` | TIMESTAMP | NULL | Soft delete timestamp |

### D. `court_types`
Klasifikasi tipe lapangan per olahraga (Indoor, Outdoor, Interlock, etc).
| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | VARCHAR(50) | PK | e.g. `ct-1` |
| `name` | VARCHAR(100) | NOT NULL | Nama tipe |
| `sportId` | VARCHAR(50) | FK (`sports.id`), NOT NULL | Relasi ke sports |
| `createdAt` | TIMESTAMP | DEFAULT NOW(), NOT NULL | |
| `updatedAt` | TIMESTAMP | DEFAULT NOW(), NOT NULL | |
| `deletedAt` | TIMESTAMP | NULL | Soft delete timestamp |

### E. `courts`
Fasilitas lapangan olahraga yang disewakan.
| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | VARCHAR(50) | PK | e.g. `futsal-court-a` |
| `name` | VARCHAR(150) | NOT NULL | Nama lapangan |
| `image` | TEXT | NOT NULL | Cover image URL |
| `images` | TEXT[] / JSON | NULL | Array galeri foto |
| `courtTypeId` | VARCHAR(50) | FK (`court_types.id`), NOT NULL | |
| `sportId` | VARCHAR(50) | FK (`sports.id`), NOT NULL | |
| `price` | DECIMAL(12, 2) | NOT NULL | Harga per jam (dalam rupiah) |
| `description` | TEXT | NULL | Deskripsi fasilitas |
| `createdAt` | TIMESTAMP | DEFAULT NOW(), NOT NULL | |
| `updatedAt` | TIMESTAMP | DEFAULT NOW(), NOT NULL | |
| `deletedAt` | TIMESTAMP | NULL | Soft delete timestamp |

### F. `bookings`
Reservasi lapangan oleh player.
| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | VARCHAR(50) | PK | e.g. `123123123` |
| `userId` | VARCHAR(50) | FK (`users.id`), NOT NULL | Pembuat booking |
| `courtId` | VARCHAR(50) | FK (`courts.id`), NOT NULL | Lapangan yang dipesan |
| `date` | DATE | NOT NULL | Tanggal main (`YYYY-MM-DD`) |
| `startTime` | VARCHAR(50) | NOT NULL | Jam mulai (`19:00`) |
| `duration` | INT | NOT NULL | Durasi dalam menit (misal 60, 120) |
| `totalPrice` | DECIMAL(12, 2) | NOT NULL | `(duration / 60) * court.price` |
| `status` | VARCHAR(30) | NOT NULL, DEFAULT 'PENDING' | `PENDING`, `PAID`, `CONFIRMED`, `REJECTED`, `CANCELLED` |
| `createdAt` | TIMESTAMP | DEFAULT NOW(), NOT NULL | |
| `updatedAt` | TIMESTAMP | DEFAULT NOW(), NOT NULL | |
| `deletedAt` | TIMESTAMP | NULL | Soft delete timestamp |

### G. `booking_timelines`
Riwayat perubahan status booking untuk ditampilkan di UI timeline player.
| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | SERIAL / INT | PK | |
| `bookingId` | VARCHAR(50) | FK (`bookings.id`, ON DELETE CASCADE), NOT NULL | |
| `status` | VARCHAR(50) | NOT NULL | e.g. `BOOKING_PLACED`, `PAYMENT`, `CONFIRMED`, `REJECTED` |
| `createdAt` | TIMESTAMP | DEFAULT NOW(), NOT NULL | |
| `updatedAt` | TIMESTAMP | DEFAULT NOW(), NOT NULL | |
| `deletedAt` | TIMESTAMP | NULL | Soft delete timestamp |

### H. `payments`
Pencatatan transaksi pembayaran via Xendit.
| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | VARCHAR(50) | PK | e.g. `pay-001` |
| `bookingId` | VARCHAR(50) | FK (`bookings.id`), NOT NULL | |
| `provider` | VARCHAR(30) | NOT NULL, DEFAULT 'XENDIT' | |
| `providerInvoiceId` | VARCHAR(150) | UNIQUE, NOT NULL | Xendit Invoice ID |
| `paymentUrl` | TEXT | NOT NULL | URL redirect checkout |
| `amount` | DECIMAL(12, 2) | NOT NULL | |
| `currency` | VARCHAR(10) | DEFAULT 'IDR' | |
| `status` | VARCHAR(30) | NOT NULL, DEFAULT 'PENDING' | `PENDING`, `PAID`, `EXPIRED`, `FAILED` |
| `paymentMethod` | VARCHAR(50) | NULL | e.g. `BCA_VA`, `OVO`, `QRIS` |
| `paidAt` | TIMESTAMP | NULL | Waktu sukses bayar dari webhook |
| `rawPayload` | JSONB / TEXT | NULL | Menyimpan payload mentah dari webhook Xendit untuk audit |
| `createdAt` | TIMESTAMP | DEFAULT NOW(), NOT NULL | |
| `updatedAt` | TIMESTAMP | DEFAULT NOW(), NOT NULL | |
| `deletedAt` | TIMESTAMP | NULL | Soft delete timestamp |

---

## 3. Business Logic & Workflows

### A. Booking & Collision Prevention
1. Saat player membuat booking (`POST /api/bookings`), backend wajib mengecek apakah lapangan pada tanggal, `startTime`, dan `duration` tersebut sudah dibooking orang lain dan statusnya aktif (`PENDING`, `PAID`, `CONFIRMED`) serta belum di-soft delete (`deletedAt IS NULL`).
2. Jika bentrok, kembalikan HTTP `409 Conflict` dengan error code `COURT_ALREADY_BOOKED`.
3. Otomatis buat entri pertama di `booking_timelines` dengan status `BOOKING_PLACED`.

### B. Xendit Payment Integration Flow

> **Prioritas pengerjaan:** Dikerjakan **paling akhir**, setelah seluruh fitur dasar (auth, sports, court types, courts, bookings, users, dashboard) berjalan stabil. Tabel `payments` dan endpoint payment/webhook boleh di-scaffold belakangan. Detail ada di `docs/api-contract.md` section 8.

1. Setelah booking berhasil dibuat, player dapat memicu `POST /api/bookings/{id}/payments`.
2. Backend memanggil Xendit Invoice API (`https://api.xendit.co/v2/invoices`) dengan nominal `totalPrice` booking.
3. Simpan response Xendit ke tabel `payments` (`providerInvoiceId`, `paymentUrl`, `status = PENDING`).
4. Kembalikan `paymentUrl` ke frontend untuk di-redirect.
5. **Webhook Handler (`POST /api/webhooks/xendit`):**
   - Validasi header `x-callback-token`.
   - Cari data `payments` berdasarkan `providerInvoiceId` (`external_id` atau `id` invoice).
   - **Idempotensi:** Jika payment sudah berstatus `PAID`, abaikan proses dan langsung balas HTTP `200` (cegah double processing).
   - Validasi nominal (`amount` di webhook harus sama persis dengan `payments.amount`).
   - Update `payments.status = PAID`, `paymentMethod`, `paidAt`, dan simpan `rawPayload`.
   - Update `bookings.status = PAID` (atau auto-confirm jika diset otomatis), dan tambahkan catatan baru ke `booking_timelines` (`status = PAID` lalu `CONFIRMED`).

### C. Admin Verification & Management
- Admin dapat memverifikasi user (`PATCH /api/users/{id}/verify`).
- Admin dapat melihat semua booking, mengubah status booking menjadi `CONFIRMED` atau `REJECTED`.
- Dashboard admin menghitung agregat pendapatan (`totalRevenue`) hanya dari booking dengan status `PAID` atau `CONFIRMED` yang belum di-soft delete.

---

## 4. Error Handling & Validation Standards

- Semua request body wajib divalidasi menggunakan validator (misal: Zod, Joi, class-validator, atau Request Validation Laravel).
- Jika validasi gagal, kembalikan HTTP `400 Bad Request` dengan struktur error standar:
  ```json
  {
    "success": false,
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Invalid input data",
      "details": [
        { "field": "startTime", "message": "Format should be HH:mm" }
      ]
    }
  }
  ```
- Unauthorized (missing/invalid JWT) mengembalikan HTTP `401` dengan code `UNAUTHORIZED`.
- Forbidden (bukan admin / akses booking milik orang lain) mengembalikan HTTP `403` dengan code `FORBIDDEN`.
