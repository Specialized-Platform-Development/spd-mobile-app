# API Documentation - Online Marketplace Backend

## Table of Contents

- [Base URL](#base-url)
- [Standard Response Format](#standard-response-format)
- [Authentication](#authentication)
- [Error Codes](#error-codes)
- [Authentication Endpoints](#authentication-endpoints)
- [User Management Endpoints](#user-management-endpoints)
- [Product Management Endpoints](#product-management-endpoints)

---

## Base URL

**Local Development:**

```
http://localhost:5001
```

**Production:**

```
# deployed URL
```

---

## Standard Response Format

All API responses follow this consistent format:

### Success Response

```json
{
  "success": true,
  "message": "Descriptive success message",
  "data": {
    // Response data object
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Descriptive error message",
  "data": null
}
```

---

## Authentication

Protected endpoints require a JSON Web Token (JWT) in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

The token is returned upon successful registration or login.

---

## Error Codes

| Status Code | Description                            |
| ----------- | -------------------------------------- |
| 200         | Success                                |
| 201         | Created                                |
| 400         | Bad Request (validation error)         |
| 401         | Unauthorized (authentication required) |
| 403         | Forbidden (insufficient permissions)   |
| 404         | Not Found                              |
| 500         | Internal Server Error                  |

---

## Authentication Endpoints

### 1. Register User

Create a new user account.

**Endpoint:** `POST /api/auth/register`

**Access:** Public

**Request Headers:**

```json
{
  "Content-Type": "application/json"
}
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules:**

- `name`: Required, 2-100 characters
- `email`: Required, valid email format, unique
- `password`: Required, minimum 6 characters

**Success Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2024-02-06T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (400):**

```json
{
  "success": false,
  "message": "User with this email already exists",
  "data": null
}
```

---

### 2. Login User

Authenticate a user and receive a JWT token.

**Endpoint:** `POST /api/auth/login`

**Access:** Public

**Request Headers:**

```json
{
  "Content-Type": "application/json"
}
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules:**

- `email`: Required, valid email format
- `password`: Required

**Success Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2024-02-06T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (401):**

```json
{
  "success": false,
  "message": "Invalid email or password",
  "data": null
}
```

---

### 3. Get User Profile

Get the authenticated user's profile information.

**Endpoint:** `GET /api/auth/profile`

**Access:** Private (requires authentication)

**Request Headers:**

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "User profile retrieved successfully",
  "data": {
    "user": {
      "id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2024-02-06T10:30:00.000Z"
    }
  }
}
```

**Error Response (401):**

```json
{
  "success": false,
  "message": "Not authorized, no token provided",
  "data": null
}
```

---

## User Management Endpoints

### 4. Update User Profile

Update the authenticated user's profile information.

**Endpoint:** `PUT /api/users/profile`

**Access:** Private (requires authentication)

**Request Headers:**

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Request Body:**

```json
{
  "name": "John Updated",
  "email": "johnupdated@example.com",
  "password": "newpassword123"
}
```

**Note:** All fields are optional. Only include fields you want to update.

**Validation Rules:**

- `name`: Optional, 2-100 characters if provided
- `email`: Optional, valid email format, unique if provided
- `password`: Optional, minimum 6 characters if provided

**Success Response (200):**

```json
{
  "success": true,
  "message": "User profile updated successfully",
  "data": {
    "user": {
      "id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "name": "John Updated",
      "email": "johnupdated@example.com",
      "role": "user",
      "createdAt": "2024-02-06T10:30:00.000Z"
    }
  }
}
```

**Error Response (400):**

```json
{
  "success": false,
  "message": "Email already in use",
  "data": null
}
```

---

### 5. Delete User Account

Delete the authenticated user's account permanently.

**Endpoint:** `DELETE /api/users/profile`

**Access:** Private (requires authentication)

**Request Headers:**

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "User account deleted successfully",
  "data": null
}
```

**Error Response (404):**

```json
{
  "success": false,
  "message": "User not found",
  "data": null
}
```

---

## Product Management Endpoints

### 6. Get All Products

Retrieve a list of all products.

**Endpoint:** `GET /api/products`

**Access:** Public

**Success Response (200):**

```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": {
    "count": 2,
    "products": [
      {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
        "name": "Laptop",
        "description": "High-performance laptop for professionals",
        "price": 1299.99,
        "stock": 15,
        "imageUrl": "https://example.com/laptop.jpg",
        "createdAt": "2024-02-06T11:00:00.000Z"
      },
      {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
        "name": "Wireless Mouse",
        "description": "Ergonomic wireless mouse",
        "price": 29.99,
        "stock": 50,
        "imageUrl": "https://example.com/mouse.jpg",
        "createdAt": "2024-02-06T11:15:00.000Z"
      }
    ]
  }
}
```

---

### 7. Get Product by ID

Retrieve a single product by its ID.

**Endpoint:** `GET /api/products/:id`

**Access:** Public

**URL Parameters:**

- `id`: Product ID (MongoDB ObjectId)

**Success Response (200):**

```json
{
  "success": true,
  "message": "Product retrieved successfully",
  "data": {
    "product": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
      "name": "Laptop",
      "description": "High-performance laptop for professionals",
      "price": 1299.99,
      "stock": 15,
      "imageUrl": "https://example.com/laptop.jpg",
      "createdAt": "2024-02-06T11:00:00.000Z"
    }
  }
}
```

**Error Response (404):**

```json
{
  "success": false,
  "message": "Product not found",
  "data": null
}
```

**Error Response (400):**

```json
{
  "success": false,
  "message": "Invalid ID format",
  "data": null
}
```

---

### 8. Create Product

Create a new product. Requires authentication.

**Endpoint:** `POST /api/products`

**Access:** Private (requires authentication)

**Request Headers:**

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Request Body:**

```json
{
  "name": "Smartphone",
  "description": "Latest flagship smartphone with amazing features",
  "price": 899.99,
  "stock": 25,
  "imageUrl": "https://example.com/smartphone.jpg"
}
```

**Validation Rules:**

- `name`: Required, 2-200 characters
- `description`: Required, 10-2000 characters
- `price`: Required, non-negative number
- `stock`: Required, non-negative integer
- `imageUrl`: Optional, valid URL format

**Success Response (201):**

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "product": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k4",
      "name": "Smartphone",
      "description": "Latest flagship smartphone with amazing features",
      "price": 899.99,
      "stock": 25,
      "imageUrl": "https://example.com/smartphone.jpg",
      "createdAt": "2024-02-06T12:00:00.000Z"
    }
  }
}
```

**Error Response (400):**

```json
{
  "success": false,
  "message": "Product name is required, Price cannot be negative",
  "data": null
}
```

---

### 9. Update Product

Update an existing product. Requires authentication.

**Endpoint:** `PUT /api/products/:id`

**Access:** Private (requires authentication)

**URL Parameters:**

- `id`: Product ID (MongoDB ObjectId)

**Request Headers:**

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Request Body:**

```json
{
  "price": 849.99,
  "stock": 30
}
```

**Note:** All fields are optional. Only include fields you want to update.

**Validation Rules:**

- `name`: Optional, 2-200 characters if provided
- `description`: Optional, 10-2000 characters if provided
- `price`: Optional, non-negative number if provided
- `stock`: Optional, non-negative integer if provided
- `imageUrl`: Optional, valid URL format if provided

**Success Response (200):**

```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "product": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k4",
      "name": "Smartphone",
      "description": "Latest flagship smartphone with amazing features",
      "price": 849.99,
      "stock": 30,
      "imageUrl": "https://example.com/smartphone.jpg",
      "createdAt": "2024-02-06T12:00:00.000Z"
    }
  }
}
```

**Error Response (404):**

```json
{
  "success": false,
  "message": "Product not found",
  "data": null
}
```

---

### 10. Delete Product

Delete a product permanently. Requires authentication.

**Endpoint:** `DELETE /api/products/:id`

**Access:** Private (requires authentication)

**URL Parameters:**

- `id`: Product ID (MongoDB ObjectId)

**Request Headers:**

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": null
}
```

**Error Response (404):**

```json
{
  "success": false,
  "message": "Product not found",
  "data": null
}
```

---

## Common Error Responses

### Invalid Token

```json
{
  "success": false,
  "message": "Not authorized, token invalid or expired",
  "data": null
}
```

### Missing Token

```json
{
  "success": false,
  "message": "Not authorized, no token provided",
  "data": null
}
```

### Validation Error

```json
{
  "success": false,
  "message": "Email is required, Password must be at least 6 characters",
  "data": null
}
```

---

## Testing Examples

### cURL Examples

**Register:**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","password":"secure123"}'
```

**Login:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com","password":"secure123"}'
```

**Get All Products:**

```bash
curl -X GET http://localhost:5000/api/products
```

**Create Product:**

```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name":"Gaming Keyboard",
    "description":"Mechanical gaming keyboard with RGB lighting",
    "price":149.99,
    "stock":20,
    "imageUrl":"https://example.com/keyboard.jpg"
  }'
```

---

## Notes

- All timestamps are in ISO 8601 format
- JWT token expires in 7 days by default (configurable)
- Passwords are hashed using bcrypt and never returned in responses
- Product IDs and User IDs are MongoDB ObjectIds
- All monetary values are in decimal format

---

**Document Version:** 1.0  
**Last Updated:** February 6, 2026
