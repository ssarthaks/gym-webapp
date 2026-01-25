# User Dashboard & CRUD Implementation

## Overview
Implemented real-time user data fetching and CRUD operations for both user and admin dashboards.

## Backend Implementation

### 1. User Controller (`server/src/controllers/user.controller.ts`)
- `getAllUsers`: Get paginated list of users with search and filtering
- `getUserById`: Get specific user details
- `updateUser`: Update user information (admin or self)
- `deleteUser`: Soft delete users (admin or self)
- `getUserStats`: Get user statistics for admin dashboard

### 2. Admin Middleware (`server/src/middlewares/admin.middleware.ts`)
- Checks if user has business account (admin role)
- Restricts access to admin-only endpoints

### 3. User Routes (`server/src/routes/user.routes.ts`)
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/stats` - Get user statistics (admin only)
- `GET /api/users/:id` - Get user by ID (authenticated)
- `PUT /api/users/:id` - Update user (admin or self)
- `DELETE /api/users/:id` - Delete user (admin or self)

## Frontend Implementation

### 1. User API Service (`src/api/users.ts`)
- `getAllUsers()` - Fetch all users with pagination/filtering
- `getUserById()` - Fetch single user
- `updateUser()` - Update user data
- `deleteUser()` - Delete user
- `getUserStats()` - Fetch user statistics
- `getCurrentUser()` - Fetch current logged-in user

### 2. Redux State Management (`src/store/userSlice.ts`)
Async Thunks:
- `fetchUsers` - Fetch paginated users list
- `fetchUserById` - Fetch specific user
- `fetchCurrentUser` - Fetch current user profile
- `updateUserData` - Update user information
- `deleteUserData` - Delete user
- `fetchUserStats` - Fetch statistics

### 3. Dashboard Components

#### User Profile (`src/components/dashboard/pages/DashboardProfile.tsx`)
- Displays real-time user information
- Edit profile with live updates
- Shows account details and verification status
- Updates Redux store on successful edits

#### Admin Users Management (`src/components/dashboard/pages/DashboardUsers.tsx`)
- **Stats Dashboard**: Total users, individual users, business users, new users
- **User Table**: Paginated list with search and filtering
- **Search**: Search by name, email, or phone
- **Filter**: Filter by account type (individual/business)
- **Edit User**: Modal to update user information
- **Delete User**: Confirmation dialog for user deletion
- **Pagination**: Navigate through user pages

#### Dashboard Home (`src/components/dashboard/pages/DashboardHome.tsx`)
- Shows personalized welcome message with user name
- Displays different stats for admin vs regular users
- Admin: User statistics (total, individual, business, verified)
- Regular: Product and program statistics

### 4. Dashboard Sidebar (`src/components/dashboard/dashboard-sidebar.tsx`)
- Conditionally shows "Users" menu item for admin accounts only
- Filters navigation based on user role

### 5. Routes
- `/dashboard/profile` - User profile page
- `/dashboard/users` - Admin users management page (admin only)

## Features

### User Dashboard
✅ Real-time profile data fetching
✅ Edit own profile information
✅ View account details and status
✅ Personalized dashboard stats

### Admin Dashboard
✅ View all users with pagination
✅ Search users by name, email, phone
✅ Filter users by account type
✅ Edit any user's information
✅ Delete users (soft delete)
✅ View user statistics
✅ Real-time data updates

## Security
- Authentication required for all endpoints
- Admin middleware restricts sensitive operations
- Users can only edit/delete themselves unless admin
- Email verification reset when email changes
- Token-based authentication via cookies

## Usage

### For Regular Users:
1. Navigate to `/dashboard/profile` to view/edit profile
2. View personalized stats on dashboard home

### For Admin Users:
1. Navigate to `/dashboard/users` to manage all users
2. Search, filter, edit, or delete users
3. View comprehensive user statistics
4. Dashboard home shows user-related metrics

## API Flow
```
Frontend Component
    ↓
Redux Thunk (userSlice)
    ↓
API Service (users.ts)
    ↓
Backend Route (user.routes.ts)
    ↓
Middleware (auth + admin)
    ↓
Controller (user.controller.ts)
    ↓
Model (user.model.ts)
    ↓
Database
```
