from pydantic import BaseModel

class ProductBacklogItemRequest(BaseModel):
    name: str
    description: str
    priority: str