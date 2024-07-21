from pydantic import BaseModel


class PostFlashcardRequest(BaseModel):
    term: str
    description: str


class PutFlashcardRequest(BaseModel):
    term: str
    description: str
    performance: str