from pydantic import BaseModel

class PutNoteColorRequest(BaseModel):
    note_id: str
    color: str