from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import strawberry
from strawberry.fastapi import GraphQLRouter
from typing import Optional
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import auth utilities
from ..utils.auth import get_current_user_from_token

@strawberry.type
class UserType:
    id: str
    email: str
    role: Optional[str] = None

@strawberry.type
class Query:
    @strawberry.field
    def hello(self) -> str:
        return "Hello from FastAPI + GraphQL"

    @strawberry.field
    def protected_hello(self, info) -> str:
        # Access user info from context
        user = info.context.get("user")
        if not user:
            raise Exception("Not authenticated")
        return f"Hello {user.get('email', 'user')} from protected endpoint!"

@strawberry.type
class Mutation:
    @strawberry.mutation
    def login_required_mutation(self, info, data: str) -> str:
        user = info.context.get("user")
        if not user:
            raise Exception("Authentication required")
        return f"Mutation successful for {user.get('email', 'user')}: {data}"

# Create schema
schema = strawberry.Schema(query=Query, mutation=Mutation)

# FastAPI app
fastapi_app = FastAPI(title="GraphQL API with Authentication")

# Add CORS middleware
fastapi_app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency for getting current user
def get_current_user(authorization: str = None):
    if not authorization:
        return None
    try:
        return get_current_user_from_token(authorization)
    except HTTPException:
        return None

# Context getter for GraphQL
async def get_context():
    return {
        "user": None  # Will be set by middleware
    }

# Middleware to extract user from token
@fastapi_app.middleware("http")
async def auth_middleware(request, call_next):
    # Skip auth for introspection queries and some endpoints
    if request.url.path in ["/", "/docs", "/redoc", "/openapi.json"]:
        response = await call_next(request)
        return response

    # Extract token from Authorization header
    auth_header = request.headers.get("Authorization")

    if auth_header:
        try:
            user = get_current_user_from_token(auth_header)
            request.state.user = user
        except HTTPException:
            # Token invalid, but we don't want to block all requests
            request.state.user = None
    else:
        request.state.user = None

    response = await call_next(request)
    return response

# GraphQL router with context
graphql_app = GraphQLRouter(
    schema,
    context_getter=get_context,
)

# Include GraphQL router
fastapi_app.include_router(graphql_app, prefix="/graphql")

# Health check endpoint
@fastapi_app.get("/health")
def health_check():
    return {"status": "ok"}

app = fastapi_app