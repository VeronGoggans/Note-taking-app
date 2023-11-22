from pydantic import BaseModel

class SubfolderRequest(BaseModel):
    name: str