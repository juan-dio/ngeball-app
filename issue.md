# Task: Implementasi Halaman Daftar Booking Admin (Admin Bookings)

> **📋 Wajib Baca:** Sebelum mulai menulis kode, baca dan ikuti seluruh konvensi proyek yang terdefinisi di [`AGENTS.md`](./AGENTS.md). File tersebut berisi aturan wajib tentang sistem warna, tipografi, komponen reusable, dan standar kode untuk proyek ini.

## Deskripsi Tugas

Tugas ini adalah membangun halaman **Daftar Booking Admin** (`/admin/bookings`) untuk aplikasi **ngeBall** berdasarkan desain Figma yang telah dilampirkan. Halaman ini dibangun menggunakan **Next.js (App Router)** dan *library* **shadcn/ui**.

Layout kerangka admin (sidebar dan header) menggunakan `<AdminShell />` yang sudah tersedia di layout admin (`src/app/(admin)/layout.tsx`), sehingga tugas ini hanya berfokus pada pembuatan **konten utama halaman daftar booking**. Data booking pada tabel menggunakan data dummy terlebih dahulu.

[![Desain Bookings Desktop](https://github.com/juan-dio/ngeball-app/blob/main/public/docs/admin/bookings-desktop.png?raw=true)](https://github.com/juan-dio/ngeball-app/blob/main/public/docs/admin/bookings-desktop.png?raw=true)

---

## Spesifikasi Desain (CSS Figma)

Desain di bawah telah dipetakan ke token desain dan konvensi proyek. Gunakan token/utilitas yang sesuai — jangan hardcode warna hex atau ukuran secara manual.

- **Background Konten:** `#F1F5F9` (`bg-background`).
- **Kartu Utama Pembungkus Tabel (Frame 202):**
  - Background putih (`bg-white`), border-radius `16px` (`rounded-[16px]`), padding `24px`.
- **Bagian Filter & Pencarian (Frame 204):**
  - **Search Input:** Input pencarian dengan ikon `Search` dari `lucide-react`, placeholder `"Search booking"`, lebar max `320px`, tinggi `40px`.
  - **Date Range Selector / Filter Tanggal:** Input filter rentang tanggal dengan ikon kalender, menampilkan teks contoh `"Jan 20, 2026 - Feb 20, 2026"`, lebar `240px`, tinggi `40px`.
  - **Dropdown Filter:** Filter dropdown opsi dengan teks contoh `"Dropdown"` dan ikon panah/chevron, lebar `144px`, tinggi `40px`.
- **Tabel Daftar Booking (Frame 210 & Frame 203):**
  - **Header Tabel (Frame 203):** Berisi kolom `ID`, `Name`, `Court`, `Date`, `Schedule`, `Payment`, `Actions`. Border bawah `1px solid #E6E6E6` (`border-border`), teks rata tengah (`text-center`), warna `#0F172B` (`text-text-primary`).
  - **Baris Data Booking (Booking Row):**
    - Menggunakan background selang-seling/striped (`bg-background` `#F1F5F9` untuk baris ganjil/tertentu dan `bg-white` untuk baris lainnya).
    - **Kolom ID, Name, Court, Date, Schedule:** Teks rata tengah (`text-center`), warna `#0F172B` (`text-text-primary`), ukuran teks 14px (`text-small`).
    - **Kolom Payment (Status Badge):** Badge status pembayaran `"Paid"` dengan background transparan hijau `rgba(0, 201, 80, 0.1)`, border `2px solid #00A63E` (`border-success`), border-radius `24px`, teks berwarna `#00A63E` (`text-success`). (Gunakan komponen `<BookingStatus />` yang sudah ada jika sesuai).
    - **Kolom Actions:** Tombol/ikon aksi titik tiga vertical/ellipsis (`EllipsisVertical` / `MoreVertical` dari `lucide-react`).
- **Paginasi (Frame 211 / Pagination):**
  - Komponen paginasi di bagian bawah tabel dengan navigasi `"Previous"`, nomor halaman (`1`, `2`, `3`, `...`), dan `"Next"`. Gunakan komponen pagination dari **shadcn/ui** (`Pagination`).

---

## Tahapan Implementasi

### 1. Persiapan File & Struktur Data Dummy
- Buka file route yang sudah tersedia: `src/app/(admin)/admin/bookings/page.tsx`.
- Siapkan struktur data dummy untuk daftar booking (ID booking, nama pemesan, nama lapangan, tanggal, jam/jadwal, status pembayaran, dll.).

### 2. Implementasi Layout Konten Utama
- Susun kontainer utama halaman dengan background `#F1F5F9` dan padding yang sesuai.
- Buat kartu putih pembungkus utama (`Card` / `div`) dengan border-radius `16px` (`rounded-[16px]`) dan padding `24px`.

### 3. Implementasi Toolbar Filter & Pencarian
- Buat baris filter bagian atas menggunakan *flex row* dengan *gap* 16px (`gap-4`).
- Tambahkan komponen **Input Pencarian** menggunakan `<Input />` dari shadcn/ui dengan ikon pencarian.
- Tambahkan komponen **Filter Tanggal** dan **Dropdown Status/Filter**.

### 4. Implementasi Tabel Daftar Booking
- Buat struktur tabel (menggunakan tag HTML `table` / komponen shadcn Table).
- Susun **Header Tabel** dengan 7 kolom: `ID`, `Name`, `Court`, `Date`, `Schedule`, `Payment`, `Actions`.
- Map data dummy ke dalam **Baris Tabel**:
  - Terapkan warna background selang-seling pada baris data.
  - Tampilkan badge status pembayaran pada kolom `Payment`.
  - Tampilkan tombol menu aksi titik tiga pada kolom `Actions`.

### 5. Implementasi Paginasi
- Tambahkan komponen paginasi di bawah tabel.
- Gunakan komponen `Pagination` dari shadcn/ui (`bunx --bun shadcn@latest add pagination` jika belum ada) atau salin pola paginasi yang ada di proyek.

### 6. Verifikasi & Pengujian
- Jalankan `bun run lint` untuk memastikan tidak ada kesalahan linter/sintaks.
- Jalankan `bunx tsc --noEmit` untuk verifikasi tipe TypeScript.
- Jalankan `bun run build` untuk memastikan proyek dapat di-build dengan sukses.
- Bandingkan tampilan dengan gambar desain `public/docs/admin/bookings-desktop.png`.

---

## Definisi Selesai (Definition of Done)
- Halaman `/admin/bookings` menampilkan seluruh elemen filter, tabel daftar booking dengan data dummy, status badge, dan paginasi sesuai desain Figma.
- Menggunakan komponen dari shadcn/ui dan ikon `lucide-react`.
- Mengikuti konvensi warna, tipografi, dan struktur file dari `AGENTS.md`.
- Lolos `bun run lint`, `bunx tsc --noEmit`, dan `bun run build`.
