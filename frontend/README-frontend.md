# BakeCart Frontend (Vite + React)

## Quick start
1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. API base URL can be set via environment variable: `VITE_API_BASE_URL`

This is a minimal, opinionated scaffold that expects a backend implementing routes like:
- POST /api/auth/login
- POST /api/auth/signup
- GET /api/stores
- GET /api/stores/:id
- POST /api/stores/:id/ratings
- PUT /api/stores/:id/ratings
- GET /api/admin/stats
- GET /api/admin/users
- GET /api/owner/ratings

Adjust endpoints to match your backend.
