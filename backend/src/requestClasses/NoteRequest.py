from pydantic import BaseModel

class NoteRequest(BaseModel):
    title: str
    content: str
    bookmark: bool
    password_protected: bool
