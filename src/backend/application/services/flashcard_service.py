from src.backend.data.flashcard.flashcard_manager import FlashcardManager
from src.backend.data.exceptions.exceptions import *
from src.backend.presentation.dtos.flashcard_dtos import PostFlashcardDTO, FlashcardDTO
from src.backend.application.decorators.exceptions import check_for_null 



class FlashcardService:
    def __init__(self, manager: FlashcardManager):
        self.manager = manager


    @check_for_null
    def add_flashcards(self, deck_id: str, flashcards: list[PostFlashcardDTO]) -> None:
        self.manager.add(deck_id, flashcards)
        

    @check_for_null
    def update_flashcards(self, deck_id: str, flashcards: list[FlashcardDTO]) -> None:
        self.manager.update(deck_id, flashcards)
        

    @check_for_null
    def update_flashcard_ratings(self, deck_id: str, time_studied: str, flashcards: list[FlashcardDTO]) -> None:
        self.manager.update_ratings(deck_id, time_studied, flashcards)


    @check_for_null
    def delete_flashcards(self, deck_id: str, flashcard_ids: list[str]) -> None:
        self.manager.delete(deck_id, flashcard_ids)