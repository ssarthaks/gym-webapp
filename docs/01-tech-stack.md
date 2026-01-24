# 📚 Tech Stack & Libraries Documentation

## Project Architecture

This is a **full-stack monorepo** application with:
- **Backend**: RESTful API built with Express.js
- **Frontend**: Modern web application built with Next.js
- **Database**: MySQL with Sequelize ORM
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS with Radix UI components

---

## 🎯 Backend Technologies

### Core Framework
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | Latest LTS | JavaScript runtime environment |
| **Express.js** | 5.1.0 | Web application framework for building RESTful APIs |
| **TypeScript** | 5.8.3 | Type-safe JavaScript with compile-time type checking |

### Database & ORM
| Technology | Version | Purpose |
|-----------|---------|---------|
| **MySQL** | 8.x | Relational database for storing application data |
| **Sequelize** | 6.37.7 | ORM (Object-Relational Mapping) for database operations |
| **mysql2** | 3.14.2 | MySQL driver for Node.js with better performance |
| **sequelize-cli** | 6.6.2 | Command-line tool for database migrations and seeds |

**What it does**: Sequelize allows us to interact with the MySQL database using JavaScript objects instead of writing raw SQL queries. It handles table creation, relationships, and data validation.

### Authentication & Security
| Technology | Version | Purpose |
|-----------|---------|---------|
| **bcrypt** | 6.0.0 | Password hashing for secure storage |
| **jsonwebtoken (JWT)** | 9.0.2 | Token-based authentication for API security |
| **cors** | 2.8.5 | Cross-Origin Resource Sharing for frontend-backend communication |
| **express-rate-limit** | 8.0.1 | API rate limiting to prevent abuse |
| **validator** | 13.15.15 | Data validation and sanitization |

**What it does**: 
- `bcrypt` encrypts user passwords before storing them in the database
- `JWT` creates secure tokens that prove a user is logged in
- `cors` allows the frontend (port 3000) to communicate with backend (port 5000)
- `rate-limit` prevents users from making too many requests too quickly
- `validator` ensures email addresses, phone numbers, etc. are in correct format

### Email Services
| Technology | Version | Purpose |
|-----------|---------|---------|
| **nodemailer** | 7.0.5 | Sending emails (verification codes, password resets) |

**What it does**: Sends automated emails to users for account verification and password resets through Gmail SMTP.

### Development Tools
| Technology | Version | Purpose |
|-----------|---------|---------|
| **ts-node-dev** | 2.0.0 | Auto-restart server on code changes during development |
| **dotenv** | 17.2.0 | Environment variable management |

---

## 🎨 Frontend Technologies

### Core Framework
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16.1.1 | React framework with server-side rendering and routing |
| **React** | 19.2.1 | UI library for building interactive components |
| **TypeScript** | 5.8.3 | Type-safe JavaScript |

**What it does**: Next.js provides the structure for building fast, SEO-friendly web applications with React. It handles routing, server-side rendering, and optimization automatically.

### State Management
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Redux Toolkit** | 2.8.2 | Global state management (user data, shopping cart) |
| **react-redux** | 9.2.0 | React bindings for Redux |

**What it does**: Redux stores data that needs to be accessed across multiple pages (like logged-in user info, shopping cart items). Redux Toolkit simplifies Redux setup and reduces boilerplate code.

### Data Fetching
| Technology | Version | Purpose |
|-----------|---------|---------|
| **axios** | 1.11.0 | HTTP client for making API requests |
| **@tanstack/react-query** | 5.85.5 | Data fetching, caching, and synchronization |

**What it does**: 
- `axios` sends HTTP requests to the backend API (login, register, fetch products)
- `react-query` manages server state, caching, and automatic refetching

### Styling & UI Components
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Tailwind CSS** | 3.4.17 | Utility-first CSS framework |
| **tailwindcss-animate** | 1.0.7 | Animation utilities for Tailwind |
| **Radix UI** | Various | Unstyled, accessible UI components |
| **lucide-react** | 0.540.0 | Icon library (1000+ icons) |
| **class-variance-authority** | 0.7.1 | Creating component variants |
| **clsx** | 2.1.1 | Conditional CSS class names |
| **tailwind-merge** | 3.3.1 | Merging Tailwind classes without conflicts |

**What it does**: 
- Tailwind provides pre-built CSS classes for rapid UI development
- Radix UI provides accessible, keyboard-navigable components (dropdowns, dialogs, etc.)
- lucide-react provides icons for buttons, navigation, etc.

#### Radix UI Components Used:
- `@radix-ui/react-avatar` - User profile pictures
- `@radix-ui/react-checkbox` - Checkboxes with proper accessibility
- `@radix-ui/react-dialog` - Modal dialogs
- `@radix-ui/react-dropdown-menu` - Dropdown menus
- `@radix-ui/react-label` - Form labels
- `@radix-ui/react-select` - Select dropdowns
- `@radix-ui/react-separator` - Divider lines
- `@radix-ui/react-slider` - Range sliders
- `@radix-ui/react-slot` - Polymorphic components
- `@radix-ui/react-switch` - Toggle switches
- `@radix-ui/react-tabs` - Tab navigation
- `@radix-ui/react-tooltip` - Tooltips on hover

### Form Handling
| Technology | Version | Purpose |
|-----------|---------|---------|
| **react-hook-form** | 7.62.0 | Form state management and validation |
| **zod** | 4.0.17 | Schema validation for forms |
| **@hookform/resolvers** | 5.2.1 | Integrates Zod with React Hook Form |

**What it does**: Manages form inputs, validation, and error messages efficiently without unnecessary re-renders.

### Data Visualization
| Technology | Version | Purpose |
|-----------|---------|---------|
| **recharts** | 3.1.2 | Charts and graphs for dashboard analytics |

**What it does**: Creates interactive charts to display statistics, sales data, and analytics on the dashboard.

### Additional UI Libraries
| Technology | Version | Purpose |
|-----------|---------|---------|
| **embla-carousel-react** | 8.6.0 | Carousel/slider components |
| **react-day-picker** | 9.9.0 | Date picker component |
| **react-toastify** | 11.0.5 | Toast notifications for success/error messages |
| **sonner** | 2.0.7 | Modern toast notifications |
| **next-themes** | 0.4.6 | Dark/light theme switching |
| **vaul** | 1.1.2 | Mobile drawer component |

**What it does**: Provides specialized UI components for specific functionality like carousels, date selection, and notifications.

### Utilities
| Technology | Version | Purpose |
|-----------|---------|---------|
| **js-cookie** | 3.0.5 | Managing browser cookies (auth tokens) |
| **date-fns** | 4.1.0 | Date formatting and manipulation |
| **cmdk** | 1.1.1 | Command palette (Cmd+K) component |
| **input-otp** | 1.4.2 | OTP/verification code input |
| **react-resizable-panels** | 3.0.4 | Resizable panel layouts |

---

## 🔧 Development Tools

| Tool | Purpose |
|------|---------|
| **concurrently** | Run backend and frontend simultaneously in development |
| **ESLint** | Code linting and style enforcement |
| **Prettier** | Code formatting |
| **PostCSS** | CSS processing |
| **Autoprefixer** | Automatically add vendor prefixes to CSS |

---

## 📂 Package Management

- **Package Manager**: npm
- **Monorepo Structure**: Single `package.json` for both frontend and backend
- **Scripts**: Unified scripts for running, building, and deploying

---

## 🌐 API Communication Flow

```
Frontend (Next.js - Port 3000)
    ↓ HTTP Requests (axios)
    ↓
Backend (Express.js - Port 5000)
    ↓ SQL Queries (Sequelize)
    ↓
Database (MySQL)
```

---

## 🔐 Authentication Flow

```
1. User enters credentials → Frontend form (react-hook-form + zod)
2. Frontend sends request → axios → Backend API
3. Backend validates → validator + bcrypt (password check)
4. Backend generates token → jsonwebtoken (JWT)
5. Token sent to frontend → Stored in Redux + js-cookie
6. Future requests include token → Backend middleware verifies
7. Protected routes accessible → User authenticated
```

---

## 📊 Data Flow Architecture

### Client-Side (Frontend)
1. **User Interaction** → React components
2. **Form Submission** → react-hook-form validation
3. **API Call** → axios request
4. **State Update** → Redux Toolkit or React Query
5. **UI Update** → Component re-renders

### Server-Side (Backend)
1. **API Request** → Express route
2. **Middleware** → Authentication, validation, rate limiting
3. **Controller** → Business logic
4. **Model** → Sequelize ORM
5. **Database** → MySQL query
6. **Response** → JSON data back to frontend

---

## 🎨 Styling Architecture

### Tailwind CSS Approach
- **Utility-First**: Apply styles directly in JSX using class names
- **Responsive**: Built-in breakpoints (sm, md, lg, xl, 2xl)
- **Dark Mode**: Theme support with next-themes
- **Custom Components**: Pre-built UI components in `/components/ui`

### Component Structure
```
components/
├── ui/           # Base UI components (shadcn/ui style)
├── auth/         # Authentication-related components
├── dashboard/    # Dashboard-specific components
├── layout/       # Layout components (navbar, footer)
└── pages/        # Page-specific components
```

---

## 🚀 Performance Optimizations

### Frontend
- **Code Splitting**: Next.js automatic code splitting per route
- **Image Optimization**: Next.js Image component with lazy loading
- **Caching**: React Query caching with stale-while-revalidate strategy
- **Minification**: Automatic in production build

### Backend
- **Connection Pooling**: MySQL connection pooling with mysql2
- **Rate Limiting**: Prevent API abuse with express-rate-limit
- **Compression**: Response compression middleware
- **Lazy Loading**: Models loaded only when needed

---

## 📱 Responsive Design

- **Mobile-First**: Tailwind CSS mobile-first breakpoints
- **Adaptive UI**: Components adjust to screen size
- **Touch-Friendly**: Larger touch targets on mobile
- **Progressive Enhancement**: Works on all devices

---

## 🔒 Security Measures

| Feature | Implementation |
|---------|----------------|
| Password Hashing | bcrypt with salt rounds |
| SQL Injection Prevention | Sequelize parameterized queries |
| XSS Protection | Input validation and sanitization |
| CSRF Protection | Token-based authentication |
| Rate Limiting | express-rate-limit |
| CORS | Configured for specific origins |
| Environment Variables | Sensitive data in .env |

---

## 📈 Scalability Considerations

- **Stateless API**: JWT tokens enable horizontal scaling
- **Database Indexing**: Optimized queries with indexes
- **CDN Ready**: Static assets can be served from CDN
- **Caching Strategy**: Redis can be added for session storage
- **Microservices Ready**: Modular structure allows splitting services

---

## 🧪 Testing Stack (Future)

Recommended for future implementation:
- **Jest**: Unit testing
- **React Testing Library**: Component testing
- **Supertest**: API endpoint testing
- **Cypress**: End-to-end testing

---

## 📦 Build & Deployment

### Production Build
```bash
npm run build          # Build both frontend and backend
npm run start:backend  # Start backend server
npm run start:frontend # Start frontend server
```

### Environment Variables Required
- `PORT` - Backend port
- `DB_*` - Database credentials
- `JWT_SECRET` - JWT signing secret
- `EMAIL_*` - Email service credentials
- `FRONTEND_URL` - Frontend URL for CORS
- `NEXT_PUBLIC_BACKEND_URL` - Backend API URL for frontend

---

## 🔄 Version Control

- **Git**: Version control
- **GitHub**: Repository hosting
- **Branches**: Feature-based branching strategy
- **.gitignore**: Excludes node_modules, .env, build files

---

This tech stack provides a solid foundation for building a scalable, maintainable, and performant fitness marketplace application.
