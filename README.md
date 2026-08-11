# Yolnoma Backend API Docs

## Overview
Yolnoma backend uses Node.js + Express + MongoDB. Auth is JWT-based and all sensitive config is loaded from `.env`.

## Required environment variables
- `MONGO_URI` — MongoDB connection string for the `Yolnoma` database
- `JWT_SECRET` — secret used to sign access JWT tokens
- `JWT_REFRESH_SECRET` — secret used to sign refresh JWT tokens
- `PORT` — optional, default is `7777`
- `SWAGGER_SERVER_URL` — optional, defaults to `http://localhost:7777`
- `HOSTING` - `https://yolnoma-app-backend.onrender.com/` 
- `SWAGGER_SERVER_URL` - `https://yolnoma-app-backend.onrender.com/docs/`


## Auth endpoints
### POST /api/auth/login
- Body: `application/json`
  - `email` (string)
  - `password` (string)
- Success: `200`
- Response shape:
  - `success`: `true`
  - `data.access_token`: short-lived access token (15 min)
  - `data.refresh_token`: long-lived refresh token (7 days)
  - `data.user`: user object without `password_hash`

### POST /api/auth/refresh
- Body: `application/json`
  - `refresh_token` (string)
- Success: `200`
- Response shape:
  - `success`: `true`
  - `data.access_token`: new access token
  - `data.refresh_token`: rotated refresh token
  - `data.user`: user object
- Use this endpoint when the access token expires and the refresh token is still valid.

### GET /api/auth/me
- Requires header: `Authorization: Bearer <access_token>`
- Success: `200`
- Returns current authenticated user

## User endpoints
### GET /api/users
- Requires JWT auth
- Returns user list without passwords

### GET /api/users/me
- Requires JWT auth
- Returns current authenticated user profile

### PATCH /api/users/me
- Requires JWT auth
- Body: `application/json`
  - `display_name` (string)
  - `avatar_url` (string)
  - `thumbnail_url` (string)
  - `is_private` (boolean)
- Updates the logged-in user profile

### GET /api/users/{id}
- Requires JWT auth
- Returns user by id

### POST /api/users
- Requires JWT auth
- Requires role: `owner`
- Body: `application/json`
  - `email` (string)
  - `password` (string)
  - `role` (`owner` | `admin`)
  - optional profile fields

### PATCH /api/users/{id}
- Requires JWT auth
- Requires role: `owner`
- Updates user by id

### DELETE /api/users/{id}
- Requires JWT auth
- Requires role: `owner`
- Deletes user by id

## Security notes
- `password_hash` is never returned in API responses.
- Auth middleware validates `Authorization` header and JWT token.
- Use HTTPS in production and never expose `MONGO_URI` or `JWT_SECRET` client-side.

## Integration notes for Tauri
- Login from Tauri should call `POST /api/auth/login` and store the returned JWT locally in the app.
- For protected requests, send `Authorization: Bearer <token>`.
- Upload image URLs from Tauri cloud storage and write URL string to `avatar_url` / `thumbnail_url` in user profile.

## Swagger
- Swagger UI is available at `/docs`
- OpenAPI schema is generated from `src/swagger/auth.swagger.js` and `src/swagger/model.swagger.js`

## Recommended improvement
- Add `refresh token` support for longer sessions.
- Add `upload` endpoint for profile image metadata if you want server-side validation.
