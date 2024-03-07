from pydantic import BaseModel

class PostNoteRequest(BaseModel):
    folder_id: str
    title: str
    content: str
    bookmark: bool