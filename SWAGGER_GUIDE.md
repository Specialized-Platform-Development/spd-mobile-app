# Panduan Swagger API Documentation

## 📚 Apa itu Swagger?

Swagger (OpenAPI) adalah tools untuk membuat dokumentasi API yang **interaktif**. Dengan Swagger, Anda bisa:

- Melihat semua endpoint API dengan detail
- Test API langsung dari browser tanpa Postman
- Melihat schema request dan response
- Mendapatkan dokumentasi yang selalu update otomatis

---

## ✅ Yang Sudah Diimplementasikan

### 1. **Packages yang Diinstall**

```bash
npm install swagger-ui-express swagger-jsdoc
```

- `swagger-ui-express`: Menyediakan UI untuk Swagger
- `swagger-jsdoc`: Generate dokumentasi dari JSDoc comments

### 2. **File Konfigurasi Swagger**

**File:** `src/config/swagger.js`

File ini berisi:

- Informasi API (title, version, description)
- Server URLs (development & production)
- Security schemes (JWT Bearer token)
- Schemas (User, Product, Response formats)
- Tags untuk grouping endpoints

### 3. **Integrasi di Express App**

**File:** `src/app.js`

Swagger UI sudah dimount di route `/api-docs`:

```javascript
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Online Marketplace API Documentation",
  }),
);
```

### 4. **JSDoc Annotations di Routes**

Setiap endpoint sudah ditambahkan JSDoc comments dengan format:

```javascript
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", validateRegister, register);
```

---

## 🚀 Cara Menggunakan Swagger Documentation

### 1. **Akses Swagger UI**

Buka browser dan kunjungi:

```
http://localhost:5001/api-docs
```

Anda akan melihat dokumentasi interaktif dengan semua endpoint yang dikelompokkan berdasarkan:

- **Authentication** - Login, Register, Get Profile
- **Users** - Update Profile, Delete Account
- **Products** - CRUD Products

### 2. **Test Endpoint Public**

Untuk endpoint yang tidak memerlukan authentication (GET products, Register, Login):

1. Klik endpoint yang ingin ditest (misalnya `GET /api/products`)
2. Klik tombol **"Try it out"**
3. Klik **"Execute"**
4. Lihat response di bagian bawah

### 3. **Test Endpoint Protected (Dengan JWT)**

Untuk endpoint yang memerlukan authentication:

#### Step 1: Login untuk mendapatkan token

1. Buka endpoint `POST /api/auth/login`
2. Klik **"Try it out"**
3. Masukkan credentials:
   ```json
   {
     "email": "test@example.com",
     "password": "test123456"
   }
   ```
4. Klik **"Execute"**
5. **Copy token** dari response

#### Step 2: Authorize Swagger dengan token

1. Scroll ke atas, klik tombol **"Authorize"** (ikon gembok)
2. Paste token di field "Value"
3. Klik **"Authorize"**
4. Klik **"Close"**

#### Step 3: Test protected endpoint

Sekarang Anda bisa test endpoint yang memerlukan authentication:

- `POST /api/products` - Create product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product
- `PUT /api/users/profile` - Update profile
- `DELETE /api/users/profile` - Delete account

---

## 📝 Cara Menambahkan Endpoint Baru ke Swagger

Jika Anda menambahkan endpoint baru, tambahkan JSDoc annotation di atas route:

```javascript
/**
 * @swagger
 * /api/your-new-endpoint:
 *   post:
 *     summary: Deskripsi singkat endpoint
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []  # Jika butuh authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - field1
 *               - field2
 *             properties:
 *               field1:
 *                 type: string
 *                 example: contoh value
 *               field2:
 *                 type: integer
 *                 example: 123
 *     responses:
 *       200:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Error response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/your-new-endpoint", yourController);
```

Swagger akan otomatis mendeteksi dan menampilkan endpoint baru saat server restart.

---

## 🎨 Kustomisasi Swagger

### Mengubah Informasi API

Edit file `src/config/swagger.js`:

```javascript
info: {
  title: 'Nama API Anda',
  version: '2.0.0',
  description: 'Deskripsi API Anda',
  contact: {
    name: 'Tim Support',
    email: 'support@yourdomain.com'
  }
}
```

### Menambah Production Server URL

Setelah deploy, update:

```javascript
servers: [
  {
    url: "http://localhost:5001",
    description: "Development server",
  },
  {
    url: "https://your-app.onrender.com", // URL production Anda
    description: "Production server",
  },
];
```

### Menambah Schema Baru

Tambahkan di `components.schemas`:

```javascript
components: {
  schemas: {
    YourNewModel: {
      type: 'object',
      properties: {
        field1: {
          type: 'string',
          description: 'Deskripsi field'
        },
        field2: {
          type: 'number',
          description: 'Deskripsi field'
        }
      }
    }
  }
}
```

---

## 🔧 Tips & Best Practices

1. **Selalu Update Dokumentasi**
   - Setiap kali ada perubahan endpoint, update JSDoc annotation
   - Dokumentasi yang outdated lebih berbahaya dari tidak ada dokumentasi

2. **Gunakan Schema References**
   - Gunakan `$ref: '#/components/schemas/ModelName'` untuk reusable schemas
   - Lebih mudah maintain daripada mendefinisikan ulang

3. **Berikan Contoh yang Jelas**
   - Gunakan `example:` untuk setiap property
   - Membantu developer yang akan menggunakan API

4. **Group dengan Tags**
   - Gunakan tags untuk mengelompokkan endpoint sejenis
   - Memudahkan navigasi dokumentasi

5. **Dokumentasikan Semua Response**
   - Include success responses (200, 201)
   - Include error responses (400, 401, 404, 500)
   - Berikan deskripsi yang jelas

---

## 📸 Screenshot Swagger UI

![Swagger Documentation](file:///Users/lanisriagustin/.gemini/antigravity/brain/4cd73824-a9bd-40cd-a3ca-6cfabdb7b7ee/swagger_docs_verification_1770355763543.png)

Dokumentasi Swagger Anda sudah aktif dan menampilkan:

- ✅ Authentication endpoints (Register, Login, Get Profile)
- ✅ User management endpoints (Update, Delete)
- ✅ Product CRUD endpoints
- ✅ Interactive "Try it out" feature
- ✅ JWT authentication support

---

## 🚀 Deploy Swagger ke Production

Swagger UI akan otomatis tersedia di production setelah deploy. Pastikan:

1. **Update Server URL** di `swagger.js` dengan production URL
2. **CORS sudah dikonfigurasi** untuk allow Swagger UI
3. **Environment variable** JWT_SECRET sudah di-set

URL Swagger di production:

```
https://your-production-url.com/api-docs
```

---

## ❓ Troubleshooting

### Swagger UI tidak muncul

- Pastikan server running: `npm run dev`
- Pastikan sudah install packages: `npm install swagger-ui-express swagger-jsdoc`
- Check console untuk error

### Endpoint tidak muncul di Swagger

- Pastikan JSDoc annotation formatnya benar
- Pastikan path di `swagger.js` ke routes file benar: `./src/routes/*.js`
- Restart server setelah menambah annotation

### Token authentication tidak bekerja

- Pastikan sudah klik tombol **Authorize**
- Pastikan token format: `Bearer <your-token>` (no need prefix Bearer di Swagger UI)
- Token harus valid dan belum expired (default 7 hari)

---

## 📚 Resources

- [Swagger Documentation](https://swagger.io/docs/)
- [OpenAPI Specification](https://swagger.io/specification/)
- [swagger-jsdoc GitHub](https://github.com/Surnet/swagger-jsdoc)
- [swagger-ui-express GitHub](https://github.com/scottie1984/swagger-ui-express)

---

**Swagger API Documentation berhasil diimplementasikan! 🎉**

Akses di: **http://localhost:5001/api-docs**
