# 3D Virtual Museum - Backend API

Production-ready ASP.NET Core 8 Web API for the 3D Virtual Museum project.

## Tech Stack

- **Framework:** ASP.NET Core 8 Web API
- **Database:** SQL Server
- **ORM:** Entity Framework Core 8
- **API Documentation:** Swagger/OpenAPI
- **Architecture:** Clean Architecture (Controllers / Services / Repositories)
- **Authentication:** JWT
- **Password Hashing:** BCrypt

## Prerequisites

- .NET 8 SDK
- SQL Server (LocalDB or full instance)

## Run the Application

```bash
dotnet run --project VirtualMuseum.API
```

- **Base URL:** http://localhost:5209
- **Swagger UI:** http://localhost:5209/swagger

The API creates the database, applies migrations, and seeds data on startup.

---

## API Reference

All responses use this format:

```json
{
  "success": true,
  "data": { ... },
  "message": null
}
```

For errors: `success: false`, `message` contains the error text.

---

### Authentication (Public – no Authorization header required)

#### Register (User self-registration)

Creates a new user account with name, email, region, and password.

```
POST /api/auth/register
```

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "region": "North America",
  "password": "MySecure@123"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "userId": "guid",
    "email": "john@example.com",
    "fullName": "John Doe",
    "region": "North America"
  }
}
```

**Example tested request (body):**
```json
{
  "fullName": "Doc User",
  "email": "docuser@example.com",
  "region": "Europe",
  "password": "Doc@123"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:5209/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"John Doe","email":"john@example.com","region":"North America","password":"MySecure@123"}'
```

---

#### Login (Users & Admins)

Login with email and password. No OTP required. Returns JWT for both users and admins.

```
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "MySecure@123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "userId": "guid",
    "email": "john@example.com",
    "fullName": "John Doe",
    "role": "User"
  }
}
```

**Example tested request (body – Admin login):**
```json
{
  "email": "admin@museum.com",
  "password": "admin@123"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:5209/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"MySecure@123"}'
```

---

#### Forgot Password – Step 1: Request OTP

Submit email. In development, OTP is always `0000`.

```
POST /api/auth/forgot-password/request
```

**Example tested request (body):**
```json
{
  "email": "john@example.com"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:5209/api/auth/forgot-password/request \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com"}'
```

---

#### Forgot Password – Step 2: Reset Password

Submit email, OTP, new password, and confirmation. In development, OTP must be `0000`.

```
POST /api/auth/forgot-password/reset
```

**Example tested request (body):**
```json
{
  "email": "john@example.com",
  "otpCode": "0000",
  "newPassword": "NewSecure@456",
  "confirmPassword": "NewSecure@456"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:5209/api/auth/forgot-password/reset \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","otpCode":"0000","newPassword":"NewSecure@456","confirmPassword":"NewSecure@456"}'
```

---

### Artifacts (GET anonymous, POST/PUT/DELETE require JWT)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/artifacts | No | List all artifacts |
| GET | /api/artifacts/{id} | No | Get artifact by ID |
| POST | /api/artifacts | Yes | Create artifact |
| PUT | /api/artifacts/{id} | Yes | Update artifact |
| DELETE | /api/artifacts/{id} | Yes | Delete artifact |

**Example tested GET (anonymous):**
```bash
curl http://localhost:5209/api/artifacts
```

**Example tested POST (with Admin JWT):**

- First, login as admin to get `token`:

```bash
curl -X POST http://localhost:5209/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@museum.com\",\"password\":\"admin@123\"}"
```

- Then call:

```bash
curl -X POST http://localhost:5209/api/artifacts ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer ADMIN_JWT_TOKEN" ^
  -d "{
    \"slug\": \"doc-artifact-123\",
    \"eraId\": \"d3d7880c-bf04-4fbd-b46a-ba7d3b2bcfc1\",
    \"categoryId\": \"f4775cf7-30e1-447a-aef3-1b5f61012d01\",
    \"materialId\": \"f565a9a2-8b4b-49c2-9349-fe75d3a89ee3\",
    \"height\": 1.0,
    \"width\": 2.0,
    \"depth\": 3.0,
    \"weight\": 4.0,
    \"createdBy\": \"<admin userId from login>\"
  }"
```

---

### Categories (GET anonymous, POST/PUT/DELETE require JWT)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/categories | No | List all |
| GET | /api/categories/{id} | No | Get by ID |
| POST | /api/categories | Yes | Create |
| PUT | /api/categories/{id} | Yes | Update |
| DELETE | /api/categories/{id} | Yes | Delete |

**Example tested POST (with Admin JWT):**

```bash
curl -X POST http://localhost:5209/api/categories ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer ADMIN_JWT_TOKEN" ^
  -d "{\"name\":\"DocCat-123\"}"
```

**Example tested PUT (with Admin JWT):**

```bash
curl -X PUT http://localhost:5209/api/categories/{id} ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer ADMIN_JWT_TOKEN" ^
  -d "{\"name\":\"DocCat-123-Updated\"}"
```

---

### Eras (GET anonymous, POST/PUT/DELETE require JWT)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/eras | No | List all |
| GET | /api/eras/{id} | No | Get by ID |
| POST | /api/eras | Yes | Create |
| PUT | /api/eras/{id} | Yes | Update |
| DELETE | /api/eras/{id} | Yes | Delete |

**Example tested POST (with Admin JWT):**

```bash
curl -X POST http://localhost:5209/api/eras ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer ADMIN_JWT_TOKEN" ^
  -d "{
    \"name\":\"DocEra-123\",
    \"startYear\": -50,
    \"endYear\": 50
  }"
```

**Example tested PUT (with Admin JWT):**

```bash
curl -X PUT http://localhost:5209/api/eras/{id} ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer ADMIN_JWT_TOKEN" ^
  -d "{
    \"name\":\"DocEra-123-Updated\",
    \"startYear\": -40,
    \"endYear\": 40
  }"
```

---

### Materials (GET anonymous, POST/PUT/DELETE require JWT)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/materials | No | List all |
| GET | /api/materials/{id} | No | Get by ID |
| POST | /api/materials | Yes | Create |
| PUT | /api/materials/{id} | Yes | Update |
| DELETE | /api/materials/{id} | Yes | Delete |

**Example tested POST (with Admin JWT):**

```bash
curl -X POST http://localhost:5209/api/materials ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer ADMIN_JWT_TOKEN" ^
  -d "{\"name\":\"DocMat-123\"}"
```

**Example tested PUT (with Admin JWT):**

```bash
curl -X PUT http://localhost:5209/api/materials/{id} ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer ADMIN_JWT_TOKEN" ^
  -d "{\"name\":\"DocMat-123-Updated\"}"
```

---

### Tags (GET anonymous, POST/PUT/DELETE require JWT)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/tags | No | List all |
| GET | /api/tags/{id} | No | Get by ID |
| POST | /api/tags | Yes | Create |
| PUT | /api/tags/{id} | Yes | Update |
| DELETE | /api/tags/{id} | Yes | Delete |

**Example tested POST (with Admin JWT):**

```bash
curl -X POST http://localhost:5209/api/tags ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer ADMIN_JWT_TOKEN" ^
  -d "{\"name\":\"DocTag-123\"}"
```

**Example tested GET by id (no auth):**

```bash
curl http://localhost:5209/api/tags/{id}
```

**Example tested PUT (with Admin JWT):**

```bash
curl -X PUT http://localhost:5209/api/tags/{id} ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer ADMIN_JWT_TOKEN" ^
  -d "{\"name\":\"DocTag-123-Updated\"}"
```

---

### Users (Admin only – requires Admin JWT)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/users | Admin | List all users |
| GET | /api/users/{id} | Admin | Get user by ID |
| POST | /api/users | Admin | Create user |
| PUT | /api/users/{id} | Admin | Update user |
| DELETE | /api/users/{id} | Admin | Delete user |

**Example tested GET (Admin JWT):**

```bash
curl http://localhost:5209/api/users ^
  -H "Authorization: Bearer ADMIN_JWT_TOKEN"
```

**Example tested POST (Admin JWT):**

```bash
curl -X POST http://localhost:5209/api/users ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer ADMIN_JWT_TOKEN" ^
  -d "{
    \"fullName\":\"Api User 1\",
    \"email\":\"apiuser1@example.com\",
    \"region\":\"Test\",
    \"password\":\"Pass@123\",
    \"roleId\":\"<existing non-admin roleId>\",
    \"isActive\":true
  }"
```

**Example tested PUT (Admin JWT):**

```bash
curl -X PUT http://localhost:5209/api/users/{id} ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer ADMIN_JWT_TOKEN" ^
  -d "{
    \"fullName\":\"Api User 1 Updated\",
    \"email\":\"apiuser1@example.com\",
    \"region\":\"Test2\",
    \"isActive\":false
  }"
```

---

## Default Credentials

### Admin

- **Email:** admin@museum.com
- **Password:** admin@123

### Forgot Password (Development)

- **OTP:** 0000

---

## Using the JWT Token

After login, send the token in the `Authorization` header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

## Configuration

Connection string in `VirtualMuseum.API/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=DESKTOP-K4668BN\\MSSQLSERVER02;Database=VirtualMuseumDB;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

---

## Project Structure

```
VirtualMuseum.sln
├── VirtualMuseum.API/           # Controllers, DTOs, Middleware
├── VirtualMuseum.Application/   # Services, Interfaces
├── VirtualMuseum.Domain/        # Entities
└── VirtualMuseum.Infrastructure/ # DbContext, Repositories, Migrations
```

---

## Testing APIs

Run the test script (with API running):

```powershell
.\API-Tests.ps1
```

---

## Tested Endpoints (step-by-step)

This section documents the **endpoints that were tested**, the **exact sample inputs (“insertions”)** used, and whether the endpoint needs **Authorization**.

### Authorization used in tests

- **Public endpoints (no auth)**: no `Authorization` header.
- **JWT-protected endpoints**: header must be:

```
Authorization: Bearer <JWT>
```

- **Admin-only endpoints**: same header, but the JWT must contain role **Admin**.

### 0) Test environment

- **Base URL**: `http://localhost:5209`
- **Swagger UI**: `http://localhost:5209/swagger`
- **DB**: migrations + seeding run automatically on startup.
- **Seeded admin** (used for JWT in protected endpoints):
  - **Email**: `admin@museum.com`
  - **Password**: `admin@123`

---

### 1) Auth APIs (Public)

#### 1.1 `POST /api/auth/register` (No Authorization)

- **Inserted body used in testing**:

```json
{
  "fullName": "Test User",
  "email": "testuser1760814702@museum.com",
  "region": "Europe",
  "password": "Test@123"
}
```

- **Expected result**: `201` with `data.userId`.

#### 1.2 `POST /api/auth/login` (No Authorization)

- **Inserted body used in testing (Admin)**:

```json
{
  "email": "admin@museum.com",
  "password": "admin@123"
}
```

- **Expected result**: `200` with `data.token` (JWT), `data.userId`, `data.role`.

#### 1.3 `POST /api/auth/forgot-password/request` (No Authorization)

- **Inserted body used in testing**:

```json
{
  "email": "testuser1760814702@museum.com"
}
```

- **Expected result**: `200` (development OTP is `0000`).

#### 1.4 `POST /api/auth/forgot-password/reset` (No Authorization)

- **Inserted body used in testing**:

```json
{
  "email": "testuser1760814702@museum.com",
  "otpCode": "0000",
  "newPassword": "NewTest@123",
  "confirmPassword": "NewTest@123"
}
```

- **Expected result**: `200`, then login works with the new password.

---

### 2) Public GET APIs (No Authorization)

These were tested as **anonymous** requests:

- `GET /api/artifacts`
- `GET /api/artifacts/{id}` (example tested id: `a8637acb-1bc0-45c5-8c23-39ffbe10fb6d`)
- `GET /api/categories`
- `GET /api/categories/{id}` (example tested id: `b4fa1050-6eb5-4394-b6db-25c1220cd352`)
- `GET /api/eras`
- `GET /api/eras/{id}` (example tested id: `4d1801f4-2956-4a1a-8f54-6198a9b39d7a`)
- `GET /api/materials`
- `GET /api/materials/{id}` (example tested id: `fa2b1a73-596b-4ccd-95c3-0898cc4351d6`)
- `GET /api/tags`
  - Note: if no tags exist, this returns an empty list: `"data": []`

---

### 3) Protected CRUD APIs (JWT required)

For all endpoints in this section, tests used:

- **Authorization**: `Bearer <Admin JWT>` from `POST /api/auth/login`

#### 3.1 Categories CRUD

- `POST /api/categories` (**JWT required**)
  - **Inserted**:

```json
{ "name": "TestCategory-1023702154" }
```

- `PUT /api/categories/{id}` (**JWT required**)
  - **Inserted**:

```json
{ "name": "TestCategory-1023702154-Updated" }
```

- `DELETE /api/categories/{id}` (**JWT required**)

#### 3.2 Eras CRUD

- `POST /api/eras` (**JWT required**)
  - **Inserted**:

```json
{ "name": "TestEra-1023702154", "startYear": -100, "endYear": 100 }
```

- `PUT /api/eras/{id}` (**JWT required**)
  - **Inserted**:

```json
{ "name": "TestEra-1023702154-Updated", "startYear": -90, "endYear": 90 }
```

- `DELETE /api/eras/{id}` (**JWT required**)

#### 3.3 Materials CRUD

- `POST /api/materials` (**JWT required**)
  - **Inserted**:

```json
{ "name": "TestMaterial-1023702154" }
```

- `PUT /api/materials/{id}` (**JWT required**)
  - **Inserted**:

```json
{ "name": "TestMaterial-1023702154-Updated" }
```

- `DELETE /api/materials/{id}` (**JWT required**)

#### 3.4 Tags CRUD

- `POST /api/tags` (**JWT required**)
  - **Inserted**:

```json
{ "name": "TestTag-1023702154" }
```

- `GET /api/tags/{id}` (**No auth required**)  
  - Example tested id: `3502645e-92bc-4fbd-a73e-5ab5fa449d50`

- `PUT /api/tags/{id}` (**JWT required**)
  - **Inserted**:

```json
{ "name": "TestTag-1023702154-Updated" }
```

- `DELETE /api/tags/{id}` (**JWT required**)

#### 3.5 Artifacts CRUD

- `POST /api/artifacts` (**JWT required**)
  - **Inserted** (using seeded ids from anonymous GETs):
    - `eraId`: `4d1801f4-2956-4a1a-8f54-6198a9b39d7a`
    - `categoryId`: `b4fa1050-6eb5-4394-b6db-25c1220cd352`
    - `materialId`: `fa2b1a73-596b-4ccd-95c3-0898cc4351d6`
    - `createdBy` (admin user id from login): `<admin userId>`

```json
{
  "slug": "test-artifact-1023702154",
  "eraId": "4d1801f4-2956-4a1a-8f54-6198a9b39d7a",
  "categoryId": "b4fa1050-6eb5-4394-b6db-25c1220cd352",
  "materialId": "fa2b1a73-596b-4ccd-95c3-0898cc4351d6",
  "height": 1.1,
  "width": 2.2,
  "depth": 3.3,
  "weight": 4.4,
  "createdBy": "<admin userId>"
}
```

- `PUT /api/artifacts/{id}` (**JWT required**)
  - **Inserted**:

```json
{
  "slug": "test-artifact-1023702154-updated",
  "eraId": "4d1801f4-2956-4a1a-8f54-6198a9b39d7a",
  "categoryId": "b4fa1050-6eb5-4394-b6db-25c1220cd352",
  "materialId": "fa2b1a73-596b-4ccd-95c3-0898cc4351d6",
  "height": 9.9,
  "width": 8.8,
  "depth": 7.7,
  "weight": 6.6,
  "createdBy": "<admin userId>"
}
```

- `DELETE /api/artifacts/{id}` (**JWT required**)

---

### 4) Admin-only Users APIs (Admin JWT required)

#### 4.1 Authorization behavior (tested)

- `GET /api/users`:
  - **Anonymous**: returns **401**
  - **Normal user token**: returns **403**
  - **Admin token**: returns **200**

#### 4.2 Users CRUD (tested with Admin JWT)

- `POST /api/users` (**Admin JWT required**)
  - **Inserted**:
    - `roleId` was taken from an existing non-admin user returned by `GET /api/users` (example value: `27a68335-d659-42d8-8078-ef932287b2a8`)

```json
{
  "fullName": "Api User 1724500135",
  "email": "apiuser1724500135@museum.com",
  "region": "Test",
  "password": "Pass@123",
  "roleId": "27a68335-d659-42d8-8078-ef932287b2a8",
  "isActive": true
}
```

- `PUT /api/users/{id}` (**Admin JWT required**)
  - **Inserted**:

```json
{
  "fullName": "Api User 1724500135 Updated",
  "email": "apiuser1724500135@museum.com",
  "region": "Test2",
  "isActive": false
}
```

- `DELETE /api/users/{id}` (**Admin JWT required**)

---

## Migrations

```bash
# Create migration
dotnet ef migrations add MigrationName -p VirtualMuseum.Infrastructure -s VirtualMuseum.API

# Drop database
dotnet ef database drop -p VirtualMuseum.Infrastructure -s VirtualMuseum.API
```
