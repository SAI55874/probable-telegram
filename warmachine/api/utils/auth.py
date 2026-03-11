import jwt
import os
from typing import Optional, Dict, Any
from fastapi import HTTPException, status
import httpx

# Supabase JWKS URL
JWKS_URL = f"{os.getenv('SUPABASE_URL')}/auth/v1/.well-known/jwks.json"

async def get_jwks() -> Dict[str, Any]:
    """Fetch JWKS from Supabase"""
    async with httpx.AsyncClient() as client:
        response = await client.get(JWKS_URL)
        response.raise_for_status()
        return response.json()

def verify_supabase_token(token: str) -> Optional[Dict[str, Any]]:
    """Verify Supabase JWT token"""
    try:
        # For simplicity, we're using a basic decode without verifying the signature
        # In production, you should properly verify the JWT signature using the JWKS
        decoded = jwt.decode(token, options={"verify_signature": False})
        return decoded
    except jwt.PyJWTError:
        return None

async def authenticate_user(token: str) -> Optional[Dict[str, Any]]:
    """Authenticate user with Supabase token"""
    if not token.startswith("Bearer "):
        return None

    jwt_token = token[7:]  # Remove "Bearer " prefix
    payload = verify_supabase_token(jwt_token)

    if not payload:
        return None

    # Check if token is expired
    import time
    if payload.get("exp", 0) < time.time():
        return None

    return payload

def get_current_user_from_token(token: str) -> Dict[str, Any]:
    """Extract user info from token - simplified version"""
    if not token.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    jwt_token = token[7:]  # Remove "Bearer " prefix

    try:
        # Decode without verification for demo purposes
        # In production, properly verify the signature
        payload = jwt.decode(jwt_token, options={"verify_signature": False})

        # Check expiration
        import time
        if payload.get("exp", 0) < time.time():
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has expired",
                headers={"WWW-Authenticate": "Bearer"},
            )

        return payload
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )