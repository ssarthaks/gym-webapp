# Fitness Webapp - Project Setup & Documentation

## 📋 Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Running the Project](#running-the-project)
- [Database Management](#database-management)
- [Available Scripts](#available-scripts)
- [Implemented Features](#implemented-features)
- [API Endpoints](#api-endpoints)
- [Frontend Pages](#frontend-pages)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

This is a full-stack fitness web application that combines gym equipment marketplace, training programs, and user management. The project is built as a monorepo with both backend (Express.js) and frontend (Next.js) in a unified workspace.

**Current Branch:** `feat/serviceBasedBackend`  
**Status:** Backend authentication system fully implemented with database migrations

---

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18+ or v20+ (Recommended: v24.12.0)
- **npm**: v9+ or v10+
- **MySQL**: v8.0+
- **Git**: Latest version

---

## 🛠️ Technology Stack

### Backend
- **Framework**: Express.js v5.1.0
- **Language**: TypeScript v5.8.3
- **ORM**: Sequelize v6.37.7
- **Database**: MySQL2 v3.14.2
- **Authentication**: JWT (jsonwebtoken v9.0.2)
- **Password Hashing**: bcrypt v6.0.0
- **Email**: nodemailer v7.0.5
- **Security**: express-rate-limit, CORS
- **Validation**: validator v13.15.15, Zod v4.0.17

### Frontend
- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript
- **UI Components**: Radix UI
- **Styling**: Tailwind CSS v3.4.17
- **State Management**: Redux Toolkit v2.8.2
- **Data Fetching**: TanStack Query v5.85.5, Axios v1.11.0
- **Forms**: React Hook Form v7.62.0
- **Icons**: Lucide React v0.540.0

### Development Tools
- **Build Tool**: ts-node-dev v2.0.0
- **Migration Tool**: sequelize-cli v6.6.2
- **Process Manager**: concurrently v9.0.0

---

## 📁 Project Structure

```
FitnessWebapp/
├── server/                          # Backend Express.js application
│   ├── config/
│   │   └── config.js               # Sequelize database configuration
│   ├── migrations/                  # Database migration files
│   │   ├── 20250829102132-create-users-table.js
│   │   ├── 20250829102133-create-sessions-table.js
│   │   └── 20250829102134-create-verification-codes-table.js
│   ├── seeders/                     # Database seed files
│   │   └── 20250829102135-demo-users.js
│   └── src/
│       ├── app.ts                   # Express app configuration
│       ├── index.ts                 # Server entry point
│       ├── config/
│       │   └── database.ts          # Sequelize connection setup
│       ├── controllers/
│       │   └── auth.controller.ts   # Authentication logic
│       ├── middlewares/
│       │   ├── auth.middleware.ts   # JWT authentication
│       │   ├── error.middleware.ts  # Error handling
│       │   ├── session.middleware.ts
│       │   └── validation.middleware.ts
│       ├── models/
│       │   ├── user.model.ts        # User model
│       │   ├── session.model.ts     # Session model
│       │   └── verificationCode.model.ts
│       ├── routes/
│       │   └── auth.routes.ts       # Auth API routes
│       └── utils/
│           ├── emailSendHelper.ts   # Email sending utility
│           ├── generateTokenHelper.ts # JWT token generation
│           ├── validationHelper.ts  # Input validation
│           └── verificationHelper.ts # Verification code logic
│
├── src/                             # Frontend Next.js application
│   ├── api/
│   │   └── auth.ts                  # Auth API client
│   ├── app/                         # Next.js App Router pages
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Home page
│   │   ├── providers.tsx            # Redux/Theme providers
│   │   ├── auth/                    # Auth pages
│   │   ├── cart/                    # Shopping cart
│   │   ├── companies/               # Companies listing
│   │   ├── dashboard/               # User dashboard
│   │   │   ├── company/
│   │   │   ├── orders/
│   │   │   ├── products/
│   │   │   ├── profile/
│   │   │   ├── programs/
│   │   │   └── settings/
│   │   ├── equipment/               # Equipment marketplace
│   │   ├── profile/                 # User profile
│   │   ├── programs/                # Training programs
│   │   └── sell/                    # Seller pages
│   ├── components/
│   │   ├── auth/                    # Auth components
│   │   ├── dashboard/               # Dashboard components
│   │   ├── layout/                  # Layout components (navbar, footer)
│   │   ├── pages/                   # Page-specific components
│   │   └── ui/                      # Reusable UI components (Radix)
│   ├── hooks/
│   │   ├── reduxHooks.ts            # Typed Redux hooks
│   │   └── useAuth.ts               # Authentication hook
│   ├── interfaces/
│   │   └── user.ts                  # TypeScript interfaces
│   ├── lib/
│   │   └── utils.ts                 # Utility functions
│   └── store/
│       ├── authSlice.ts             # Auth Redux slice
│       └── store.ts                 # Redux store configuration
│
├── public/                          # Static assets
├── .env                             # Environment variables
├── package.json                     # Dependencies & scripts
├── tsconfig.json                    # TypeScript config (frontend)
├── next.config.ts                   # Next.js configuration
├── tailwind.config.ts               # Tailwind CSS config
└── components.json                  # shadcn/ui config
```

---

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/ssarthaks/gym-webapp.git
cd FitnessWebapp
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all dependencies for both backend and frontend.

### Step 3: Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Backend API URL for Next.js
NEXT_PUBLIC_API_URL=http://localhost:4200

PORT=4200
NODE_ENV=development

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=gym_webapp_db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_REFRESH_SECRET=your_refresh_secret_key_here

# Email Configuration (for verification codes)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

**Important Notes:**
- Replace `your_mysql_password` with your MySQL root password (leave empty if no password)
- Generate secure random strings for JWT secrets in production
- For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password

### Step 4: Set Up MySQL Database

Make sure MySQL is running on your system:

```bash
# macOS (if using Homebrew)
brew services start mysql

# Or check if MySQL is running
mysql --version
```

### Step 5: Create Database

```bash
npm run db:create
```

This will create the `gym_webapp_db` database.

### Step 6: Run Database Migrations

```bash
npm run migrate
```

This will create the following tables:
- `users` - User accounts with authentication data
- `sessions` - Active user sessions with JWT tokens
- `verification_codes` - Email verification and password reset codes

---

## ▶️ Running the Project

### Development Mode (Recommended)

Run both backend and frontend concurrently:

```bash
npm run dev
```

This will start:
- **Backend Server**: http://localhost:5000
- **Frontend App**: http://localhost:3000

### Run Backend Only

```bash
npm run dev:backend
```

### Run Frontend Only

```bash
npm run dev:frontend
```

### Production Build

```bash
# Build both backend and frontend
npm run build

# Start backend in production
npm run start:backend

# Start frontend in production
npm run start:frontend
```

---

## 🗄️ Database Management

### Migration Commands

```bash
# Run all pending migrations
npm run migrate

# Check migration status
npm run migrate:status

# Undo last migration
npm run migrate:undo

# Undo all migrations
npm run migrate:undo:all
```

### Seeding Commands

```bash
# Run all seed files
npm run seed

# Undo all seeders
npm run seed:undo
```

### Database Commands

```bash
# Create database
npm run db:create

# Drop database (⚠️ Destructive)
npm run db:drop
```

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Run both backend and frontend in development |
| `npm run dev:backend` | Run only backend server (port 5000) |
| `npm run dev:frontend` | Run only frontend app (port 3000) |
| `npm run build` | Build both backend and frontend for production |
| `npm run build:backend` | Build backend TypeScript to JavaScript |
| `npm run build:frontend` | Build Next.js frontend |
| `npm run start:backend` | Start production backend server |
| `npm run start:frontend` | Start production frontend server |
| `npm run migrate` | Run database migrations |
| `npm run migrate:undo` | Undo last migration |
| `npm run migrate:status` | Check migration status |
| `npm run seed` | Run database seeders |
| `npm run db:create` | Create the database |
| `npm run db:drop` | Drop the database |
| `npm run lint` | Run ESLint on frontend code |
| `npm test` | Run tests (not yet configured) |

---

## ✅ Implemented Features

### Backend Features ✓

#### 1. Authentication System
- ✅ User registration with validation
- ✅ User login with JWT token generation
- ✅ Password hashing with bcrypt
- ✅ Session management with database storage
- ✅ JWT authentication middleware
- ✅ Protected route middleware

#### 2. User Management
- ✅ User profile retrieval
- ✅ Profile update (name, phone, address, email)
- ✅ Password change with old password verification
- ✅ Account deletion (soft delete)

#### 3. Email Verification
- ✅ Send email verification code
- ✅ Verify email with 6-digit code
- ✅ Email verification status tracking

#### 4. Password Reset
- ✅ Send password reset code via email
- ✅ Reset password with verification code
- ✅ Code expiration handling (5 minutes)

#### 5. Security Features
- ✅ Rate limiting (100 requests per 15 minutes)
- ✅ CORS configuration
- ✅ Input validation and sanitization
- ✅ SQL injection prevention (via Sequelize ORM)
- ✅ Error handling middleware
- ✅ Token expiration management

#### 6. Database Schema
- ✅ Users table with account types (individual/business)
- ✅ Sessions table for active tokens
- ✅ Verification codes table for email/password reset
- ✅ Sequelize migrations for version control
- ✅ Database relationships and foreign keys

### Frontend Features ✓

#### 1. Pages & Routing
- ✅ Home page with hero section
- ✅ Authentication pages (login/register)
- ✅ User dashboard with sidebar navigation
- ✅ Profile management page
- ✅ Equipment marketplace page
- ✅ Training programs page
- ✅ Companies listing page
- ✅ Shopping cart page
- ✅ Seller registration page

#### 2. Dashboard Sections
- ✅ Dashboard home/overview
- ✅ Company management (for business accounts)
- ✅ Order tracking
- ✅ Product management
- ✅ Program management
- ✅ Settings page
- ✅ Profile page

#### 3. UI Components
- ✅ Navigation bar with authentication state
- ✅ Footer component
- ✅ Dashboard sidebar
- ✅ Protected route wrapper
- ✅ Radix UI component library integration
- ✅ Responsive design with Tailwind CSS

#### 4. State Management
- ✅ Redux Toolkit setup
- ✅ Authentication slice
- ✅ Cookie-based token storage
- ✅ User state persistence

---

## 🔌 API Endpoints

Base URL: `http://localhost:5000/api`

### Authentication Endpoints

#### POST `/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "SecurePass123!",
  "address": "123 Main St, City, Country",
  "accountType": "individual"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "address": "123 Main St, City, Country",
    "accountType": "individual",
    "emailVerified": false
  }
}
```

#### POST `/auth/login`
Login to an existing account.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresAt": "2026-01-05T23:00:00.000Z",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "address": "123 Main St, City, Country",
    "emailVerified": false
  }
}
```

#### GET `/auth/profile`
Get current user profile (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "address": "123 Main St, City, Country",
  "accountType": "individual",
  "emailVerified": false,
  "createdAt": "2026-01-05T10:30:00.000Z"
}
```

#### POST `/auth/change-password`
Change user password (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "oldPassword": "OldPass123!",
  "newPassword": "NewSecurePass456!"
}
```

**Response:**
```json
{
  "message": "Password changed successfully."
}
```

#### PUT `/auth/update-profile`
Update user profile (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "John Smith",
  "phone": "+9876543210",
  "newEmail": "johnsmith@example.com",
  "address": "456 New Ave, City, Country"
}
```

**Response:**
```json
{
  "message": "Profile updated successfully",
  "requiresEmailVerification": true
}
```

#### POST `/auth/send-email-verification`
Send email verification code (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Verification code sent to your email"
}
```

#### POST `/auth/verify-email`
Verify email with code.

**Request Body:**
```json
{
  "email": "john@example.com",
  "code": "123456"
}
```

**Response:**
```json
{
  "message": "Email verified successfully"
}
```

#### POST `/auth/send-password-reset`
Send password reset code to email.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "message": "Password reset code sent to your email"
}
```

#### POST `/auth/reset-password`
Reset password with verification code.

**Request Body:**
```json
{
  "email": "john@example.com",
  "code": "123456",
  "newPassword": "NewSecurePass789!"
}
```

**Response:**
```json
{
  "message": "Password has been reset successfully"
}
```

#### DELETE `/auth/delete-account`
Delete user account (soft delete, requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Account deleted successfully"
}
```

---

## 🌐 Frontend Pages

### Public Pages
- `/` - Home page with featured equipment and programs
- `/auth` - Login/Register page
- `/equipment` - Browse equipment marketplace
- `/programs` - Browse training programs
- `/companies` - View fitness companies
- `/sell` - Become a seller

### Protected Pages (Require Authentication)
- `/dashboard` - User dashboard overview
- `/dashboard/profile` - User profile management
- `/dashboard/company` - Manage company (business accounts)
- `/dashboard/products` - Manage products (sellers)
- `/dashboard/programs` - Manage training programs (sellers)
- `/dashboard/orders` - View order history
- `/dashboard/settings` - Account settings
- `/profile` - Public profile view
- `/cart` - Shopping cart

---

## 🔐 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Backend server port | `4200` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |
| `NEXT_PUBLIC_API_URL` | Backend API URL for Next.js | `http://localhost:4200` |
| `DB_HOST` | MySQL host | `localhost` |
| `DB_USER` | MySQL username | `root` |
| `DB_PASSWORD` | MySQL password | `your_password` |
| `DB_NAME` | Database name | `gym_webapp_db` |
| `JWT_SECRET` | JWT signing secret | `random_secure_string` |
| `JWT_REFRESH_SECRET` | Refresh token secret | `another_random_string` |
| `EMAIL_USER` | Email account for sending | `your_email@gmail.com` |
| `EMAIL_PASS` | Email password/app password | `app_password` |

---

## 🐛 Troubleshooting

### Database Connection Issues

**Problem:** Cannot connect to MySQL database

**Solutions:**
1. Check if MySQL is running:
   ```bash
   mysql --version
   brew services list  # macOS
   ```

2. Verify credentials in `.env`:
   ```bash
   mysql -u root -p
   # Enter password and check if you can connect
   ```

3. Check if database exists:
   ```bash
   mysql -u root -p -e "SHOW DATABASES;"
   ```

### Migration Errors

**Problem:** Migration fails or table already exists

**Solutions:**
1. Check migration status:
   ```bash
   npm run migrate:status
   ```

2. Undo migrations and re-run:
   ```bash
   npm run migrate:undo:all
   npm run migrate
   ```

3. Drop and recreate database (⚠️ loses all data):
   ```bash
   npm run db:drop
   npm run db:create
   npm run migrate
   ```

### Port Already in Use

**Problem:** Port 5000 or 3000 is already in use

**Solutions:**
1. Find and kill the process:
   ```bash
   # Find process on port 5000
   lsof -ti:5000 | xargs kill -9
   
   # Find process on port 3000
   lsof -ti:3000 | xargs kill -9
   ```

2. Or change ports in `.env`:
   ```env
   PORT=4201
   NEXT_PUBLIC_API_URL=http://localhost:4201
   ```

### Email Sending Issues

**Problem:** Email verification/reset codes not sending

**Solutions:**
1. For Gmail, enable 2-factor authentication and create an [App Password](https://support.google.com/accounts/answer/185833)
2. Update `.env` with the app password
3. Check email service settings in [emailSendHelper.ts](server/src/utils/emailSendHelper.ts)

### TypeScript Compilation Errors

**Problem:** TypeScript errors during development

**Solutions:**
1. Clean build:
   ```bash
   rm -rf server/dist
   npm run build:backend
   ```

2. Check TypeScript version:
   ```bash
   npx tsc --version
   ```

---

## 📝 Development Progress & Status

### ✅ Completed
- Backend authentication system with complete CRUD operations
- Database schema with migrations
- JWT-based session management
- Email verification and password reset
- Input validation and sanitization
- Security middleware (rate limiting, CORS)
- Frontend page structure and routing
- Redux state management setup
- UI component library integration

### 🚧 In Progress / Next Steps
- Frontend authentication form integration
- API client implementation
- Dashboard functionality
- Equipment marketplace features
- Training program management
- Payment integration
- Order processing system
- Search and filtering
- Admin panel

### 📅 Future Enhancements
- Real-time chat/messaging
- Notification system
- Analytics dashboard
- Mobile app (React Native)
- Social features (following, reviews)
- Multi-language support
- Advanced search with filters
- Video streaming for workout programs

---

## 👥 Team & Contact

**Developer:** Sarthak  
**Repository:** [github.com/ssarthaks/gym-webapp](https://github.com/ssarthaks/gym-webapp)  
**Current Branch:** feat/serviceBasedBackend

---

## 📄 License

ISC License - See LICENSE file for details

---

**Last Updated:** January 5, 2026  
**Document Version:** 1.0.0
