# FitForge (MERN) — Calories, Workouts, Diet, Progress + Admin

FitForge is a MERN-stack fitness application that lets users register/login, track calories, generate workout plans, plan diets, and record progress. An admin section is also included for high-level management.

---

## Features

### User (Authenticated)
- **Register / Login** using JWT authentication
- **Profile**
  - View profile
  - Update profile details
  - Upload **profile image**
- **Calories Tracker** (CRUD via protected endpoints)
- **Workout Plan Generator** (generates a workout plan from goal/experience/days per week)
- **Diet Planner** (protected endpoints)
- **Progress Tracker** (protected endpoints)

### Admin (Protected)
- **Dashboard statistics** (counts across collections)
- **Users management** (list/delete users)

---

## Tech Stack

- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, Multer (file upload)
- **Frontend:** React, Vite, React Router, Axios
- **Auth:** JWT stored in `localStorage` (frontend) and sent as `Authorization: Bearer <token>`

---

## Project Structure

```text
FitForge/
  backend/
    server.js
    routes/
    controllers/
    models/
    middleware/
    uploads/            # uploaded images are served from here
  frontend/
    src/
      services/api.js   # axios base client (VITE_API_URL)
      pages/            # UI pages
      routes/           # ProtectedRoute wrapper
    public/
    package.json
  README.md
```

---

## Prerequisites

- Node.js (LTS recommended)
- MongoDB running (local or Atlas)

---

## Environment Variables

### 1) Backend (`backend/`)
Create a `.env` file in `backend/`.

```bash
NODE_ENV=development
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
FRONTEND_URL=http://localhost:5173
```

> Notes:
> - `JWT_SECRET` is used to sign/verify tokens.
> - `FRONTEND_URL` is used to allow CORS for your frontend origin.

### 2) Frontend (`frontend/`)
Create a `.env` file in `frontend/`.

```bash
VITE_API_URL=http://localhost:8000/api
```

> Notes:
> - The frontend axios client uses `import.meta.env.VITE_API_URL`.

---

## Setup & Run

### Backend
From the `backend/` folder:

```bash
npm install
npm run dev
```

Backend runs on `PORT` (default in code is `8000`) and exposes API endpoints.

### Frontend
From the `frontend/` folder:

```bash
npm install
npm run dev
```

Frontend runs on Vite’s dev port (commonly `5173`).

### Open the App
- Visit the Vite URL shown in the terminal.
- Login/Register to access protected routes.

---

## API Overview (High-Level)

### Base Paths
- Auth: **`/api/auth`**
- Calories: **`/api/calories`**
- Workout: **`/api/workout`**
- Diet: **`/api/diet`**
- Progress: **`/api/progress`**
- Admin: **`/api/admin`**

### Authentication Flow
1. **Frontend** sends `POST /api/auth/register` (name, email, password)
2. **Frontend** sends `POST /api/auth/login` (email, password)
3. Backend returns a **JWT** token (expires in **7 days**)
4. Frontend stores token in `localStorage`
5. Axios adds header:
   - `Authorization: Bearer <token>`
6. Protected routes use `authMiddleware` to verify JWT and attach `req.user`

---

## Uploaded Images

- Backend serves uploaded files from:
  - `GET /uploads/*`
- Profile image is stored in the user document as:
  - `/uploads/<filename>`

---

## Production Notes

- `backend/server.js` includes logic to serve the built frontend (`frontend/dist`) when `NODE_ENV === 'production'`.
- In production, ensure:
  - `frontend/dist` is generated (`npm run build` in frontend)
  - CORS origins are configured correctly

---

## Scripts

### Backend
- `npm run dev` — start with nodemon
- `npm start` — start server.js

### Frontend
- `npm run dev` — Vite dev server
- `npm run build` — production build
- `npm run preview` — preview build

---

## Quick Start (Most Common)

1. Configure env files as described above
2. Terminal A:
   - `cd backend && npm install && npm run dev`
3. Terminal B:
   - `cd frontend && npm install && npm run dev`
4. Open the frontend URL and use the app.

---

## Assets / Test Data

The repository includes sample images under:
- `backend/uploads/`
- `frontend/src/IMG/`

---

Enjoy using FitForge—track your fitness journey in one place!
