from pydantic import BaseModel

class DeleteNoteRequest(BaseModel):
    note_id: str