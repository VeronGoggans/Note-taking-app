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


class PutFlashcardsRequest(BaseModel):
    deck_id: int
    flashcards: list[PutFlashcardRequest]


class FlashcardStudyRequest(BaseModel):
    deck_id: int
    time_studied: int
    flashcards: list[PutFlashcardRequest]


class DeleteFlashcardsRequest(BaseModel):
    deck_id: int
    flashcard_ids: list[int]


class PostDeckRequest(BaseModel):
    name: str
    flashcards: list[PostFlashcardRequest]


class PutDeckRequest(BaseModel):
    deck_id: int
    name: str