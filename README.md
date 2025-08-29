# Gym WebApp Backend

All in one digital marketplace for gym owners and program organizers.

## Features

- User authentication with JWT
- Email verification system
- Password reset functionality
- Database migrations with Sequelize
- Session management
- Rate limiting
- Input validation

## Setup

### Prerequisites

- Node.js (v18 or higher)
- MySQL database
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:

   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables in `.env`:

   ```
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_HOST=localhost
   PORT=3000
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email_user
   EMAIL_PASSWORD=your_email_password
   ```

5. Create the database:

   ```bash
   npm run db:create
   ```

6. Run migrations to set up the database schema:

   ```bash
   npm run migrate
   ```

7. (Optional) Run seeders to populate with sample data:
   ```bash
   npm run seed
   ```

## Development

Start the development server:

```bash
npm run dev
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## Database Management

This project uses Sequelize CLI for database migrations. See [MIGRATIONS.md](./MIGRATIONS.md) for detailed documentation.

### Quick Commands

- `npm run migrate` - Run pending migrations
- `npm run migrate:status` - Check migration status
- `npm run seed` - Run seeders
- `npm run migrate:undo` - Undo last migration

## API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/change-password` - Change password
- `PUT /api/auth/profile` - Update profile
- `DELETE /api/auth/account` - Delete account
- `GET /api/auth/profile` - Get user profile

### Email Verification

- `POST /api/auth/send-email-verification` - Send email verification code
- `POST /api/auth/verify-email` - Verify email with code

### Password Reset

- `POST /api/auth/send-password-reset` - Send password reset code
- `POST /api/auth/reset-password` - Reset password with code

## Project Structure

```
src/
├── app.ts                 # Express app configuration
├── index.ts              # Server entry point
├── config/
│   ├── database.ts       # Database configuration
│   └── config.js         # Sequelize CLI configuration
├── controllers/
│   └── auth.controller.ts # Authentication controllers
├── middlewares/
│   ├── auth.middleware.ts      # JWT authentication
│   ├── error.middleware.ts     # Error handling
│   ├── session.middleware.ts   # Session management
│   └── validation.middleware.ts # Input validation
├── models/
│   ├── user.model.ts           # User model
│   ├── session.model.ts        # Session model
│   └── verificationCode.model.ts # Verification code model
├── routes/
│   └── auth.routes.ts     # Authentication routes
├── utils/
│   ├── emailSendHelper.ts    # Email utilities
│   ├── generateTokenHelper.ts # Token utilities
│   ├── migrationHelper.ts    # Migration utilities
│   ├── validationHelper.ts   # Validation utilities
│   └── verificationHelper.ts # Verification utilities
├── migrations/           # Database migrations
├── seeders/             # Database seeders
└── scripts/
    └── migrate.ts       # Migration CLI script
```

## Scripts

- `npm run dev` - Start development server with auto-restart
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run migrate` - Run database migrations
- `npm run seed` - Run database seeders

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run migrations if you've modified the database schema
5. Test your changes
6. Submit a pull request

## License

ISC
