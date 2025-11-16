# Gym WebApp - Fullstack Application

A fullstack gym webapp with Next.js frontend and Express.js backend, sharing a single monorepo structure.

## 📁 Project Structure

```
gym-webapp/
├── src/                    # Next.js frontend
│   ├── app/               # App router pages
│   ├── components/        # React components
│   ├── hooks/            # Custom hooks
│   └── store/            # Redux store
├── server/                # Express.js backend
│   ├── src/              # Backend source code
│   ├── migrations/       # Database migrations
│   ├── seeders/          # Database seeders
│   └── config/           # Backend configuration
├── public/               # Static assets
└── package.json          # Shared dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MySQL 8.0+
- npm or yarn

### Initial Setup

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd gym-webapp
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**

   Copy and edit the `.env.example` file:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and fill in your values:

   ```env
   # Backend Configuration
   PORT=5000
   NODE_ENV=development

   # Frontend URL for CORS
   FRONTEND_URL=http://localhost:3000

   # Database Configuration
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=gym_webapp_db

   # JWT Configuration
   JWT_SECRET=your_super_secret_key_here
   JWT_REFRESH_SECRET=your_refresh_secret_key_here

   # Email Configuration
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password

   # Next.js Frontend
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. **Setup Database**

   Create the database:

   ```bash
   npm run db:create
   ```

   Run migrations:

   ```bash
   npm run migrate
   ```

   (Optional) Seed demo data:

   ```bash
   npm run seed
   ```

### Development

**Run both frontend and backend concurrently:**

```bash
npm run dev
```

**Or run them separately:**

Frontend (Next.js on port 3000):

```bash
npm run dev:frontend
```

Backend (Express on port 5000):

```bash
npm run dev:backend
```

### Production Build

1. **Build both applications:**

   ```bash
   npm run build
   ```

2. **Start production servers:**

   Backend:

   ```bash
   npm run start:backend
   ```

   Frontend:

   ```bash
   npm run start:frontend
   ```

## 📝 Available Scripts

### Development

- `npm run dev` - Run both frontend and backend concurrently
- `npm run dev:frontend` - Run Next.js dev server (port 3000)
- `npm run dev:backend` - Run Express dev server (port 5000)

### Build

- `npm run build` - Build both frontend and backend
- `npm run build:frontend` - Build Next.js app
- `npm run build:backend` - Compile TypeScript backend

### Database

- `npm run migrate` - Run all pending migrations
- `npm run migrate:undo` - Undo last migration
- `npm run migrate:status` - Check migration status
- `npm run seed` - Run all seeders
- `npm run seed:undo` - Undo all seeders
- `npm run db:create` - Create database
- `npm run db:drop` - Drop database

### Production

- `npm run start:frontend` - Start Next.js production server
- `npm run start:backend` - Start Express production server

## 🔧 Tech Stack

### Frontend

- Next.js 15.5
- React 19
- TypeScript
- Redux Toolkit
- TailwindCSS
- Radix UI
- React Hook Form + Zod

### Backend

- Express.js
- TypeScript
- Sequelize ORM
- MySQL
- JWT Authentication
- Nodemailer
- bcrypt

## 🌐 API Integration

The frontend proxies API requests to the backend. Use the `/api` prefix:

```typescript
// Frontend code
const response = await fetch("/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});
```

This automatically routes to `http://localhost:5000/auth/login`

## 📚 Key Configuration Files

- `.env` - Environment variables
- `.sequelizerc` - Sequelize CLI configuration
- `next.config.ts` - Next.js configuration with API proxy
- `tsconfig.json` - Frontend TypeScript config
- `server/tsconfig.json` - Backend TypeScript config

## 🐛 Troubleshooting

**Port already in use:**

- Change `PORT` in `.env` (backend)
- Next.js port can be changed: `PORT=3001 npm run dev:frontend`

**Database connection error:**

- Ensure MySQL is running
- Verify credentials in `.env`
- Check database exists: `npm run db:create`

**CORS errors:**

- Verify `FRONTEND_URL` in `.env` matches your frontend URL
- Check `NEXT_PUBLIC_API_URL` in `.env`

## 📄 License

ISC
