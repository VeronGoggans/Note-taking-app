from pydantic import BaseModel

class PostSubfolderRequest(BaseModel):
    folder_id: str
    name: str
