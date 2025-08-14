# BakeCart Backend (Express + Sequelize + MySQL)

## Quickstart

1. Copy `.env.example` to `.env` and fill DB credentials and JWT_SECRET.
2. Install dependencies: `npm install`
3. Create the database in MySQL (example): `CREATE DATABASE bakecart_dev;`
4. Run migrations: `npx sequelize-cli db:migrate`
5. Seed initial data: `npx sequelize-cli db:seed:all`
6. Start server: `npm run start` or `npm run dev`

## Endpoints (overview)

- POST /api/auth/signup
- POST /api/auth/login
- POST /api/auth/update-password

- GET /api/stores
- GET /api/stores/:id
- POST /api/stores/:id/ratings  (auth required)
- PUT /api/stores/:id/ratings   (auth required)
- GET /api/stores/:id/ratings   (auth required)

- Admin (auth + role=admin)
  - GET /api/admin/stats
  - GET /api/admin/users
  - POST /api/admin/users
  - GET /api/admin/stores
  - POST /api/admin/stores

- Owner (auth + role=store_owner)
  - GET /api/owner/ratings

Adjust as needed.
