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
| `id` | VARCHAR(50) | PK | e.g. `court-type-synthetic-grass-futsal` |
| `name` | VARCHAR(100) | NOT NULL | Nama tipe |
| `description` | TEXT | NULL | Deskripsi tipe/permukaan lapangan |
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

### A.1 Aturan Validasi Booking (Operational Guardrails)
Seluruh aturan berikut wajib divalidasi di backend. Jika dilanggar, kembalikan HTTP `400 Bad Request` dengan code `VALIDATION_ERROR`.

1. **Jam Operasional:** Venue buka `08:00` – `23:00`. Booking hanya boleh dalam rentang ini; `startTime` paling awal `08:00` dan waktu selesai (`startTime + duration`) tidak boleh melewati `23:00`.
2. **Slot Alignment:** `startTime` wajib tepat pada jam bulat (format `HH:00`, misal `08:00`, `09:00`, `22:00`). Menit selain `:00` ditolak.
3. **Durasi:** Minimal 60 menit dan wajib kelipatan 60 menit (`60`, `120`, `180`, dst).
4. **Tidak Boleh Memesan Waktu Lampau:** Kombinasi `date` + `startTime` tidak boleh lebih kecil dari `NOW()`.
5. **Batas Maksimal Pemesanan ke Depan:** Maksimal 30 hari dari tanggal hari ini (dapat dijadikan konfigurasi env, lihat Section 9).

### A.2 Availability / Slot Query Logic
Digunakan oleh frontend untuk menampilkan seluruh slot jam di kalender/grid booking. Frontend akan men-disable slot yang berstatus `BOOKED`.

- **Endpoint:** `GET /api/courts/{id}/availability?date=YYYY-MM-DD&duration=N` (lihat `docs/api-contract.md` section 4).
- **Algoritma Evaluasi Status Slot:**
  1. Parameter `duration` (dalam menit, kelipatan 60) menentukan panjang blok waktu tiap slot.
  2. Backend mengambil semua booking aktif (`PENDING`, `PAID`, `CONFIRMED`, `deletedAt IS NULL`) pada tanggal tersebut (termasuk booking durasi panjang seperti 120 menit misal `14:00–16:00`).
  3. Backend menyusun seluruh slot jam operasional (`08:00` s.d. `23:00 - duration/60`).
  4. Setiap slot `{ startTime, endTime }` dievaluasi statusnya:
     - **`AVAILABLE`**: jika rentang `[startTime, endTime]` bebas sepenuhnya dari semua booking aktif.
     - **`BOOKED`**: jika rentang `[startTime, endTime]` bertabrakan / beririsan dengan minimal satu booking aktif (misal booking 120 menit `14:00–16:00` menyebabkan slot 60m `14:00–15:00` & `15:00–16:00` berstatus `BOOKED`).
  5. Response dikembalikan pada atribut **`slots`** berupa array objek: `[{ "startTime": "08:00", "endTime": "09:00", "status": "AVAILABLE" }, ...]`. Objek `occupiedSlots` juga disertakan sebagai referensi detail booking aktif.

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

---

## 5. Development Roadmap / Priorities

Kerjakan backend secara bertahap. Setiap fase harus selesai & stabil sebelum lanjut ke fase berikutnya.

### Phase 1 — Foundation & Auth
- Setup project, database migration (semua tabel terdefinisi sejak awal, termasuk `payments` & `refresh_tokens`).
- Seed data awal (sports, court_types, courts, users).
- Auth: register, login, refresh, logout, `GET /api/auth/me`.
- Middleware: JWT guard + role guard (PLAYER vs ADMIN).
- Standard response envelope & error handler.
- Soft delete + audit timestamps di semua model.

### Phase 2 — Master Data CRUD
- Sports: CRUD lengkap + pagination.
- Court Types: CRUD lengkap + filter by `sportId` + pagination.
- Courts: CRUD lengkap + filter (`sportId`, `courtTypeId`), search, pagination.
- Endpoint publik (read-only) dapat diakses tanpa auth.

### Phase 3 — Bookings Core
- `POST /api/bookings` + collision prevention.
- `GET /api/bookings` (filter `userId`/`date`/`status` + pagination) & `GET /api/bookings/{id}`.
- `PATCH /api/bookings/{id}/status`.
- Auto-create `booking_timelines` di tiap perubahan status.
- **Tanpa** payment gateway dulu — booking berstatus `PENDING`/`CONFIRMED` manual oleh admin.

### Phase 4 — Users & Dashboard
- `GET /api/users` (search + pagination), `GET /api/users/{id}`, `PATCH /api/users/{id}/verify`.
- `GET /api/admin/dashboard` (agregat `totalRevenue`, `activeBookings`, `totalUsers`, `courtOccupancyRateToday`, `peakBookingSchedule`, `topPerformingCourt`, `todaysBookings`, `bookingTrends`).

### Phase 5 — Payment Gateway (Terakhir)
- Integrasi Xendit: `POST /api/bookings/{id}/payments`, `GET /api/payments/{id}`, webhook `POST /api/webhooks/xendit`.
- Validasi signature, idempotency, auto-confirm booking saat `PAID`.
- Uji di Xendit sandbox sebelum go-live.
- Detail: `docs/api-contract.md` section 8 & `docs/CONTRACT.md` section 3.B.

### Cross-Cutting (seluruh fase)
- Unit/integration test untuk logic kritis (collision, auth, webhook).
- Dokumentasi API tooling (OpenAPI/Swagger opsional) sinkron dengan `docs/api-contract.md`.
- Rate limiting & CORS aktif sejak Phase 1.

---

## 6. Race Conditions, Edge Cases & Failure Mitigation

Berikut masalah-masalah teknis yang berpotensi terjadi dan penanganan standar yang harus diimplementasikan di backend:

### A. Double Booking / Race Condition Collision
- **Masalah:** Dua user menekan tombol booking untuk lapangan & slot waktu yang sama persis pada milidetik yang sama. Keduanya lulus pengecekan ketersediaan dan membuat booking ganda.
- **Solusi:**
  1. **Database Transaction + Locking:** Gunakan transaksi database dengan *Pessimistic Locking* (`SELECT ... FOR UPDATE` pada baris `courts` / baris `bookings` terkait) saat memproses booking baru.
  2. **Database Exclusion Constraint (PostgreSQL):** Tambahkan `EXCLUDE` constraint dengan operator range waktu (`tsrange`) untuk menjamin di level database tidak bisa ada dua booking aktif (`status != 'CANCELLED'`) yang bertampalan jam/tanggalnya di lapangan yang sama.

### B. Ghost Bookings & Unpaid Slot Holding
- **Masalah:** User membuat booking, slot terkunci (`PENDING`), tetapi user tidak menyelesaikan pembayaran. Slot terus terkunci dan merugikan venue.
- **Solusi:**
  1. **Hold Expiry Timer:** Tetapkan batas waktu pembayaran (misal 15–30 menit).
  2. **Background Job / Cron Worker:** Buat scheduled job (misal tiap 1 menit) untuk mengubah status booking `PENDING` yang sudah melewati `expiresAt` menjadi `CANCELLED`, lalu melepaskan slot.

### C. Webhook Duplicate / Retries (Idempotency)
- **Masalah:** Xendit dapat mengirimkan webhook yang sama beberapa kali karena retry kebijakan jaringan atau delay HTTP response.
- **Solusi:**
  1. **Unique Constraint:** Pastikan kolom `providerInvoiceId` pada tabel `payments` bersifat `UNIQUE`.
  2. **Idempotency Check:** Sebelum memproses webhook, cek apakah payment sudah berstatus `PAID`. Jika sudah, kembalikan HTTP `200 OK` tanpa memproses ulang logika bisnis (tidak memicu ulang perubahan status atau timeline).

### D. Late Webhook Payment After Cancellation
- **Masalah:** User baru membayar di Xendit tepat saat/setelah slot dibatalkan oleh cron job atau admin.
- **Solusi:**
  1. Jika webhook `PAID` diterima untuk booking yang sudah berstatus `CANCELLED`, catat payment status sebagai `PAID_AFTER_CANCELLED` / `NEED_REFUND`.
  2. Kirim notifikasi/flag ke admin dashboard untuk penanganan pengembalian dana (refund) manual atau re-booking.

### E. Soft Delete Unique Constraint Conflicts
- **Masalah:** User menghapus akun (soft delete `deletedAt IS NOT NULL`), lalu mendaftar ulang menggunakan email yang sama. Unique constraint bawaan database akan menolak registrasi.
- **Solusi:**
  1. **Partial Unique Index:** Buat unique index khusus yang hanya berlaku untuk record aktif:
     `CREATE UNIQUE INDEX users_email_active_idx ON users (email) WHERE deleted_at IS NULL;`
  2. Terapkan pola serupa untuk data master yang memiliki constraint nama/kode unik.

### F. Timezone & Clock Skew Mismatch
- **Masalah:** Perbedaan zona waktu antara server aplikasi, database PostgreSQL, Xendit, dan device user (WIB UTC+7 vs UTC).
- **Solusi:**
  1. Seluruh timestamp (`createdAt`, `updatedAt`, `deletedAt`, `paidAt`) **wajib** disimpan dalam UTC (format ISO 8601 / `TIMESTAMP WITH TIME ZONE`).
  2. Tanggal main (`date`) disimpan sebagai `DATE` murni (`YYYY-MM-DD`).
  3. Konversi ke zona waktu lokal (WIB / Asia/Jakarta) hanya dilakukan di layer presentasi / frontend.

### G. Concurrent Status Modification (Race Condition Admin vs Webhook)
- **Masalah:** Admin mengubah status booking menjadi `REJECTED` di saat yang sama webhook Xendit mengirimkan status `PAID`.
- **Solusi:**
  1. **State Machine Guard:** Terapkan aturan transisi status yang ketat. Transisi dari `PAID` / `CONFIRMED` ke `REJECTED` harus melalui mekanisme pembatalan resmi, bukan override langsung.
  2. Transaksi atomic saat mengubah status booking & menambahkan timeline.

---

## 7. File / Image Upload Handling

Untuk menyimpan gambar fasilitas lapangan (`courts.image`, `courts.images[]`):
- **Rekomendasi Penyimpanan (Mudah & Gratis):**
  - **Cloudinary (Free Tier):** Sangat direkomendasikan untuk proyek belajar. Menyediakan kuota gratis selamanya (25 credits/bulan), tanpa kartu kredit, fitur transformasi gambar otomatis (resize, crop, webp conversion), dan CDN global yang cepat.
  - **Alternatif (Supabase Storage):** Jika menggunakan Supabase sebagai database/backend-as-a-service, Supabase Storage memberikan 1GB free storage S3-compatible.
  - **Local Disk (Development):** Menyimpan file di folder `public/uploads` pada disk server lokal (hanya untuk local testing).
- **Aturan Upload:**
  - Endpoint upload: `POST /api/upload` (multipart/form-data).
  - Validasi: Format file wajib gambar (`image/jpeg`, `image/png`, `image/webp`), ukuran maksimal `5MB`.
  - Backend mengunggah file ke Cloudinary/Storage lalu mengembalikan URL publik untuk disimpan di database.

---

## 8. Database Indexing Strategy (Performance)

Untuk memastikan performa query tetap optimal (terutama collision check dan pencarian), pastikan index berikut dibuat di database:

```sql
-- Cepat untuk collision check booking aktif per lapangan
CREATE INDEX idx_bookings_active_collision ON bookings (court_id, date, status) WHERE deleted_at IS NULL AND status IN ('PENDING', 'PAID', 'CONFIRMED');

-- Cepat untuk filter courts di halaman publik
CREATE INDEX idx_courts_filter ON courts (sport_id, court_type_id) WHERE deleted_at IS NULL;

-- Cepat untuk validasi refresh token saat rotasi/logout
CREATE INDEX idx_refresh_tokens_token ON refresh_tokens (token) WHERE revoked = FALSE AND deleted_at IS NULL;

-- Partial unique index untuk user email anti bentrok dengan soft delete
CREATE UNIQUE INDEX idx_users_email_active ON users (email) WHERE deleted_at IS NULL;
```

---

## 9. Environment Variables Template (`.env.example`)

Backend wajib menyediakan file `.env.example` dengan variabel-variabel berikut:

```env
# App Configuration
PORT=5000
NODE_ENV=development
APP_URL=http://localhost:5000
MAX_ADVANCE_BOOKING_DAYS=30

# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/ngeball_db

# JWT Secrets
JWT_ACCESS_SECRET=your_super_secret_access_key_min_32_chars
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_super_secret_refresh_key_min_32_chars
JWT_REFRESH_EXPIRES_IN=7d

# Xendit Payment Gateway (Phase 5)
XENDIT_SECRET_KEY=xnd_development_...
XENDIT_CALLBACK_TOKEN=your_xendit_webhook_verification_token

# Image Upload (Cloudinary)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Security & CORS
CORS_ORIGIN=http://localhost:3000
```

---

## 10. Initial Seed Data & Default Accounts

Saat migrasi pertama, database harus di-seed dengan data awal agar sesuai dengan mock aplikasi frontend:

### A. Default Users (Password untuk semua: `Password123!`)
1. **Admin Account:**
   - Email: `admin@ngeball.com`
   - Role: `ADMIN`
   - Verified: `true`
2. **Player Accounts:**
   - Email: `john.doe@example.com` (`Player 1`, Verified: `true`)
   - Email: `jane.smith@example.com` (`Player 2`, Verified: `false`)

### B. Master Data Sports
Tabel `sports` harus di-seed dengan 4 cabang olahraga berikut (termasuk icon SVG-nya):

1. **Futsal**
   - `id`: `sport-futsal`
   - `name`: `Futsal`
   - `colorHex`: `#008236`
   - `iconSvg`:
     ```svg
     <path d="M48 91C71.7482 91 91 71.7482 91 48C91 24.2518 71.7482 5 48 5C24.2518 5 5 24.2518 5 48C5 71.7482 24.2518 91 48 91Z" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M47.5699 25.21C47.5699 25.21 34.67 30.8 26.07 40.69C26.07 40.69 26.07 56.17 34.24 66.06C34.24 66.06 47.5699 69.07 60.8999 66.06C60.8999 66.06 69.0699 56.17 69.0699 40.69C69.0699 41.12 60.4699 30.8 47.5699 25.21ZM47.5699 25.21V5M69.0699 41.12C69.0699 41.12 81.9699 35.1 88.4199 34.24M60.8999 66.49C60.8999 66.49 69.0699 78.1 73.3699 82.4M34.24 66.49C34.24 66.49 26.07 78.1 22.2 82.4" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.57983 33.8098C13.5998 35.0998 26.4998 41.1198 26.4998 41.1198" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
     ```

2. **Basketball**
   - `id`: `sport-basketball`
   - `name`: `Basketball`
   - `colorHex`: `#CA3500`
   - `iconSvg`:
     ```svg
     <path fill-rule="evenodd" clip-rule="evenodd" d="M81.9417 14.0584C100.686 32.8028 100.686 63.1972 81.9417 81.9417C63.1972 100.686 32.8028 100.686 14.0584 81.9417C-4.68612 63.1972 -4.68612 32.8028 14.0584 14.0584C32.8028 -4.68612 63.1972 -4.68612 81.9417 14.0584ZM48 54.7874L24.4506 78.3368C30.8982 83.3533 38.7823 86.1742 46.9488 86.3866C46.6962 77.5007 49.5421 68.8037 54.9986 61.7859L48 54.7874ZM61.858 68.6453C58.3716 73.5516 56.51 79.4269 56.5346 85.4457C62.0005 84.2089 67.1268 81.7834 71.5494 78.3416L61.858 68.6453ZM34.2093 41.0014C27.1928 46.4569 18.4977 49.3027 9.61344 49.0512C9.82029 56.647 12.276 64.0106 16.6696 70.2102L17.6632 71.5494L41.2126 48L34.2093 41.0014ZM85.4457 56.5346C79.9088 56.5113 74.4824 58.0845 69.8166 61.0659L68.6453 61.858L78.3416 71.5494C81.7834 67.1268 84.2089 62.0005 85.4457 56.5346ZM78.3416 24.4506L54.7826 48L61.7812 54.9986C68.7989 49.5421 77.4959 46.6962 86.3818 46.9488C86.1749 39.353 83.7192 31.9894 79.3256 25.7898L78.332 24.4506H78.3416ZM49.0512 9.61344C49.2818 17.9485 46.7932 26.1321 41.9615 32.9276L41.0014 34.2141L48 41.2126L71.5494 17.6632C65.1018 12.6467 57.2177 9.82579 49.0512 9.61344ZM17.6584 24.4506C14.2166 28.8732 11.7911 33.9995 10.5543 39.4654C16.0913 39.4887 21.5176 37.9155 26.1835 34.9341L27.3547 34.1421L17.6584 24.4506ZM39.4654 10.5543C33.9995 11.7911 28.8732 14.2166 24.4506 17.6584L34.1421 27.3595C37.6284 22.4532 39.49 16.5731 39.4654 10.5543Z" fill="currentColor"/>
     ```

3. **Tennis**
   - `id`: `sport-tennis`
   - `name`: `Tennis`
   - `colorHex`: `#C10007`
   - `iconSvg`:
     ```svg
     <path d="M42.41 16.5689C55.31 3.66892 74.23 1.08892 84.55 11.4089C94.87 21.7289 92.29 40.6489 79.39 53.5489C74.2908 58.7108 67.9087 62.4213 60.9 64.2989C51.87 66.4489 43.27 64.7289 37.25 58.7089C31.23 52.6889 29.51 44.0889 31.66 35.0589C33.5377 28.0502 37.2482 21.6682 42.41 16.5689Z" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M31.66 35.0588L22.2 73.7588M22.2 73.7588L60.9 64.2988M22.2 73.7588L5 90.9588" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M82.4 90.9588C87.1497 90.9588 91 87.1084 91 82.3588C91 77.6091 87.1497 73.7588 82.4 73.7588C77.6504 73.7588 73.8 77.6091 73.8 82.3588C73.8 87.1084 77.6504 90.9588 82.4 90.9588Z" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
     ```

4. **Padel**
   - `id`: `sport-padel`
   - `name`: `Padel`
   - `colorHex`: `#1447E6`
   - `iconSvg`:
     ```svg
     <path d="M76.8 91.6363L51.3818 66.3272L48.3273 69.3817C46.6545 71.0544 44.7462 72.3272 42.6022 73.1999C40.4582 74.0726 38.2575 74.509 36 74.509C33.7425 74.509 31.5244 74.0726 29.3455 73.1999C27.1665 72.3272 25.2393 71.0544 23.5636 69.3817L5.12727 50.8363C3.45455 49.1635 2.18182 47.2552 1.30909 45.1112C0.436363 42.9672 0 40.7664 0 38.509C0 36.2515 0.436363 34.0523 1.30909 31.9112C2.18182 29.7701 3.45455 27.8603 5.12727 26.1817L17.4545 13.8544C19.1273 12.1817 21.0371 10.909 23.184 10.0363C25.3309 9.16353 27.5302 8.72716 29.7818 8.72716C32.0335 8.72716 34.2342 9.16353 36.384 10.0363C38.5338 10.909 40.4422 12.1817 42.1091 13.8544L60.6545 32.2908C62.3273 33.9635 63.6 35.8908 64.4727 38.0726C65.3455 40.2544 65.7818 42.4726 65.7818 44.7272C65.7818 46.9817 65.3455 49.1824 64.4727 51.3293C63.6 53.4763 62.3273 55.3846 60.6545 57.0544L57.6 60.109L82.9091 85.5272L76.8 91.6363Z" fill="currentColor"/>
     ```

### C. Master Data Court Types
Tabel `court_types` harus di-seed dengan 6 tipe lapangan berikut (ID format: `court-type-[slug]`, disertai `description`):

1. **Synthetic Grass Futsal Court**
   - `id`: `court-type-synthetic-grass-futsal`
   - `name`: `Synthetic Grass Futsal Court`
   - `sportId`: `sport-futsal`
   - `description`: `This court features high-quality artificial turf with rubber infill, providing a soft cushioned surface that reduces impact on joints and minimizes skin abrasions during hard falls.`

2. **Interlock Futsal Court**
   - `id`: `court-type-interlock-futsal`
   - `name`: `Interlock Futsal Court`
   - `sportId`: `sport-futsal`
   - `description`: `Constructed from modular polypropylene tiles, this surface offers durable shock absorption and resistance, while its highly perforated design ensures a non-slip grip and consistent ball bounce.`

3. **Vynil Futsal Court**
   - `id`: `court-type-vynil-futsal`
   - `name`: `Vynil Futsal Court`
   - `sportId`: `sport-futsal`
   - `description`: `A professional-grade surface made of high-density PVC layers, this durable material offers superior shock absorption and maximum traction for very quick directional changes during fast play.`

4. **Indoor Basketball Court**
   - `id`: `court-type-indoor-basketball`
   - `name`: `Indoor Basketball Court`
   - `sportId`: `sport-basketball`
   - `description`: `An enclosed facility featuring a polished hardwood or high-performance synthetic floor, this controlled environment eliminates weather variables for a consistent ball bounce and stable playing temperature.`

5. **Indoor Tennis Court**
   - `id`: `court-type-indoor-tennis`
   - `name`: `Indoor Tennis Court`
   - `sportId`: `sport-tennis`
   - `description`: `A controlled environment with a hard-court or carpet surface designed to eliminate wind and sun interference, providing reliable, predictable ball trajectories and a consistently stable pace.`

6. **Padel Court**
   - `id`: `court-type-padel`
   - `name`: `Padel Court`
   - `sportId`: `sport-padel`
   - `description`: `A specialized court enclosed by glass and mesh walls, one-third the size of a tennis court, where rebounds off the walls reward strategy over raw power.`
