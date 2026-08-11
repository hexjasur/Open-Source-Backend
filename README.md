# Open-Source-Backend — Modern, secure, and extensible API backend

Welcome to Open-Source-Backend — a production-ready Node.js backend built for desktop/web apps and Tauri integrations. Fast to start, secure by design, and designed to be customized.

Why you'll love it
- Clean JWT auth with rotating refresh tokens (access: short-lived, refresh: long-lived)
- Role-based access controls (owner/admin) and user management API ready
- Swagger-driven API docs with optional visual customization via `swagger-custom`
- Minimal, well-structured codebase: Express + Mongoose + modular loaders

Feature highlight — Swagger custom UI
This project integrates `swagger-custom` to give your API documentation a polished, branded UI. Learn more and star the project:

- https://github.com/hexjasur/swagger-custom

Quickstart
1. Copy environment variables:

```bash
cp .env.example .env
```

2. Install dependencies and run:

```bash
npm install
npm run dev
```

3. Open docs and explore the API (local):

http://localhost:7777/docs

Required environment variables
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret for access tokens
- `JWT_REFRESH_SECRET` — secret for refresh tokens
- `PORT` — optional (default `7777`)
- `CORS_ORIGIN` — allowed origins (comma-separated)

Core endpoints (summary)
- `POST /api/auth/login` — returns `{ access_token, refresh_token, user }`
- `POST /api/auth/refresh` — rotate and return new tokens
- `GET /api/auth/me` — current authenticated user
- `GET /api/users` — list users (auth)
- `POST /api/users` — create user (owner only)

Tauri & Desktop integration notes
- For Tauri apps, call `POST /api/auth/login` and securely store the `refresh_token` and `access_token` in your app. Use the access token for API calls and call `POST /api/auth/refresh` to rotate tokens when needed.
- Set `CORS_ORIGIN` to your app origin when serving docs or using the UI in-browser.

Debugging CORS / Docs
- If Swagger UI shows "Failed to fetch":
  - Ensure `src/swagger/index.js` `servers.url` points to your API root (no `/docs` suffix).
  - Ensure `CORS_ORIGIN` includes the origin shown in the browser `Origin` header.
  - Temporarily enable `DEBUG_CORS=true` to log request `Origin` and response CORS headers.

Customization & Branding
- `src/loaders/swagger.js` wires `swagger-custom` and exposes `/swagger-custom` assets. Edit `src/loaders/swagger.js` to change colors, site title, or custom JS/CSS.

Contribution
- Pull requests welcome. Please keep changes small and focused. For large refactors, open an issue first to discuss.

License
- MIT — use freely and contribute back ❤️

Repository
- https://github.com/hexjasur/Open-Source-Backend

Enjoy — if you want, I can add README badges (build, npm version, license) and a short example integration snippet for Tauri or React.
