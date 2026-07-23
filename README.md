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

### 1. Deploy the API on Render

1. Push this repository to GitHub, then in Render choose **New → Blueprint** and select the repository. Render detects `render.yaml` and creates the `shopverse-api` web service.
2. When prompted, supply `MONGODB_URI`. Render generates `JWT_SECRET` automatically.
3. After deployment, copy the API URL, for example `https://shopverse-api.onrender.com`.

### 2. Deploy the frontend on Vercel

1. In Vercel choose **Add New → Project**, import the same repository, and set **Root Directory** to `ecommercefrontend`.
2. Vercel detects Vite. Keep the build command as `npm run build` and output directory as `dist`.
3. Add the production environment variable `VITE_API_URL` with the value `https://shopverse-api.onrender.com/api` (use your own Render URL).
4. Deploy and copy the Vercel URL.

### 3. Finish CORS setup

In Render, open the API service's **Environment** settings and set `FRONTEND_URL` to the exact Vercel URL, with no trailing slash. Save and redeploy the API. The Vercel rewrite configuration is included so direct visits to pages such as `/cart` or `/orders` work correctly.
