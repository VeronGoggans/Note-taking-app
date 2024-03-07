from pydantic import BaseModel

class DeleteNotesRequest(BaseModel):
    folderId: str