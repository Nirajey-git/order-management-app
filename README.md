Order Management Application:

This is fullstack order management apllication build on react, node/Express, PrismaORM, and PostgreSQL.

Deployment UrlS
Frontend: https://order-management-app-one-taupe.vercel.app/
Backend: https://order-management-app-10.onrender.com

Sample API Request
User Table:
GET /users
curl -X GET https://order-management-app-10.onrender.com/users

create a user:
POST /users
curl -X POST https://order-management-app-10.onrender.com/users \
-H "Content-Type: application/json" \
-d '{"name": "Niraj Gajurel", "email": "gajurelniraj@gmail.com"}'

Product Table:
GET /products
curl -X GET https://order-management-app-10.onrender.com/products

create a product:
POST /products
curl -X POST https://order-management-app-10.onrender.com/products \
-H "Content-Type: application/json" \
-d '{"name": "iPhone 15", "description": "Latest Apple smartphone", "price": 1200, "stock": 50}'

Tech Stack:
Frontend: React, Tailwind CSS, Vite

Backend: Node.js, Express, Prisma

Database: PostgreSQL (Render)

Queue/Cache: Redis, Bull

Deployment: Frontend on Vercel, Backend on Render
