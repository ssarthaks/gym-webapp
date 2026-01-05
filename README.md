# Fitness Webapp 💪

A full-stack fitness marketplace and training platform connecting gym equipment sellers, fitness programs, and users in a unified ecosystem.

## 🎯 Overview

This is a comprehensive fitness web application built as a monorepo with:
- **Backend**: Express.js + TypeScript + MySQL + Sequelize
- **Frontend**: Next.js 16 (App Router) + Redux Toolkit + Tailwind CSS

**Current Status**: Backend authentication system fully implemented with database migrations. Frontend structure complete, API integration in progress.

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Setup database
npm run db:create
npm run migrate

# Run the app (backend + frontend)
npm run dev
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

```

**Visit:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

📚 **For detailed setup instructions, see [PROJECT_SETUP.md](PROJECT_SETUP.md)**

## ✨ Key Features

### Implemented ✅
- Complete user authentication (register, login, JWT sessions)
- Email verification system with 6-digit codes
- Password reset functionality
- User profile management
- Protected routes with middleware
- Rate limiting and security headers
- Database migrations with Sequelize

### In Development 🚧
- Equipment marketplace
- Training program management
- Shopping cart and checkout
- Order processing
- Business account features
- Dashboard analytics

## 🛠️ Tech Stack

**Frontend:** Next.js 16, TypeScript, Redux Toolkit, Tailwind CSS, Radix UI  
**Backend:** Express.js, TypeScript, MySQL, Sequelize, JWT, bcrypt  
**Tools:** ts-node-dev, sequelize-cli, concurrently

## 📦 Project Structure

```
├── server/          # Express.js backend
│   ├── src/         # Controllers, models, routes, middleware
│   ├── migrations/  # Database migrations
│   └── config/      # Database configuration
├── src/             # Next.js frontend
│   ├── app/         # App router pages
│   ├── components/  # React components
│   └── store/       # Redux state management
└── public/          # Static assets
```

## 📚 Documentation

- **[PROJECT_SETUP.md](PROJECT_SETUP.md)** - Complete setup guide, API documentation, troubleshooting
- **[.env.example](.env.example)** - Environment variables template

## 🤝 Contributing

This project is currently in active development on the `feat/serviceBasedBackend` branch.

## 📝 License

ISC

---

**Developer:** Sarthak  
**Repository:** [github.com/ssarthaks/gym-webapp](https://github.com/ssarthaks/gym-webapp)
