from pydantic import BaseModel

class PutNoteRequest(BaseModel):
    note_id: str
    title: str
    content: str
    bookmark: bool
    password_protected: bool
