from pydantic import BaseModel


class PostFlashcardRequest(BaseModel):
    term: str
    description: str


class PostFlashcardsRequest(BaseModel):
    deck_id: str
    flashcards: list[PostFlashcardRequest]


class PutFlashcardRequest(BaseModel):
    term: str
    description: str
    performance: str