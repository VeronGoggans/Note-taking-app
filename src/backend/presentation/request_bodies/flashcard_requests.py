from pydantic import BaseModel


class PostFlashcardRequest(BaseModel):
    term: str
    description: str


class PostFlashcardsRequest(BaseModel):
    deck_id: int
    flashcards: list[PostFlashcardRequest]


class PutFlashcardRequest(BaseModel):
    id: int
    term: str
    description: str
    rating: str


class FlashcardStudyRequest(BaseModel):
    id: int
    rating: str


class PostDeckRequest(BaseModel):
    name: str
    flashcards: list[PostFlashcardRequest]


class PutDeckRequest(BaseModel):
    deck_id: int
    name: str