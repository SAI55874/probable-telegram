# Complete Setup Guide

This guide explains how to set up and run the complete authentication system with both frontend and backend components.

## Prerequisites

1. Node.js 18+ and npm
2. Python 3.8+ and pip
3. Supabase account (free tier available)

## Step 1: Supabase Setup

1. Create a new project at [Supabase](https://app.supabase.io/)
2. Note your Project URL and anon key from Settings > API
3. Enable Email authentication in Authentication > Settings
4. Optionally enable Google/GitHub OAuth providers

## Step 2: Environment Configuration

Create a `.env.local` file in the `warmachine` directory:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Backend Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000

# For production, you should use strong secrets
JWT_SECRET=your_jwt_secret_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

## Step 3: Frontend Setup

1. Navigate to the frontend directory:
```bash
cd warmachine
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The frontend will be available at http://localhost:3000

## Step 4: Backend Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Run the FastAPI server:
```bash
uvicorn api.graphql.index:app --reload
```

The backend will be available at http://localhost:8000

## Step 5: Testing the System

1. Open http://localhost:3000 in your browser
2. Navigate to the signup page and create a new account
3. Verify your email if required
4. Log in with your credentials
5. Visit the dashboard to test protected routes
6. Try the GraphQL API demo components

## Available Authentication Pages

- `/signup` - User registration
- `/login` - User login
- `/forgot-password` - Password reset request
- `/reset-password` - Password reset form
- `/dashboard` - Protected dashboard (requires authentication)

## GraphQL API Endpoints

The backend provides a GraphQL API at `/graphql` with the following features:

- Public query: `hello`
- Protected query: `protectedHello`
- Protected mutation: `loginRequiredMutation`

## Security Considerations

1. All secrets are stored in environment variables
2. JWT tokens are validated in the backend
3. Protected routes require authentication
4. OAuth providers are securely integrated
5. Password reset uses secure email verification

## Troubleshooting

### Common Issues

1. **Environment variables not loading**: Ensure `.env.local` is in the `warmachine` directory
2. **CORS errors**: Check that the frontend URL is allowed in the backend CORS settings
3. **Supabase connection errors**: Verify your Supabase URL and keys are correct
4. **Port conflicts**: Ensure ports 3000 (frontend) and 8000 (backend) are available

### Testing Backend

Run the test script to verify the backend is working:
```bash
python test_backend.py
```

## Deployment

For production deployment:

1. Set proper environment variables
2. Configure HTTPS
3. Set up proper CORS origins
4. Use a production database
5. Implement rate limiting and monitoring
6. Consider using a process manager like PM2 for the backend