from pydantic import BaseModel

class PutFolderRequest(BaseModel):
    folder_id: str
    new_name: str