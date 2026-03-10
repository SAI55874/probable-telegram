from fastapi import FastAPI
import strawberry
from strawberry.fastapi import GraphQLRouter

@strawberry.type
class Query:
    @strawberry.field
    def hello(self) -> str:
        return "Hello from FastAPI + GraphQL"

schema = strawberry.Schema(query=Query)

fastapi_app = FastAPI()
graphql_app = GraphQLRouter(schema)

fastapi_app.include_router(graphql_app, prefix="/")

app = fastapi_app