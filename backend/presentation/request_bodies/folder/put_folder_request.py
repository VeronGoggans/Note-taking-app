from pydantic import BaseModel

class PutFolderRequest(BaseModel):
    folder_id: str
    name: str
    color: str