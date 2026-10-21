# ngeBall API Contract

Spesifikasi lengkap kontrak API untuk backend ngeBall (Sports Venue Booking & Admin Dashboard).

## Format Autentikasi

- **Metode:** JWT Bearer Token dengan Refresh Token Rotation.
- **Header:** `Authorization: Bearer <accessToken>`
- **User context:** `userId` diambil dari payload JWT, bukan dari request body.
- **Access Token:** umur pendek (5–15 menit), dipakai di setiap request terproteksi.
- **Refresh Token:** umur panjang (7–30 hari), hanya dipakai di `POST /api/auth/refresh`. Disimpan server-side (tabel `refresh_tokens`) sehingga dapat di-revoke saat logout.

### Roles

| Role | Akses |
|---|---|
| Player (user biasa) | Browse courts, buat & lihat booking sendiri, verifikasi akun sendiri |
| Admin | Semua endpoint admin: CRUD sports, court types, courts, users, semua booking, dashboard |

---

## Standard Response Format

### 1. Success Response (Single)
```json
{
  "success": true,
  "data": { ... }
}
```

### 2. Success Response (Paginated List)
```json
{
  "success": true,
  "data": [ ... ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 12,
    "totalPages": 2
  }
}
```

### 3. Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE_IN_UPPER_SNAKE_CASE",
    "message": "Human readable message",
    "details": null
  }
}
```

---

## 1. Auth (`/api/auth`)

### `POST /api/auth/register`
- **Header:** None
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "Password123!",
    "firstName": "John",
    "lastName": "Doe"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "d8f1e4b2a3c74e...",
      "user": {
        "id": "USR-001",
        "email": "john@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "verified": false
      }
    }
  }
  ```

### `POST /api/auth/login`
- **Header:** None
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "Password123!"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "d8f1e4b2a3c74e...",
      "user": {
        "id": "USR-001",
        "email": "john@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "verified": true
      }
    }
  }
  ```

### `POST /api/auth/refresh`
Memperbarui access token yang telah expired menggunakan refresh token yang masih valid.

- **Header:** None
- **Body:**
  ```json
  {
    "refreshToken": "d8f1e4b2a3c74e..."
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "e9a2f5c3b4d85f..."
    }
  }
  ```

### `POST /api/auth/logout`
Mencabut (revoke) refresh token agar tidak dapat digunakan lagi.

- **Header:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "refreshToken": "d8f1e4b2a3c74e..."
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Logged out successfully"
  }
  ```

### `GET /api/auth/me`
- **Header:** `Authorization: Bearer <token>`
- **Body:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "id": "USR-001",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "verified": true
    }
  }
  ```

---

## 2. Sports (`/api/sports`)

### `GET /api/sports?page={page}&limit={limit}`
- **Header:** None
- **Body:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "sport-futsal",
        "name": "Futsal",
        "iconSvg": "<svg viewBox=\"0 0 24 24\">...</svg>",
        "colorHex": "#008236"
      },
      {
        "id": "sport-basketball",
        "name": "Basketball",
        "iconSvg": "<svg viewBox=\"0 0 24 24\">...</svg>",
        "colorHex": "#CA3500"
      }
    ],
    "meta": {
      "page": 1,
      "limit": 10,
      "total": 4,
      "totalPages": 1
    }
  }
  ```

### `GET /api/sports/{id}`
- **Header:** None
- **Body:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "id": "sport-futsal",
      "name": "Futsal",
      "iconSvg": "<svg viewBox=\"0 0 24 24\">...</svg>",
      "colorHex": "#008236"
    }
  }
  ```

### `POST /api/sports` — Admin
- **Header:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "name": "Volleyball",
    "iconSvg": "<svg viewBox=\"0 0 24 24\">...</svg>",
    "colorHex": "#008236"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "id": "sport-volleyball",
      "name": "Volleyball",
      "iconSvg": "<svg viewBox=\"0 0 24 24\">...</svg>",
      "colorHex": "#008236"
    }
  }
  ```

### `PUT /api/sports/{id}` — Admin
- **Header:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "name": "Beach Volleyball",
    "colorHex": "#D08700"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "id": "sport-volleyball",
      "name": "Beach Volleyball",
      "iconSvg": "<svg viewBox=\"0 0 24 24\">...</svg>",
      "colorHex": "#D08700"
    }
  }
  ```

### `DELETE /api/sports/{id}` — Admin
- **Header:** `Authorization: Bearer <token>`
- **Body:** None
- **Response (204 No Content)**

---

## 3. Court Types (`/api/court-types`)

### `GET /api/court-types?sportId={sportId}&page={page}&limit={limit}`
- **Header:** None
- **Body:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "court-type-synthetic-grass-futsal",
        "name": "Synthetic Grass Futsal Court",
        "description": "This court features high-quality artificial turf with rubber infill, providing a soft cushioned surface that reduces impact on joints and minimizes skin abrasions during hard falls.",
        "sportId": "sport-futsal",
        "sport": {
          "id": "sport-futsal",
          "name": "Futsal",
          "iconSvg": "<svg viewBox=\"0 0 24 24\">...</svg>",
          "colorHex": "#008236"
        }
      },
      {
        "id": "court-type-interlock-futsal",
        "name": "Interlock Futsal Court",
        "description": "Constructed from modular polypropylene tiles, this surface offers durable shock absorption and resistance, while its highly perforated design ensures a non-slip grip and consistent ball bounce.",
        "sportId": "sport-futsal",
        "sport": {
          "id": "sport-futsal",
          "name": "Futsal",
          "iconSvg": "<svg viewBox=\"0 0 24 24\">...</svg>",
          "colorHex": "#008236"
        }
      }
    ],
    "meta": {
      "page": 1,
      "limit": 10,
      "total": 6,
      "totalPages": 1
    }
  }
  ```

### `GET /api/court-types/{id}`
- **Header:** None
- **Body:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "id": "court-type-synthetic-grass-futsal",
      "name": "Synthetic Grass Futsal Court",
      "description": "This court features high-quality artificial turf with rubber infill, providing a soft cushioned surface that reduces impact on joints and minimizes skin abrasions during hard falls.",
      "sportId": "sport-futsal",
      "sport": {
        "id": "sport-futsal",
        "name": "Futsal",
        "iconSvg": "<svg viewBox=\"0 0 24 24\">...</svg>",
        "colorHex": "#008236"
      }
    }
  }
  ```

### `POST /api/court-types` — Admin
- **Header:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "name": "Rubber Futsal Court",
    "description": "A high-density rubber surface that offers maximum grip and joint protection for high-intensity training.",
    "sportId": "sport-futsal"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "id": "court-type-rubber-futsal",
      "name": "Rubber Futsal Court",
      "description": "A high-density rubber surface that offers maximum grip and joint protection for high-intensity training.",
      "sportId": "sport-futsal",
      "sport": {
        "id": "sport-futsal",
        "name": "Futsal",
        "iconSvg": "<svg viewBox=\"0 0 24 24\">...</svg>",
        "colorHex": "#008236"
      }
    }
  }
  ```

### `PUT /api/court-types/{id}` — Admin
- **Header:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "name": "Premium Synthetic Grass Futsal",
    "description": "A premium artificial turf with upgraded rubber infill for superior shock absorption."
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "id": "court-type-synthetic-grass-futsal",
      "name": "Premium Synthetic Grass Futsal",
      "description": "A premium artificial turf with upgraded rubber infill for superior shock absorption.",
      "sportId": "sport-futsal",
      "sport": {
        "id": "sport-futsal",
        "name": "Futsal",
        "iconSvg": "<svg viewBox=\"0 0 24 24\">...</svg>",
        "colorHex": "#008236"
      }
    }
  }
  ```

### `DELETE /api/court-types/{id}` — Admin
- **Header:** `Authorization: Bearer <token>`
- **Body:** None
- **Response (204 No Content)**

---

## 4. Courts (`/api/courts`)

### `GET /api/courts?sportId={sportId}&courtTypeId={courtTypeId}&search={query}&page={page}&limit={limit}`
- **Header:** None
- **Body:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "futsal-court-a",
        "name": "Futsal Court A",
        "image": "/images/futsal1.jpg",
        "images": ["/images/futsal1.jpg", "/images/carousel2.jpg"],
        "courtTypeId": "court-type-synthetic-grass-futsal",
        "courtType": {
          "id": "court-type-synthetic-grass-futsal",
          "name": "Synthetic Grass Futsal Court",
          "description": "This court features high-quality artificial turf with rubber infill...",
          "sportId": "sport-futsal"
        },
        "sportId": "sport-futsal",
        "sport": {
          "id": "sport-futsal",
          "name": "Futsal",
          "iconSvg": "<svg viewBox=\"0 0 24 24\">...</svg>",
          "colorHex": "#008236"
        },
        "price": 200000,
        "description": "Professional futsal court with synthetic grass flooring."
      }
    ],
    "meta": {
      "page": 1,
      "limit": 10,
      "total": 12,
      "totalPages": 2
    }
  }
  ```

### `GET /api/courts/{id}`
- **Header:** None
- **Body:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "id": "futsal-court-a",
      "name": "Futsal Court A",
      "image": "/images/futsal1.jpg",
      "images": ["/images/futsal1.jpg", "/images/carousel2.jpg"],
      "courtTypeId": "court-type-synthetic-grass-futsal",
      "courtType": {
        "id": "court-type-synthetic-grass-futsal",
        "name": "Synthetic Grass Futsal Court",
        "description": "This court features high-quality artificial turf with rubber infill...",
        "sportId": "sport-futsal"
      },
      "sportId": "sport-futsal",
      "sport": {
        "id": "sport-futsal",
        "name": "Futsal",
        "iconSvg": "<svg viewBox=\"0 0 24 24\">...</svg>",
        "colorHex": "#008236"
      },
      "price": 200000,
      "description": "Professional futsal court with synthetic grass flooring."
    }
  }
  ```

### `GET /api/courts/{id}/availability?date={YYYY-MM-DD}&duration={minutes}`
Mendapatkan seluruh daftar slot bermain pada tanggal dan durasi tertentu, lengkap dengan status `AVAILABLE` (kosong) atau `BOOKED` (sudah terisi). Frontend menampilkan semua slot dan men-disable slot berstatus `BOOKED`.

- **Header:** None
- **Query Parameters:**
  - `date`: `YYYY-MM-DD` (Wajib)
  - `duration`: `Integer` (Wajib, kelipatan 60 menit, misal `60`, `120`)
- **Response (200 OK):**
  Slot ditentukan oleh `duration` request. Contoh `duration = 60` dengan booking `09:00–10:00` (60 menit) dan `14:00–16:00` (120 menit) — slot `09:00`, `14:00`, dan `15:00` berstatus `BOOKED`:
  ```json
  {
    "success": true,
    "data": {
      "courtId": "futsal-court-a",
      "date": "2026-01-24",
      "duration": 60,
      "occupiedSlots": [
        { "startTime": "09:00", "endTime": "10:00", "duration": 60 },
        { "startTime": "14:00", "endTime": "16:00", "duration": 120 }
      ],
      "slots": [
        { "startTime": "08:00", "endTime": "09:00", "status": "AVAILABLE" },
        { "startTime": "09:00", "endTime": "10:00", "status": "BOOKED" },
        { "startTime": "10:00", "endTime": "11:00", "status": "AVAILABLE" },
        { "startTime": "11:00", "endTime": "12:00", "status": "AVAILABLE" },
        { "startTime": "12:00", "endTime": "13:00", "status": "AVAILABLE" },
        { "startTime": "13:00", "endTime": "14:00", "status": "AVAILABLE" },
        { "startTime": "14:00", "endTime": "15:00", "status": "BOOKED" },
        { "startTime": "15:00", "endTime": "16:00", "status": "BOOKED" },
        { "startTime": "16:00", "endTime": "17:00", "status": "AVAILABLE" },
        { "startTime": "17:00", "endTime": "18:00", "status": "AVAILABLE" },
        { "startTime": "18:00", "endTime": "19:00", "status": "AVAILABLE" },
        { "startTime": "19:00", "endTime": "20:00", "status": "AVAILABLE" },
        { "startTime": "20:00", "endTime": "21:00", "status": "AVAILABLE" },
        { "startTime": "21:00", "endTime": "22:00", "status": "AVAILABLE" },
        { "startTime": "22:00", "endTime": "23:00", "status": "AVAILABLE" }
      ]
    }
  }
  ```
- **Aturan Status Slot:**
  - `AVAILABLE`: rentang `[startTime, endTime]` bebas dari semua booking aktif (`PENDING`, `PAID`, `CONFIRMED`).
  - `BOOKED`: rentang bertabrakan dengan minimal satu booking aktif.
  - Contoh `duration = 120` (dengan booking yang sama): slot `12:00-14:00` dan `16:00-18:00` tersedia, sedangkan `13:00-15:00`, `14:00-16:00`, dan `15:00-17:00` berstatus `BOOKED` karena menabrak booking `14:00–16:00`.

### `POST /api/courts` — Admin
- **Header:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "name": "Futsal Court C",
    "courtTypeId": "court-type-interlock-futsal",
    "sportId": "sport-futsal",
    "price": 220000,
    "description": "Brand new futsal court with LED lighting.",
    "image": "/images/futsal2.jpg",
    "images": ["/images/futsal2.jpg"]
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "id": "futsal-court-c",
      "name": "Futsal Court C",
      "image": "/images/futsal2.jpg",
      "images": ["/images/futsal2.jpg"],
      "courtTypeId": "court-type-interlock-futsal",
      "courtType": { "id": "court-type-interlock-futsal", "name": "Interlock Futsal Court", "sportId": "sport-futsal" },
      "sportId": "sport-futsal",
      "sport": { "id": "sport-futsal", "name": "Futsal", "iconSvg": "<svg viewBox=\"0 0 24 24\">...</svg>", "colorHex": "#008236" },
      "price": 220000,
      "description": "Brand new futsal court with LED lighting."
    }
  }
  ```

### `PUT /api/courts/{id}` — Admin
- **Header:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "price": 230000,
    "description": "Updated description for Futsal Court C."
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "id": "futsal-court-c",
      "name": "Futsal Court C",
      "image": "/images/futsal2.jpg",
      "images": ["/images/futsal2.jpg"],
      "courtTypeId": "court-type-interlock-futsal",
      "courtType": { "id": "court-type-interlock-futsal", "name": "Interlock Futsal Court", "sportId": "sport-futsal" },
      "sportId": "sport-futsal",
      "sport": { "id": "sport-futsal", "name": "Futsal", "iconSvg": "<svg viewBox=\"0 0 24 24\">...</svg>", "colorHex": "#008236" },
      "price": 230000,
      "description": "Updated description for Futsal Court C."
    }
  }
  ```

### `DELETE /api/courts/{id}` — Admin
- **Header:** `Authorization: Bearer <token>`
- **Body:** None
- **Response (204 No Content)**

---

## 5. Bookings (`/api/bookings`)

### `GET /api/bookings?userId={userId}&date={YYYY-MM-DD}&status={status}&page={page}&limit={limit}`
- **Header:** `Authorization: Bearer <token>`
- **Body:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "123123123",
        "userId": "USR-001",
        "user": {
          "id": "USR-001",
          "email": "john@example.com",
          "firstName": "John",
          "lastName": "Doe",
          "verified": true
        },
        "courtId": "futsal-court-a",
        "court": {
          "id": "futsal-court-a",
          "name": "Futsal Court A",
          "price": 200000,
          "description": "FIFA standard interlock court.",
          "image": "/images/futsal1.jpg"
        },
        "totalPrice": 200000,
        "status": "PENDING",
        "date": "2026-01-24",
        "startTime": "19:00",
        "duration": 60,
        "timeline": [
          {
            "id": 1,
            "bookingId": "123123123",
            "status": "BOOKING_PLACED",
            "createdAt": "2026-01-20T16:30:00Z"
          },
          {
            "id": 2,
            "bookingId": "123123123",
            "status": "PAYMENT",
            "createdAt": "2026-01-20T17:00:00Z"
          }
        ]
      }
    ],
    "meta": {
      "page": 1,
      "limit": 10,
      "total": 15,
      "totalPages": 2
    }
  }
  ```

### `GET /api/bookings/{id}`
- **Header:** `Authorization: Bearer <token>`
- **Body:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "id": "123123123",
      "userId": "USR-001",
      "user": {
        "id": "USR-001",
        "email": "john@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "verified": true
      },
      "courtId": "futsal-court-a",
      "court": {
        "id": "futsal-court-a",
        "name": "Futsal Court A",
        "price": 200000,
        "description": "FIFA standard interlock court.",
        "image": "/images/futsal1.jpg"
      },
      "totalPrice": 200000,
      "status": "PENDING",
      "date": "2026-01-24",
      "startTime": "19:00",
      "duration": 60,
      "timeline": [
        {
          "id": 1,
          "bookingId": "123123123",
          "status": "BOOKING_PLACED",
          "createdAt": "2026-01-20T16:30:00Z"
        },
        {
          "id": 2,
          "bookingId": "123123123",
          "status": "PAYMENT",
          "createdAt": "2026-01-20T17:00:00Z"
        }
      ]
    }
  }
  ```

### `POST /api/bookings`
- **Header:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "courtId": "futsal-court-a",
    "date": "2026-01-24",
    "startTime": "19:00",
    "duration": 60
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "id": "123123130",
      "userId": "USR-001",
      "user": { "id": "USR-001", "email": "john@example.com", "firstName": "John", "lastName": "Doe", "verified": true },
      "courtId": "futsal-court-a",
      "court": { "id": "futsal-court-a", "name": "Futsal Court A", "price": 200000 },
      "totalPrice": 200000,
      "status": "PENDING",
      "date": "2026-01-24",
      "startTime": "19:00",
      "duration": 60,
      "timeline": [
        { "id": 1, "bookingId": "123123130", "status": "BOOKING_PLACED", "createdAt": "2026-01-24T18:00:00Z" }
      ]
    }
  }
  ```

### `PATCH /api/bookings/{id}/status`
- **Header:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "status": "CONFIRMED"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "id": "123123123",
      "userId": "USR-001",
      "user": { "id": "USR-001", "email": "john@example.com", "firstName": "John", "lastName": "Doe", "verified": true },
      "courtId": "futsal-court-a",
      "court": { "id": "futsal-court-a", "name": "Futsal Court A", "price": 200000 },
      "totalPrice": 200000,
      "status": "CONFIRMED",
      "date": "2026-01-24",
      "startTime": "19:00",
      "duration": 60,
      "timeline": [
        { "id": 1, "bookingId": "123123123", "status": "BOOKING_PLACED", "createdAt": "2026-01-20T16:30:00Z" },
        { "id": 2, "bookingId": "123123123", "status": "PAYMENT", "createdAt": "2026-01-20T17:00:00Z" },
        { "id": 3, "bookingId": "123123123", "status": "CONFIRMED", "createdAt": "2026-01-20T17:05:00Z" }
      ]
    }
  }
  ```

---

## 6. Users (`/api/users`)

### `GET /api/users?search={query}&page={page}&limit={limit}` — Admin
- **Header:** `Authorization: Bearer <token>`
- **Body:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "USR-001",
        "email": "john@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "verified": true
      }
    ],
    "meta": {
      "page": 1,
      "limit": 10,
      "total": 85,
      "totalPages": 9
    }
  }
  ```

### `GET /api/users/{id}` — Admin
- **Header:** `Authorization: Bearer <token>`
- **Body:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "id": "USR-001",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "verified": true
    }
  }
  ```

### `PATCH /api/users/{id}/verify` — Admin
- **Header:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "verified": true
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "id": "USR-001",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "verified": true
    }
  }
  ```

---

## 7. Admin Dashboard (`/api/admin/dashboard`)

### `GET /api/admin/dashboard` — Admin
- **Header:** `Authorization: Bearer <token>`
- **Body:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "totalRevenue": 24000000,
      "activeBookings": 18,
      "totalUsers": 85,
      "totalCourts": 8,
      "courtOccupancyRateToday": 75.5,
      "peakBookingSchedule": {
        "dayOfWeek": "Saturday",
        "startTime": "19:00",
        "totalBookings": 28
      },
      "topPerformingCourt": {
        "courtId": "futsal-court-a",
        "courtName": "Futsal Court A",
        "totalBookings": 45,
        "revenue": 9000000
      },
      "todaysBookings": 14,
      "bookingTrends": [
        { "month": "2025-04", "count": 10 },
        { "month": "2025-05", "count": 14 },
        { "month": "2025-06", "count": 18 },
        { "month": "2025-07", "count": 22 },
        { "month": "2025-08", "count": 25 },
        { "month": "2025-09", "count": 30 },
        { "month": "2025-10", "count": 28 },
        { "month": "2025-11", "count": 35 },
        { "month": "2025-12", "count": 42 },
        { "month": "2026-01", "count": 40 },
        { "month": "2026-02", "count": 48 },
        { "month": "2026-03", "count": 52 }
      ]
    }
  }
  ```

- **Keterangan Field Dashboard:**
  - `totalRevenue`: Total nominal pembayaran dari booking berstatus `PAID` / `CONFIRMED`.
  - `activeBookings`: Total booking berstatus aktif (`PENDING`, `PAID`, `CONFIRMED`).
  - `totalUsers`: Total akun player yang terdaftar di sistem.
  - `courtOccupancyRateToday`: Persentase okupansi lapangan untuk hari ini (dalam persen, misal `75.5`).
  - `peakBookingSchedule`: Hari dan jam yang paling banyak dipesan sepanjang riwayat booking.
  - `topPerformingCourt`: Lapangan dengan frekuensi booking terbanyak.
  - `todaysBookings`: Jumlah total sesi booking yang dijadwalkan main pada hari ini (`date = TODAY`).
  - `bookingTrends`: Rekap jumlah booking per bulan selama 12 bulan terakhir (termasuk bulan berjalan) untuk visualisasi diagram/grafik di dashboard.

---

## 8. Payments (`/api/payments`)

### `POST /api/bookings/{id}/payments`
Membuat invoice / payment link via Xendit untuk booking tertentu.

- **Header:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "channel": "XENDIT_INVOICE"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "paymentId": "pay-001",
      "bookingId": "123123123",
      "provider": "XENDIT",
      "providerInvoiceId": "inv-xendit-12345",
      "paymentUrl": "https://checkout-staging.xendit.co/v2/invoices/...",
      "amount": 200000,
      "currency": "IDR",
      "status": "PENDING",
      "expiresAt": "2026-01-24T20:00:00Z"
    }
  }
  ```

### `GET /api/payments/{id}`
Mengecek status pembayaran (biasanya untuk polling oleh frontend setelah redirect).

- **Header:** `Authorization: Bearer <token>`
- **Body:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "paymentId": "pay-001",
      "bookingId": "123123123",
      "provider": "XENDIT",
      "providerInvoiceId": "inv-xendit-12345",
      "amount": 200000,
      "currency": "IDR",
      "status": "PAID",
      "paymentMethod": "BCA_VA",
      "paidAt": "2026-01-24T18:30:00Z"
    }
  }
  ```

### `POST /api/webhooks/xendit`
Webhook endpoint yang dipanggil oleh Xendit server-to-server. **Tidak menggunakan JWT**, verifikasi dilakukan lewat Xendit Verification Token.

- **Header:** 
  - `x-callback-token`: `<Xendit Verification Token>`
- **Body (Contoh Xendit Invoice Paid Webhook):**
  ```json
  {
    "id": "inv-xendit-12345",
    "external_id": "pay-001",
    "user_id": "usr-merchant",
    "is_paid": true,
    "status": "PAID",
    "merchant_name": "ngeBall",
    "amount": 200000,
    "paid_amount": 200000,
    "bank_code": "BCA",
    "payment_method": "VIRTUAL_ACCOUNT",
    "payment_channel": "BCA",
    "paid_at": "2026-01-24T18:30:00Z"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Webhook processed successfully"
  }
  ```

---

## 9. Upload (`/api/upload`)

### `POST /api/upload` — Admin / Authenticated
Mengunggah file gambar (misal foto lapangan) ke Cloudinary atau storage provider.

- **Header:** `Authorization: Bearer <token>`
- **Content-Type:** `multipart/form-data`
- **Body Form-Data:**
  - `file`: File gambar (Format: `image/jpeg`, `image/png`, `image/webp`. Maksimal `5MB`).
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "url": "https://res.cloudinary.com/demo/image/upload/v1710000000/courts/futsal-court-a.jpg",
      "publicId": "courts/futsal-court-a",
      "format": "jpg",
      "bytes": 245000
    }
  }
  ```

---

## Error Codes Reference

| HTTP Status | Error Code | Keterangan |
|---|---|---|
| `400` | `VALIDATION_ERROR` | Gagal validasi body/query parameter |
| `401` | `UNAUTHORIZED` | Token JWT tidak ada atau kadaluarsa |
| `403` | `FORBIDDEN` | Role user tidak memiliki akses ke resource ini |
| `404` | `NOT_FOUND` | Data atau endpoint tidak ditemukan |
| `409` | `CONFLICT` | Bentrok jadwal booking / email sudah terdaftar |
| `500` | `INTERNAL_SERVER_ERROR` | Kesalahan tidak terduga pada server |
