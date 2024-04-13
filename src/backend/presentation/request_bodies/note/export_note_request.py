from pydantic import BaseModel

class ExportNoteRequest(BaseModel):
    format: str
    title: str
    content: str