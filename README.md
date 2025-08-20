# Gym Webapp Frontend

This is the frontend for the Gym Webapp project. It is built using Next.js, TypeScript, and Tailwind CSS.

# Gym Webapp Frontend

## Features

- Modern UI with Tailwind CSS
- Built with Next.js and React
- Component-based architecture
- Easy to extend and customize

```
ai-frontend-nextjs/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   ├── providers.tsx        # Client-side providers
│   │   ├── globals.css          # Global styles
│   │   ├── equipment/page.tsx   # Equipment page
│   │   ├── programs/page.tsx    # Programs page
│   │   ├── sell/page.tsx        # Sell Equipment page
│   │   ├── companies/page.tsx   # For Companies page
│   │   ├── profile/page.tsx     # Profile page
│   │   ├── cart/page.tsx        # Shopping Cart page
│   │   ├── auth/page.tsx        # Authentication page
│   │   └── dashboard/           # Dashboard section
│   │       ├── layout.tsx       # Dashboard layout
│   │       └── page.tsx         # Dashboard home
│   ├── components/              # Reusable components
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── layout/              # Layout components
│   │   ├── sections/            # Section components
│   │   └── dashboard/           # Dashboard components
│   ├── hooks/                   # Custom React hooks
│   └── lib/                     # Utilities
├── public/                      # Static assets
├── components.json              # shadcn/ui config
├── tailwind.config.ts           # Tailwind configuration
└── package.json                 # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
cd ai-frontend-nextjs
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Features

### Completed Pages:

- ✅ Home page with hero section and featured content
- ✅ Equipment catalog with search and filtering
- ✅ Authentication page (login/register)
- ✅ Dashboard with sidebar navigation
- ✅ Placeholder pages for Programs, Sell, Companies, Profile, Cart

### Components:

- ✅ Complete shadcn/ui component library
- ✅ Responsive navigation with mobile menu
- ✅ Dashboard sidebar with navigation
- ✅ Hero sections and content sections
- ✅ Cards, forms, buttons, and UI elements

### Functionality:

- ✅ Responsive design
- ✅ Dark/light mode ready (Tailwind configuration)
- ✅ TypeScript support
- ✅ React Query integration
- ✅ Form handling capabilities
- ✅ Toast notifications

## License

This project is licensed under the MIT License.
