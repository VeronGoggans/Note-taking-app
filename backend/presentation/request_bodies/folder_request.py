from pydantic import BaseModel

class FolderRequest(BaseModel):
    name: str