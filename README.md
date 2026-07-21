# ShopVerse MERN E-Commerce

ShopVerse is a full-stack e-commerce coursework project. It provides a React/Vite storefront backed by Express and MongoDB, with JWT authentication, role-aware APIs, product filtering, cart state, checkout, and a recommendation endpoint.

## Features

- JWT registration/login with bcrypt password hashing; protected profile and order APIs.
- Product CRUD guarded by admin middleware, plus search, category filtering, and price/newest sorting.
- Redux Toolkit state for authentication and a persistent cart.
- Responsive Bootstrap interface with product listing/detail pages, contact form validation, checkout, and order history.
- `GET /api/analytics` provides a RapidMiner-compatible recommendation endpoint. It can accept a comma-separated `categories` query from a RapidMiner category/association export, e.g. `?categories=Electronics,Home`.

## Run locally

1. Create `ecommercebackend/.env` from `.env.example`, then set a MongoDB connection string and strong JWT secret.
2. Install and start the backend:

   ```sh
   cd ecommercebackend
   npm install
   npm run dev
   ```

3. Create `ecommercefrontend/.env` from `.env.example`, then install and run the client:

   ```sh
   cd ecommercefrontend
   npm install
   npm run dev
   ```

The frontend runs on `http://localhost:5173` by default and expects the API at `http://localhost:5000/api`.

Optionally populate demo data after configuring MongoDB:

```sh
cd ecommercebackend
npm run seed
```

This creates an admin account for demonstrating RBAC: `admin@shopverse.test` / `Admin123!`. Change or remove this account before production use.

## API overview

| Area | Endpoints |
| --- | --- |
| Authentication | `POST /api/auth/register`, `POST /api/auth/login` |
| Products | `GET /api/products?search=&category=&sort=`, `GET /api/products/:id`; admin: `POST`, `PUT`, `DELETE` |
| Profile | `GET`, `PUT`, `DELETE /api/profile` |
| Orders | `POST /api/orders`, `GET /api/orders/mine`; admin: `GET /api/orders`, `PATCH /api/orders/:id/status` |
| Recommendations | `GET /api/analytics?categories=Electronics,Home` |

Protected routes use an `Authorization: Bearer <token>` header, automatically attached by the Axios client.

For the repeatable RapidMiner Studio workflow and assessment evidence, see [rapidminer/README.md](rapidminer/README.md).

## Deployment

Deploy `ecommercebackend` to Render (set `MONGODB_URI`, `JWT_SECRET`, `FRONTEND_URL`) and `ecommercefrontend` to Netlify or Vercel (set `VITE_API_URL` to the deployed backend URL plus `/api`). Update `FRONTEND_URL` to the final frontend URL for CORS.
