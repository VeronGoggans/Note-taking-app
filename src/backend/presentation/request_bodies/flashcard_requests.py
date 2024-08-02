from pydantic import BaseModel


class PostFlashcardRequest(BaseModel):
    term: str
    description: str


class PostFlashcardsRequest(BaseModel):
    deck_id: str
    flashcards: list[PostFlashcardRequest]


class PutFlashcardRequest(BaseModel):
    id: str
    term: str
    description: str
    performance: str


class PutFlashcardsRequest(BaseModel):
    deck_id: str
    flashcards: list[PutFlashcardRequest]


class DeleteFlashcardsRequest(BaseModel):
    deck_id: str
    flashcard_ids: list[int]


class PostDeckRequest(BaseModel):
    name: str
    flashcards: list[PostFlashcardRequest]


class PutDeckRequest(BaseModel):
    id: str
    name: str