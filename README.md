# probable-telegram

Production-Grade Authentication System Implementation

## Overview

This project implements a complete authentication system using:
- **Frontend**: Next.js (App Router) with TypeScript
- **Backend**: FastAPI with Strawberry GraphQL
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL

## Implementation Details

See [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) for a complete overview of the implemented authentication system.

## Setup Instructions

See [SETUP.md](SETUP.md) for detailed setup instructions.

## Project Structure

```
probable-telegram/
├── warmachine/              # Next.js frontend
├── requirements.txt         # Python dependencies
├── SETUP.md                # Complete setup guide
├── IMPLEMENTATION_SUMMARY.md # Implementation details
└── vercel.json             # Vercel configuration
```

## Features

### Frontend (Next.js)
- User Registration (Signup)
- User Login (Email/Password)
- OAuth Login (Google, GitHub)
- Password Reset Flow
- Protected Routes
- Authentication Context Provider
- GraphQL API Integration Demo

### Backend (FastAPI + GraphQL)
- JWT Token Validation Middleware
- Protected GraphQL Resolvers
- Role-Based Access Control Preparation
- CORS Configuration

## Quick Start

1. Set up Supabase project and get credentials
2. Configure environment variables in `warmachine/.env.local`
3. Install frontend dependencies: `cd warmachine && npm install`
4. Run frontend: `cd warmachine && npm run dev`
5. Install backend dependencies: `pip install -r requirements.txt`
6. Run backend: `uvicorn api.graphql.index:app --reload`

## Security Considerations

- Environment Variables Management
- Secure Token Storage
- Protected API Endpoints
- Proper Error Handling
- Session Management