from pydantic import BaseModel

class DeleteFolderRequest(BaseModel):
    folder_id: str
