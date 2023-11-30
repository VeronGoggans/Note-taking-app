from pydantic import BaseModel

class DeleteSubfolderRequest(BaseModel):
    folder_id: str
    subfolder_id: str
