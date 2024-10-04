from sqlalchemy.orm import Session
from src.backend.data.managers.flashcard_manager import FlashcardDeckManager
from src.backend.presentation.request_bodies.flashcard_requests import PutDeckRequest
from src.backend.data.models import FlashcardSet
from src.backend.data.exceptions.exceptions import *
from src.backend.presentation.dtos.flashcard_dtos import PostFlashcardDTO, FlashcardDTO


class FlashcardDeckService:
    def __init__(self, manager: FlashcardDeckManager):
        self.manager = manager


    def add_deck(self, name: str, db: Session) -> FlashcardSet:
        deck = FlashcardSet(name = name)
        return self.manager.add(deck, db)            


    def get_deck_by_id(self, id: str, db: Session) -> FlashcardSet:
         return self.manager.get_by_id(id, db)
        

    def get_all_decks(self, db: Session) -> list[FlashcardSet]:
        return self.manager.get_all(db)


    def get_search_items(self, db: Session) -> list[object]:
        return self.manager.get_search_items(db)
    

    def get_random_decks(self, db: Session) -> list[FlashcardSet]:
        return self.manager.get_random_decks(db)
        

    def update_deck(self, request: PutDeckRequest, db: Session) -> None:
        self.manager.update(request.deck_id, request.name, db)
    

    def delete_deck(self, deck_id: str, db: Session) -> None:
        return self.manager.delete(deck_id, db)
    

    ##### Flashcard Methods #####

    def add_flashcards(self, deck_id: int, flashcards: list[PostFlashcardDTO]) -> None:
        self.manager.add(deck_id, flashcards)
        

    def update_flashcards(self, deck_id: int, flashcards: list[FlashcardDTO]) -> None:
        self.manager.update(deck_id, flashcards)
        

    def update_flashcard_ratings(self, deck_id: int, time_studied: str, flashcards: list[FlashcardDTO]) -> None:
        self.manager.update_ratings(deck_id, time_studied, flashcards)


    def delete_flashcards(self, deck_id: int, flashcard_ids: list[str]) -> None:
        self.manager.delete(deck_id, flashcard_ids)