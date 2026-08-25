# Employee Management System

A full-stack employee management app with React (Vite + Tailwind), Node.js (Express), and MySQL (Knex).

## Tech stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MySQL with Knex migrations

## Prerequisites

- Node.js 18+
- MySQL 8+

## Database setup

Create the database in MySQL:

```sql
CREATE DATABASE employee_db;
```

## Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env` with your MySQL credentials:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=employee_db
```

Run migrations and start the server:

```bash
npm run migrate
npm run dev
```

The API runs at `http://localhost:5000`.

### API endpoints

| Method | Endpoint              | Description     |
|--------|-----------------------|-----------------|
| GET    | `/api/employees`      | List employees  |
| GET    | `/api/employees/:id`  | Get one         |
| POST   | `/api/employees`      | Create          |
| PUT    | `/api/employees/:id`  | Update          |
| DELETE | `/api/employees/:id`  | Delete          |

## Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:5173` in your browser.

The frontend reads the API URL from `VITE_API_URL` (default: `http://localhost:5000/api`).

## Project structure

```
Employee/
├── backend/          # Express API + Knex
├── frontend/         # React UI
└── README.md
```

## Employee fields

- First name, last name, email (required)
- Department, position, salary (optional)
