# Production-Grade Authentication System

This project implements a complete authentication system using Next.js (App Router) with TypeScript, FastAPI backend, Strawberry GraphQL API layer, and Supabase Auth for authentication.

## Features Implemented

### Frontend (Next.js)
- User Registration (Signup)
- User Login (Email/Password)
- OAuth Login (Google, GitHub)
- Password Reset Flow
- Protected Routes
- Authentication Context Provider
- Custom Authentication Hook

### Backend (FastAPI + GraphQL)
- JWT Token Validation Middleware
- Protected GraphQL Resolvers
- Role-Based Access Control Preparation
- CORS Configuration

### Security Considerations
- Environment Variables Management
- Secure Token Storage
- Protected API Endpoints
- Proper Error Handling

## Project Structure

```
warmachine/
├── app/                    # Next.js frontend
│   ├── signup/            # User registration page
│   ├── login/             # User login page
│   ├── forgot-password/   # Password reset request page
│   ├── reset-password/    # Password reset form page
│   ├── dashboard/         # Protected dashboard page
│   ├── layout.tsx         # Root layout with AuthProvider
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── AuthProvider.tsx   # Authentication context provider
│   ├── ProtectedRoute.tsx # Protected route wrapper
│   └── GraphQLDemo.tsx    # GraphQL API demo component
├── hooks/                 # Custom hooks
│   └── useAuth.ts         # Authentication hook
├── lib/                   # Utility libraries
│   └── supabase.ts        # Supabase client configuration
├── api/                   # Backend API
│   ├── graphql/           # GraphQL implementation
│   │   └── index.py       # Main GraphQL router
│   └── utils/             # Utility functions
│       └── auth.py        # Authentication utilities
└── public/                # Static assets
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Setup Instructions

### Prerequisites
1. Node.js 18+
2. Python 3.8+
3. Supabase Account

### Frontend Setup

1. Install dependencies:
```bash
cd warmachine
npm install
```

2. Configure environment variables:
```bash
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials
```

3. Run the development server:
```bash
npm run dev
```

### Backend Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Run the FastAPI server:
```bash
uvicorn api.graphql.index:app --reload
```

### Supabase Configuration

1. Create a Supabase project at https://app.supabase.io/
2. Get your project URL and anon key from Settings > API
3. Update your .env.local file with these values:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Authentication Flow

1. **Signup**: Users can register with email/password or OAuth providers
2. **Login**: Users can login with email/password or OAuth providers
3. **Password Reset**: Users can request password reset via email
4. **Session Management**: Automatic session persistence and renewal
5. **Protected Routes**: Dashboard and other pages require authentication

## GraphQL API Protection

The backend includes JWT validation middleware that protects GraphQL endpoints:

- Public queries can be accessed without authentication
- Protected queries/mutations require a valid JWT token
- Token validation follows Supabase JWT standards

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
