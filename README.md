# TaskFlow

TaskFlow is a full-stack task management application with JWT authentication, Google sign-in support, task organization features, and a responsive React UI.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express, Mongoose, JWT, bcrypt
- **Database:** MongoDB
- **Deployment/Runtime:** Docker, Docker Compose, Nginx (for client container)

## Features

- User registration and login with JWT
- Optional Google OAuth sign-in endpoint
- Protected task API per user
- Task CRUD operations
- Task metadata: status, priority, categories, due date
- Search and filtering support from API query parameters
- Dark mode and dashboard-oriented UI
- Dockerized local environment

## Project Structure

```text
.
├── client/                 # React frontend (Vite + Tailwind)
├── server/                 # Express + MongoDB API
├── docker-compose.yml      # Full local stack (client + server + mongo)
└── README.md
```

## Prerequisites

Choose one setup path:

- **Docker path (recommended):**
  - Docker
  - Docker Compose
- **Local development path:**
  - Node.js 18+
  - npm 9+
  - MongoDB (local or hosted)

## Quick Start (Docker)

1. From the repository root:

   ```bash
   docker-compose up --build
   ```

2. Open the app at:
   - **Frontend:** `http://localhost:8080`
   - **API health:** `http://localhost:5001/api/health`

### Default container ports

- `8080` → client (Nginx serving the Vite build)
- `5001` → server (Express API)
- `27019` → MongoDB

## Local Development (without Docker)

### 1) Backend

```bash
cd server
npm install
npm run dev
```

The API runs on `http://localhost:5000` by default.

### 2) Frontend

In a separate terminal:

```bash
cd client
npm install
npm run dev
```

The Vite dev server runs on `http://localhost:5173` by default.

## Environment Variables

### Server (`server/.env`)

Create a `.env` file in `server/`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=replace_with_a_secure_secret
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
GOOGLE_CLIENT_ID=your_google_client_id
```

### Client (`client/.env`)

Create a `.env` file in `client/` if using Google sign-in in the UI:

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

> When running with Docker Compose, API requests are exposed through `http://localhost:5001` and the production client is served at `http://localhost:8080`.

## API Overview

Base URL (local backend): `http://localhost:5000/api`

### Auth Routes

- `POST /auth/register` — create account
- `POST /auth/login` — sign in with email/password
- `POST /auth/google` — sign in with Google credential token
- `GET /auth/me` — get current user (requires Bearer token)

### Task Routes (authenticated)

- `GET /tasks` — list current user tasks
- `POST /tasks` — create task
- `GET /tasks/:id` — get one task
- `PUT /tasks/:id` — update task
- `DELETE /tasks/:id` — delete task

### Task fields

- `title` (required)
- `description` (optional)
- `status`: `todo` | `in-progress` | `completed`
- `priority`: `low` | `medium` | `high`
- `categories`: string array
- `dueDate`: ISO date

## Authentication

The backend returns a JWT token on successful login/registration. Include it on protected endpoints:

```http
Authorization: Bearer <token>
```

## Scripts

### Server

- `npm run dev` — start backend with nodemon
- `npm start` — start backend with node

### Client

- `npm run dev` — run Vite dev server
- `npm run build` — create production build
- `npm run preview` — preview production build locally

## Troubleshooting

- **CORS error:** Ensure `CLIENT_URL` matches your frontend origin.
- **Mongo connection error:** Verify `MONGODB_URI` and whether MongoDB is running.
- **401 on protected routes:** Check JWT token presence/format (`Bearer <token>`).
- **Google auth failure:** Confirm `GOOGLE_CLIENT_ID` is set in server and client env files.

## Notes

- The repository includes legacy/alternate route files (`server/routes/authRoutes.js`, `server/routes/taskRoutes.js`) that are not the ones currently mounted by `server/index.js`.
- Active routes are mounted from `server/routes/auth.js` and `server/routes/tasks.js`.
