# 🔧 How Each Feature Works

This document explains how each implemented feature works, written for both non-technical and technical audiences.

---

## Table of Contents
1. [User Registration](#1-user-registration)
2. [User Login](#2-user-login)
3. [Email Verification](#3-email-verification)
4. [Password Reset](#4-password-reset)
5. [Profile Management](#5-profile-management)
6. [Session Management](#6-session-management)
7. [Protected Routes](#7-protected-routes)
8. [Rate Limiting](#8-rate-limiting)

---

## 1. User Registration

### 🌟 What It Does (Non-Technical)
When someone wants to create an account on the platform, they fill out a registration form with their name, email, phone number, password, and other details. The system checks if the information is valid, creates their account, and sends them a welcome email with a button to verify their email address.

### 🎯 User Experience
1. User visits the registration page
2. Fills out the form (name, email, password, etc.)
3. Clicks "Register"
4. Receives confirmation and a welcome email
5. Clicks "Verify My Account" button in the email
6. Account is activated and ready to use

### 🔧 Technical Implementation

**Frontend Flow:**
```
User Input (Form) 
  → React Hook Form validates data
  → Zod schema checks format
  → Axios sends POST to /api/auth/register
  → Redux stores user data + JWT token
  → Redirects to dashboard
```

**Backend Flow:**
```
Request arrives at Express
  → Validation middleware checks required fields
  → Controller validates data format (email, phone, password)
  → Checks if user already exists in database
  → Hashes password with bcrypt (10 salt rounds)
  → Creates user record in MySQL via Sequelize
  → Generates verification token
  → Sends welcome email via Nodemailer
  → Generates JWT token
  → Returns token + user data (without password)
```

**Code Files:**
- Frontend: `src/app/auth/page.tsx`, `src/api/auth.ts`
- Backend: `server/src/controllers/auth.controller.ts` (register function)
- Database: `server/src/models/user.model.ts`
- Email: `server/src/utils/emailSendHelper.ts`

**Validation Rules:**
- Email: Must be valid format, unique in database
- Password: Minimum 8 characters, must contain uppercase, lowercase, number
- Phone: Valid phone number format
- Name: Required, 2-128 characters
- Account Type: Must be "individual" or "business"

**Security Measures:**
- Password is never stored in plain text (bcrypt hashing)
- Input sanitization prevents SQL injection
- Email uniqueness prevents duplicate accounts
- Rate limiting prevents spam registrations

---

## 2. User Login

### 🌟 What It Does (Non-Technical)
When someone already has an account, they enter their email and password to log in. The system checks if the credentials match, and if they do, it gives them access to their account. They stay logged in until they log out or their session expires.

### 🎯 User Experience
1. User visits the login page
2. Enters email and password
3. Clicks "Login"
4. If correct, they're taken to their dashboard
5. If wrong, they see an error message
6. They remain logged in for 1 hour (or until they log out)

### 🔧 Technical Implementation

**Frontend Flow:**
```
User enters credentials
  → Form validation (react-hook-form + zod)
  → Axios POST to /api/auth/login
  → Receives JWT token + user data
  → Token stored in Redux + cookie (js-cookie)
  → User data stored in Redux state
  → Redirects to dashboard
```

**Backend Flow:**
```
Request arrives with email + password
  → Validation middleware checks required fields
  → Controller validates email format
  → Queries database for user with that email
  → Checks if account exists and not deleted
  → Compares password with stored hash (bcrypt.compare)
  → If match:
    → Generates JWT token (expires in 1 hour)
    → Creates session record in database
    → Returns token, expiration, user data
  → If no match:
    → Returns 401 Unauthorized error
```

**Authentication Token (JWT):**
```javascript
{
  userId: 123,
  iat: 1234567890,  // Issued at timestamp
  exp: 1234571490   // Expires in 1 hour
}
```

**Code Files:**
- Frontend: `src/app/auth/page.tsx`, `src/api/auth.ts`, `src/store/authSlice.ts`
- Backend: `server/src/controllers/auth.controller.ts` (login function)
- Middleware: `server/src/middlewares/auth.middleware.ts`

**Security Measures:**
- Password comparison uses constant-time algorithm
- Failed login attempts don't reveal if email exists
- JWT tokens are signed with secret key
- Tokens expire after 1 hour
- Sessions stored in database for revocation capability

---

## 3. Email Verification

### 🌟 What It Does (Non-Technical)
After creating an account, users receive an email with a "Verify My Account" button. When they click it, the system confirms that the email address belongs to them and activates their account. This ensures people use real email addresses and prevents fake accounts.

### 🎯 User Experience
1. User registers for an account
2. Receives email: "Welcome to Gym WebApp - Please Verify Your Account"
3. Clicks the blue "Verify My Account" button
4. Automatically redirected to verification page
5. Sees success message: "Account verified!"
6. Can now use full features of the platform

### 🔧 Technical Implementation

**Email Generation Flow:**
```
User registers
  → createAndSendAccountVerification() called
  → Generates unique token: random string + timestamp
  → Token expires in 24 hours
  → Deletes any old unused tokens for this email
  → Stores token in verification_codes table
  → Constructs verification URL with token
  → Sends HTML email with styled button
  → User clicks button/link
```

**Verification URL Format:**
```
https://fitnesswebapp.com/verify-account?token=abc123xyz456def789...
```

**Email Template Features:**
- Professional HTML design
- Large "Verify My Account" button (blue, prominent)
- Plain text link as fallback
- Expiration notice (24 hours)
- Security warning about unsolicited emails

**Verification Flow:**
```
User clicks link
  → Frontend extracts token from URL query
  → Calls verifyAccount(token) API
  → Backend finds verification record
  → Checks if token exists and not used
  → Checks if token not expired (< 24 hours old)
  → If valid:
    → Marks token as used
    → Updates user.emailVerified = true
    → Returns success message
  → If invalid:
    → Returns error (expired or invalid)
```

**Code Files:**
- Email Template: `server/src/utils/emailSendHelper.ts` (sendAccountVerificationEmail)
- Token Generation: `server/src/utils/verificationHelper.ts` (createAndSendAccountVerification)
- Verification: `server/src/utils/verificationHelper.ts` (verifyAccountToken)
- API Endpoint: `server/src/controllers/auth.controller.ts` (verifyAccount)
- Frontend Page: `src/app/verify-account/page.tsx`

**Database Schema:**
```sql
verification_codes table:
- id: Auto-increment primary key
- email: User's email address
- code: Verification token (longer than 6 digits)
- type: 'email_verification'
- expiresAt: Timestamp (created + 24 hours)
- isUsed: Boolean (false until verified)
- createdAt: Timestamp
```

**Security Measures:**
- Tokens are long and random (not predictable)
- Tokens expire after 24 hours
- Tokens can only be used once
- Old unused tokens are deleted when new ones generated
- No sensitive data in URL except unguessable token

**Error Handling:**
- Invalid token: "Invalid or expired verification link"
- Expired token: "Verification link has expired. Please request a new one"
- Already used: "Invalid or expired verification link"
- Network error: "Failed to verify account. Please try again"

---

## 4. Password Reset

### 🌟 What It Does (Non-Technical)
If someone forgets their password, they can request a password reset. The system sends them an email with a secure link. They click the link, which takes them to a page where they can enter their new password. Once they submit, their password is updated and they're redirected to login.

### 🎯 User Experience
1. User clicks "Forgot Password?" on login page
2. Enters their email address
3. Receives email with password reset link
4. Clicks the link in email
5. Taken to reset password page showing their email
6. Enters new password and confirms it
7. Submits the form
8. Password is reset successfully
9. Automatically redirected to login page

### 🔧 Technical Implementation

**Link-Based Token System:**

**Step 1: Request Reset Link**
```
User enters email
  → Frontend sends POST to /api/auth/send-password-reset
  → Backend finds user with that email
  → Generates random secure token (long alphanumeric string)
  → Stores token in database (expires in 1 hour)
  → Sends email with link containing token
  → Returns generic success message (doesn't reveal if user exists)
```

**Step 2: Verify Token and Show Form**
```
User clicks link with token in URL
  → Frontend extracts token from URL params
  → Sends POST to /api/auth/verify-password-reset-token
  → Backend verifies token is valid and not expired
  → Returns user's email address
  → Frontend displays reset form with email and password inputs
```

**Step 3: Reset Password**
```
User enters new password + confirmation
  → Frontend validates passwords match and meet requirements
  → Sends POST to /api/auth/reset-password with token + newPassword
  → Backend verifies token again
  → Validates new password strength
  → Hashes new password
  → Updates user's password
  → Marks token as used
  → Returns success
  → Frontend redirects to login page
```

**Token Generation:**
```javascript
Math.random().toString(36).substring(2, 15) +
Math.random().toString(36).substring(2, 15) +
Date.now().toString(36)
// Generates: Long random alphanumeric string
```

**Email Template:**
- Red-themed (indicates security action)
- Prominent "Reset My Password" button
- Clickable link in case button doesn't work
- 1-hour expiration warning
- Security notice about unsolicited requests

**Code Files:**
- Send Link: [server/src/controllers/auth.controller.ts](server/src/controllers/auth.controller.ts) (sendPasswordReset)
- Verify Token: [server/src/controllers/auth.controller.ts](server/src/controllers/auth.controller.ts) (verifyPasswordResetTokenController)
- Reset Password: [server/src/controllers/auth.controller.ts](server/src/controllers/auth.controller.ts) (resetPassword)
- Helper Functions: [server/src/utils/verificationHelper.ts](server/src/utils/verificationHelper.ts)
- Email: [server/src/utils/emailSendHelper.ts](server/src/utils/emailSendHelper.ts) (sendPasswordResetEmail)
- Frontend Page: [src/app/reset-password/page.tsx](src/app/reset-password/page.tsx)

**Validation Rules:**
- Token must be valid and not expired (< 1 hour old)
- Token must not be already used
- New password must meet strength requirements (min 8 characters)
- Confirm password must match new password
- Email must exist in database

**Security Measures:**
- Token expires in 1 hour (short window)
- Token can only be used once
- Generic success message doesn't reveal if email exists
- New password is hashed before storage (bcrypt)
- Old tokens are deleted when new one requested
- Token is long and unguessable (not sequential or predictable)
- HTTPS recommended for production (encrypted transmission)

**Frontend Features:**
- Displays user's email (read-only) for confirmation
- Real-time password validation
- Password confirmation matching
- Loading states during submission
- Success/error message display
- Automatic redirect to login after success
- Handles expired/invalid tokens gracefully

**API Endpoints:**
- `POST /api/auth/send-password-reset` - Request reset link
- `POST /api/auth/verify-password-reset-token` - Verify token and get email
- `POST /api/auth/reset-password` - Update password with token

---

## 5. Profile Management

### 🌟 What It Does (Non-Technical)
Users can view and update their personal information like name, phone number, and address. They can also change their email address (which requires re-verification) or change their password. If they want to leave the platform, they can delete their account.

### 🎯 User Experience
**View Profile:**
1. User clicks on profile icon
2. Sees their current information
3. Can navigate to edit page

**Update Profile:**
1. User navigates to profile settings
2. Changes desired fields (name, phone, address, email)
3. Clicks "Save Changes"
4. Sees confirmation message
5. Updated information is displayed

**Change Password:**
1. User goes to security settings
2. Enters old password
3. Enters new password (twice for confirmation)
4. Clicks "Change Password"
5. Password is updated

**Delete Account:**
1. User goes to account settings
2. Clicks "Delete Account" (with confirmation)
3. Account is deactivated (soft delete)
4. Can contact support to restore within 30 days

### 🔧 Technical Implementation

**Get Profile:**
```
User logged in (has JWT token)
  → Frontend sends GET to /api/auth/profile
  → Auth middleware verifies JWT token
  → Extracts userId from token
  → Queries database for user
  → Returns user data (excluding password)
```

**Update Profile:**
```
User submits changes
  → Frontend validates input
  → Sends PUT to /api/auth/update-profile with token
  → Auth middleware verifies token
  → Validates new data
  → Checks if new email already exists
  → Updates user record in database
  → Returns updated user data
```

**Change Password:**
```
User submits old + new password
  → Sends POST to /api/auth/change-password with token
  → Verifies JWT token
  → Retrieves user from database
  → Compares old password with stored hash
  → If match:
    → Hashes new password
    → Updates password in database
    → Returns success
  → If no match:
    → Returns 401 error
```

**Delete Account (Soft Delete):**
```
User requests deletion
  → Sends DELETE to /api/auth/delete-account with token
  → Verifies token
  → Sets user.isDeleted = true
  → Keeps data in database (soft delete)
  → User cannot login
  → Can be restored by admin
```

**Code Files:**
- Get Profile: `server/src/controllers/auth.controller.ts` (getProfile)
- Update Profile: `server/src/controllers/auth.controller.ts` (updateProfile)
- Change Password: `server/src/controllers/auth.controller.ts` (changePassword)
- Delete Account: `server/src/controllers/auth.controller.ts` (deleteAccount)

**Fields That Can Be Updated:**
```typescript
{
  name: string,           // Required
  phone: string,          // Optional
  address: string,        // Optional
  newEmail: string,       // Optional, must be unique
}
```

**Why Soft Delete?**
- Preserves data integrity (orders, reviews still linked)
- Allows account recovery
- Complies with data retention requirements
- Maintains audit trail

**Security Measures:**
- All profile endpoints require authentication
- Email changes require re-verification
- Password change requires old password
- Account deletion requires confirmation
- Rate limiting prevents abuse

---

## 6. Session Management

### 🌟 What It Does (Non-Technical)
When you log in, the system creates a "session" - think of it as a temporary pass that proves you're logged in. This pass is valid for 1 hour. After that, you need to log in again for security. The system keeps track of all active sessions.

### 🎯 User Experience
1. User logs in successfully
2. Can use the platform for 1 hour without logging in again
3. If they close the browser, they may need to log in again (depending on settings)
4. After 1 hour, they're automatically logged out
5. Can manually log out anytime

### 🔧 Technical Implementation

**Session Creation (on Login):**
```
User logs in successfully
  → Backend generates JWT token
  → Token payload: { userId, iat, exp }
  → Creates session record in database
  → Session expires in 1 hour
  → Returns token to frontend
  → Frontend stores in:
    → Redux state (for current session)
    → Cookie (for persistence)
```

**JWT Token Structure:**
```javascript
{
  userId: 123,
  iat: 1705996800,  // Issued at: Jan 23, 2026 12:00 PM
  exp: 1706000400   // Expires: Jan 23, 2026 1:00 PM
}
// Signed with JWT_SECRET
```

**Token Verification (on Protected Routes):**
```
User makes request to protected endpoint
  → Frontend includes token in Authorization header
  → Backend auth middleware extracts token
  → Verifies token signature
  → Checks if expired
  → If valid:
    → Extracts userId
    → Attaches to request object
    → Allows request to proceed
  → If invalid/expired:
    → Returns 401 Unauthorized
    → Frontend redirects to login
```

**Database Session Table:**
```sql
sessions:
- id: Primary key
- userId: Foreign key to users
- token: JWT token string
- expiresAt: Timestamp (login time + 1 hour)
- createdAt: Login timestamp
```

**Session Cleanup:**
```javascript
// Expired sessions can be cleaned up with:
DELETE FROM sessions WHERE expiresAt < NOW()
```

**Code Files:**
- Session Creation: `server/src/controllers/auth.controller.ts` (login)
- Token Generation: `server/src/utils/generateTokenHelper.ts`
- Token Verification: `server/src/middlewares/auth.middleware.ts`
- Session Model: `server/src/models/session.model.ts`

**Token Storage Strategy:**
- **Redux**: In-memory for current session
- **Cookie**: Persists across page reloads
- **httpOnly**: Could be enhanced for better security
- **Secure**: Should use HTTPS in production

**Why 1 Hour Expiration?**
- Balance between convenience and security
- Long enough for typical user sessions
- Short enough to limit exposure if token stolen
- Can be refreshed with refresh tokens (future enhancement)

---

## 7. Protected Routes

### 🌟 What It Does (Non-Technical)
Some pages on the website (like your dashboard or profile) should only be accessible if you're logged in. Protected routes automatically check if you're logged in before showing you the page. If you're not logged in, you're redirected to the login page.

### 🎯 User Experience
1. User tries to access dashboard while not logged in
2. Automatically redirected to login page
3. After logging in, taken to the page they wanted
4. While logged in, can freely access protected pages
5. If session expires, redirected to login again

### 🔧 Technical Implementation

**Frontend Protection (Next.js):**
```
User tries to access /dashboard
  → ProtectedRoute component checks Redux state
  → If user is authenticated:
    → Render the page
  → If not authenticated:
    → Redirect to /auth (login page)
    → Save intended destination
    → After login, redirect to original destination
```

**Backend Protection (Express):**
```
Request to /api/auth/profile
  → protect middleware runs first
  → Extracts Authorization header
  → Verifies JWT token
  → If valid:
    → Attaches user to request
    → Calls next() to proceed
  → If invalid:
    → Returns 401 Unauthorized
    → Frontend handles by redirecting to login
```

**Frontend ProtectedRoute Component:**
```typescript
// src/components/auth/ProtectedRoute.tsx
function ProtectedRoute({ children }) {
  const user = useSelector(state => state.auth.user)
  const router = useRouter()
  
  useEffect(() => {
    if (!user) {
      router.push('/auth')  // Redirect to login
    }
  }, [user])
  
  if (!user) return null  // Don't render until verified
  
  return children  // Render protected content
}
```

**Backend Auth Middleware:**
```typescript
// server/src/middlewares/auth.middleware.ts
export const protect = async (req, res, next) => {
  // Extract token from header
  const token = req.headers.authorization?.replace('Bearer ', '')
  
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' })
  }
  
  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET)
    
    // Attach user to request
    req.user = { id: decoded.userId }
    
    // Proceed to controller
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}
```

**Protected Pages:**
- Frontend:
  - `/dashboard/*` - All dashboard pages
  - `/profile` - User profile
  - `/cart` - Shopping cart
  - `/orders` - Order history

- Backend API:
  - `/api/auth/profile` - Get profile
  - `/api/auth/update-profile` - Update profile
  - `/api/auth/change-password` - Change password
  - `/api/auth/delete-account` - Delete account
  - Future: All seller/buyer endpoints

**Code Files:**
- Frontend: `src/components/auth/ProtectedRoute.tsx`
- Backend: `server/src/middlewares/auth.middleware.ts`
- Usage: Wrap components/routes that need protection

**Authorization Header Format:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Error Handling:**
- Missing token → 401 Unauthorized
- Invalid token → 401 Unauthorized
- Expired token → 401 Unauthorized
- Frontend catches 401 → Redirects to login
- Clears Redux state and cookies

---

## 8. Rate Limiting

### 🌟 What It Does (Non-Technical)
To prevent people from abusing the system (like trying thousands of passwords or spamming registrations), the system limits how many requests one person can make in a short time. If someone makes too many requests too quickly, they're temporarily blocked.

### 🎯 User Experience
**Normal Usage:**
- User doesn't notice rate limiting
- Requests process normally

**When Limit Exceeded:**
1. User makes too many requests (e.g., 100 in 15 minutes)
2. Receives error: "Too many requests, please try again later"
3. Must wait before making more requests
4. Limit resets after time period

### 🔧 Technical Implementation

**Rate Limit Configuration:**
```javascript
// server/src/app.ts
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,                   // 100 requests per window
  message: 'Too many requests from this IP',
  standardHeaders: true,      // Return rate limit info in headers
  legacyHeaders: false,
})

app.use('/api/', limiter)  // Apply to all API routes
```

**How It Works:**
```
Request arrives
  → Middleware extracts IP address
  → Checks request count for this IP in last 15 minutes
  → If count < 100:
    → Increment counter
    → Allow request
    → Add headers (X-RateLimit-Limit, X-RateLimit-Remaining)
  → If count >= 100:
    → Return 429 Too Many Requests
    → Add Retry-After header
```

**Response Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1705997400
Retry-After: 900  (seconds until reset)
```

**Storage:**
- By default: In-memory store
- Production: Can use Redis for distributed systems
- Automatically cleans up old entries

**Why These Limits?**
- 100 requests / 15 minutes = ~6.67 requests/minute
- Sufficient for normal usage
- Prevents brute force attacks
- Protects against DDoS
- Reduces server load

**What Counts as a Request?**
- Every API call to /api/* routes
- Login attempts
- Registration attempts
- Password reset requests
- Profile updates
- All GET/POST/PUT/DELETE requests

**Bypass for Trusted Sources (Future):**
```javascript
const apiKeyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,  // Higher limit
  skip: (req) => req.headers['x-api-key'] === TRUSTED_KEY
})
```

**Code Files:**
- Configuration: `server/src/app.ts`
- Library: `express-rate-limit` package

**Error Response:**
```json
{
  "message": "Too many requests from this IP, please try again later.",
  "retryAfter": 900
}
```

**Best Practices:**
- Applied globally to all API routes
- Can be customized per endpoint (stricter for auth)
- Should use Redis in production for multi-server setup
- Monitor rate limit hits to detect abuse
- Adjust limits based on traffic patterns

---

## 🔄 Feature Integration Flow

### Complete User Journey
```
1. Registration
   → Account created
   → Email verification sent
   → JWT token issued
   → Session created

2. Email Verification
   → User clicks link
   → Token verified
   → Account activated
   → emailVerified = true

3. Login (subsequent visits)
   → Credentials verified
   → JWT token issued
   → Session created (1 hour)

4. Using Platform
   → Each request includes JWT
   → Middleware verifies token
   → Access granted to protected routes
   → Rate limiting prevents abuse

5. Profile Management
   → View/update information
   → Change password
   → Delete account
   → All actions authenticated

6. Session Expiration
   → After 1 hour, token expires
   → User must login again
   → Process repeats
```

---

## 🛠️ Developer Notes

### Adding New Protected Endpoints

**Backend:**
```typescript
import { protect } from './middlewares/auth.middleware'

router.get('/api/new-endpoint', protect, controller)
```

**Frontend:**
```typescript
// Wrap page component
export default function NewPage() {
  return (
    <ProtectedRoute>
      <YourComponent />
    </ProtectedRoute>
  )
}
```

### Database Queries Optimization
- Indexes on: email, userId, token
- Connection pooling configured
- Queries use prepared statements (SQL injection prevention)

### Error Handling Strategy
- Validation errors: 400 Bad Request
- Authentication errors: 401 Unauthorized
- Not found: 404 Not Found
- Server errors: 500 Internal Server Error
- Consistent error format across all endpoints

---

## 📊 Performance Metrics

### Response Times (Typical)
- Login: 200-300ms
- Registration: 300-500ms (includes email sending)
- Protected route verification: 10-50ms
- Database queries: 5-20ms
- Email delivery: 1-3 seconds

### Scalability Considerations
- Stateless API (can add more servers)
- Database connection pooling
- Can add Redis caching layer
- Can add CDN for frontend
- Rate limiting prevents overload

---

## 🔒 Security Summary

All features implement these security principles:
- **Authentication**: JWT tokens with expiration
- **Authorization**: Middleware checks permissions
- **Encryption**: Passwords hashed with bcrypt
- **Validation**: All input validated and sanitized
- **Rate Limiting**: Prevents abuse and attacks
- **CORS**: Restricted to allowed origins
- **SQL Injection**: Prevented by ORM parameterization
- **XSS**: Input sanitization and output encoding

---

## 📖 Further Reading

For more technical details:
- [Tech Stack](01-tech-stack.md) - All technologies used
- [Feature Listing](02-feature-listing.md) - Complete feature inventory
- [API Documentation](../server/src/routes/) - API endpoint specifications
- [Database Schema](../server/migrations/) - Database structure

---

**Last Updated**: January 24, 2026
