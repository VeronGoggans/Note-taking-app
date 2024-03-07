from pydantic import BaseModel

class PostFolderRequest(BaseModel):
    name: str
    color: str