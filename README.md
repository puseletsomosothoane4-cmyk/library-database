# Library Management System — BIWA2110 Week 12 continuation

This project is organised to meet the assignment's React + Express + MySQL structure. It provides a React/Vite frontend, an Express REST API, and a MySQL schema.

## Folder structure

```text
library-management-system-continuation/
├── frontend/                 # React + Vite application
│   ├── src/main.jsx
│   ├── src/style.css
│   ├── index.html
│   └── package.json
├── backend/                  # Express REST API
│   ├── routes/books.js
│   ├── routes/users.js
│   ├── routes/transactions.js
│   ├── db/schema.sql
│   ├── db/seed.js
│   ├── db.js
│   ├── server.js
│   └── .env.example
└── README.md
```

## Requirements
- Node.js (LTS)
- MySQL Server and a MySQL client such as MySQL Workbench
- VS Code (recommended)

## 1. Create the database
1. Start MySQL Server.
2. Open MySQL Workbench and run all the commands in `backend/db/schema.sql`.

## 2. Configure and start the backend
Open a terminal in the `backend` folder and run:

```bash
npm install
```

Copy `.env.example` to a new file named `.env` and enter your MySQL password and database details. Do not upload `.env` to GitHub.

Create the demo administrator, then start the API:

```bash
node db/seed.js
npm run dev
```

The API runs at `http://localhost:5000`. Test `http://localhost:5000/api/health` in your browser.

Demo login: `ADMIN001` / `admin123`.

## 3. Start the React frontend
Open a second terminal in the `frontend` folder and run:

```bash
npm install
npm run dev
```

Open the Vite address, normally `http://localhost:5173`.

## API routes
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/books` | List books |
| POST | `/api/books` | Add a book |
| PUT | `/api/books/:id` | Update a book |
| DELETE | `/api/books/:id` | Delete a book |
| GET | `/api/users` | List users |
| POST | `/api/users` | Add a user |
| DELETE | `/api/users/:id` | Delete a user |
| POST | `/api/users/login` | Verify login details |
| GET | `/api/transactions` | List transaction history |
| POST | `/api/transactions` | Add stock, borrow, or return copies |

## Important notes
- Stock transactions are performed in a database transaction and prevent the available quantity from becoming negative.
- Passwords are stored as bcrypt hashes, not plain text.
- This is an academic starter implementation. Before production use, add authenticated sessions or JWTs, role-based authorization on protected API routes, input validation, and stronger security controls. The current frontend login is a basic demonstration and does not yet protect every page or backend route.
- The public GitHub repository README described the React app, but its visible file list did not include the referenced `src/` source folder. This continuation package therefore reconstructs the frontend based on the repository's documented features and adds the Express/MySQL backend required by Week 12.
