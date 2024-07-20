from pydantic import BaseModel

class PostFlashcardRequest(BaseModel):
    term: str
    description: str