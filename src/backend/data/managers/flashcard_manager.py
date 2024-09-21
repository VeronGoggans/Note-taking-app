from src.backend.presentation.dtos.flashcard_dtos import PostFlashcardDTO, FlashcardDTO

from src.backend.data.exceptions.exceptions import NotFoundException
from src.backend.util.calendar import Calendar


class FlashcardManager:

    def add(self, deck_id: int, flashcards: list[PostFlashcardDTO]) -> None:
        pass

    def update(self, deck_id: int, flashcards: list[FlashcardDTO]) -> None:
        pass

    def update_ratings(self, deck_id: str, time_studied: str, flashcards: list[FlashcardDTO]) -> None:
        pass

    def delete(self, deck_id: int, flashcard_ids: list[str]) -> None:
        pass
