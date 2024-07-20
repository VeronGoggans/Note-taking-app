from src.backend.presentation.request_bodies.flashcard.post_flashcard_request import PostFlashcardRequest
from pydantic import BaseModel

class PostDeckRequest(BaseModel):
    name: str
    flashcards: list[PostFlashcardRequest]