# TaskFlow

A full-stack task manager with guest mode, Google OAuth, dark mode, and full CRUD.

## Quick Start

```bash
docker-compose up --build
```

App runs at **http://localhost:8080**

## Google OAuth Setup (optional)
1. Go to console.cloud.google.com
2. Create OAuth 2.0 Client ID
3. Add `http://localhost:8080` as authorized origin
4. Add to client/.env: `VITE_GOOGLE_CLIENT_ID=your_id_here`
5. Add to docker-compose.yml env: `GOOGLE_CLIENT_ID=your_id_here`
6. Rebuild: `docker-compose up --build`

## Features
- Guest mode (5 tasks, then prompted to sign in)
- Email/password auth + Google OAuth placeholder
- Full CRUD tasks
- Categories/tags
- Priority levels
- Status tracking
- Search & filter
- Dark mode
- Docker ready
