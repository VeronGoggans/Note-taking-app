from pydantic import BaseModel

class DeleteNoteRequest(BaseModel):
    folder_id: str
    note_id: str

