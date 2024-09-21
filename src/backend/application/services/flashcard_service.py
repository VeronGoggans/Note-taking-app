from src.backend.data.managers.flashcard_manager import FlashcardManager
from src.backend.data.exceptions.exceptions import *
from src.backend.presentation.dtos.flashcard_dtos import PostFlashcardDTO, FlashcardDTO


class FlashcardService:
    def __init__(self, manager: FlashcardManager):
        self.manager = manager


    def add_flashcards(self, deck_id: int, flashcards: list[PostFlashcardDTO]) -> None:
        self.manager.add(deck_id, flashcards)
        

    def update_flashcards(self, deck_id: int, flashcards: list[FlashcardDTO]) -> None:
        self.manager.update(deck_id, flashcards)
        

    def update_flashcard_ratings(self, deck_id: int, time_studied: str, flashcards: list[FlashcardDTO]) -> None:
        self.manager.update_ratings(deck_id, time_studied, flashcards)


    def delete_flashcards(self, deck_id: int, flashcard_ids: list[str]) -> None:
        self.manager.delete(deck_id, flashcard_ids)