from pydantic import BaseModel
from src.backend.presentation.request_bodies.flashcard.flashcard_request import PostFlashcardRequest


class PostDeckRequest(BaseModel):
    name: str
    flashcards: list[PostFlashcardRequest]


class PutDeckRequest(BaseModel):
    id: str
    name: str