from pydantic import BaseModel

class DirectoryRequest(BaseModel):
    name: str