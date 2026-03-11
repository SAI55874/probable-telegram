"""
Test script to verify the backend GraphQL API is working correctly
"""
import asyncio
import httpx
import json

async def test_graphql_api():
    # Test the GraphQL API
    url = "http://localhost:8000/graphql"

    # Test query
    query = """
    query {
        hello
    }
    """

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                url,
                json={"query": query},
                headers={"Content-Type": "application/json"}
            )

            if response.status_code == 200:
                data = response.json()
                print("GraphQL API Test:")
                print(f"Response: {json.dumps(data, indent=2)}")
                return True
            else:
                print(f"Error: {response.status_code}")
                print(response.text)
                return False
        except Exception as e:
            print(f"Connection error: {e}")
            return False

if __name__ == "__main__":
    print("Testing GraphQL API...")
    asyncio.run(test_graphql_api())