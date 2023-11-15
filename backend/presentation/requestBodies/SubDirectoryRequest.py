from pydantic import BaseModel

class SubDirectoryRequest(BaseModel):
    name: str