# TaskFlow

> Full-stack Kanban task manager built for speed, clarity, and smooth developer onboarding.

![React](https://img.shields.io/badge/Frontend-React_18-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Backend-Node.js_+_Express-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB_7-47A248?logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Infra-Docker-2496ED?logo=docker&logoColor=white)
![Railway](https://img.shields.io/badge/Deploy-Railway-0B0D0E?logo=railway&logoColor=white)

TaskFlow helps users create, organize, and track tasks across a Kanban workflow (**To Do → In Progress → Done**) with filtering, priorities, categories, due dates, and search.

---

## ✨ Highlights

- Guest mode for quick usage (up to 5 tasks)
- Guest task migration after sign-in
- Email/password auth + Google OAuth
- Kanban board with status cycling UX
- Smart filtering (priority, category, search, sort)
- Dark mode persisted in localStorage
- Dockerized local development
- Railway-friendly deployment

---

## 🧱 Tech Stack

| Layer | Stack |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, Axios |
| Backend | Node.js, Express, JWT, Google Auth |
| Database | MongoDB 7, Mongoose |
| Infrastructure | Docker Compose, Nginx, Railway |

---

## 📁 Project Structure

```text
.
├── docker-compose.yml
├── .env.example
├── server/
│   ├── Dockerfile
│   ├── index.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
└── client/
    ├── Dockerfile
    ├── nginx.conf
    ├── railway.toml
    └── src/
```

---

## 🚀 Quick Start (Docker - Recommended)

### 1) Prerequisites

- Docker Desktop
- Git

### 2) Clone

```bash
git clone https://github.com/spoja-10/task-manager.git
cd task-manager
```

### 3) Configure secrets safely

Create a local environment file from the template:

```bash
cp .env.example .env
```

Then set **real secret values locally** (never commit them):

- `JWT_SECRET`
- `GOOGLE_CLIENT_ID`

> 🔐 **Security note:** Do not commit `.env` files. Keep secrets in local `.env` for development and in Railway Variables (or another secret manager) for production.

### 4) Run

```bash
docker-compose up --build
```

### 5) Access

- App: `http://localhost:8080`
- API: `http://localhost:5001`
- API health: `http://localhost:5001/api/health`

Stop with:

```bash
docker-compose down
```

---

## 🧪 Local Development (without Docker)

### Backend

```bash
cd server
npm install
npm run dev
```

Backend default URL: `http://localhost:5000`

### Frontend

```bash
cd client
npm install
npm run dev
```

Frontend default URL: `http://localhost:5173`

### Local environment variables

Use your own local `.env` files (never commit them):

- `server/.env` (example keys): `PORT`, `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRE`, `CLIENT_URL`, `GOOGLE_CLIENT_ID`
- `client/.env` (example keys): `VITE_API_URL`, `VITE_GOOGLE_CLIENT_ID`

---

## 🔌 API Reference

Base URL (Docker): `http://localhost:5001/api`  
Base URL (local backend): `http://localhost:5000/api`

### Auth

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Create account `{ name, email, password }` |
| POST | `/auth/login` | Login with email/password |
| POST | `/auth/google` | Login/signup with Google credential `{ credential }` |
| GET | `/auth/me` | Get current user (Bearer token required) |

### Tasks (Authenticated)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/tasks` | List tasks (supports query filters) |
| POST | `/tasks` | Create task |
| GET | `/tasks/:id` | Get task by ID |
| PUT | `/tasks/:id` | Update task |
| DELETE | `/tasks/:id` | Delete task |

Supported query params for `GET /tasks`:

- `status`
- `priority`
- `category`
- `search`
- `sortBy`
- `order`

Use token for protected routes:

```http
Authorization: Bearer <token>
```

---

## 🌍 Deployment (Railway)

Typical services:

- MongoDB plugin
- `server` service (root: `/server`)
- `client` service (root: `/client`)

### Recommended production env vars

**Server**

- `NODE_ENV=production`
- `JWT_SECRET=<secure-secret>`
- `JWT_EXPIRE=7d`
- `MONGODB_URI=<railway-mongodb-uri>`
- `CLIENT_URL=<client-url>`
- `GOOGLE_CLIENT_ID=<google-client-id>`

**Client**

- `VITE_API_URL=<server-url>`
- `VITE_GOOGLE_CLIENT_ID=<google-client-id>`

> ⚠️ Vite variables are injected at build time. Redeploy client after changing any `VITE_*` value.

---

## 🔐 Google OAuth Setup (Quick Checklist)

1. Create project in Google Cloud Console
2. Create OAuth 2.0 Web Client credentials
3. Add allowed JavaScript origins (local + production)
4. Configure/publish OAuth consent screen
5. Set `GOOGLE_CLIENT_ID` in server runtime and `VITE_GOOGLE_CLIENT_ID` in client build env

---

## 🛠️ Troubleshooting

| Issue | Fix |
|---|---|
| MongoDB connection refused (local) | Restart Docker Desktop; run `docker-compose down` then `docker-compose up --build` |
| Port `8080` already in use | Stop process using the port or remap in `docker-compose.yml` |
| Docker pull TLS timeout | Check VPN/firewall, restart Docker Desktop, verify DNS settings |
| Google OAuth `invalid_client` | Verify client ID and allowed origins; redeploy after env changes |
| Railway MongoDB `ENOTFOUND` | Use Railway TCP proxy URL format |
| `VITE_*` updates not reflected | Trigger full frontend redeploy |

---

## 🤝 Contributing

```bash
git add .
git commit -m "your message"
git push
```

### Development notes

- Add API logic in `server/controllers/`
- Add routes in `server/routes/`
- Register routes in `server/index.js`
- Add pages in `client/src/pages/`
- Register new client routes in `client/src/App.jsx`

---

## ✅ Security Best Practices

- Never commit `.env` files.
- Keep secrets only in local env files and production secret managers.
- Rotate `JWT_SECRET` if it is ever exposed.
- Use distinct credentials for local/staging/production.

---

Built with ❤️ using React, Node.js, and MongoDB.
