from sqlalchemy.orm import Session
from src.backend.data.managers.flashcard_manager import FlashcardDeckManager
from src.backend.presentation.request_bodies.flashcard_requests import PutDeckRequest, PostFlashcardRequest
from src.backend.data.models import FlashcardSet, Flashcard
from src.backend.data.exceptions.exceptions import *
from src.backend.presentation.dtos.flashcard_dtos import PostFlashcardDTO, FlashcardDTO


class FlashcardDeckService:
    def __init__(self, manager: FlashcardDeckManager):
        self.manager = manager


    def add_deck(self, name: str, flashcards: list[PostFlashcardRequest], db: Session) -> FlashcardSet:
        new_deck = FlashcardSet(name = name)
        deck = self.manager.add_deck(new_deck, db)
        self.add_flashcards(deck.id, flashcards, db)
        return deck


    def get_deck_by_id(self, id: str, db: Session) -> FlashcardSet:
        return self.manager.get_deck_by_id(id, db)
        

    def get_all_decks(self, db: Session) -> list[FlashcardSet]:
        return self.manager.get_all_decks(db)


    def get_search_items(self, db: Session) -> list[object]:
        return self.manager.get_search_items(db)
    

    def get_random_decks(self, db: Session) -> list[FlashcardSet]:
        return self.manager.get_random_decks(db)
        

    def update_deck(self, request: PutDeckRequest, db: Session) -> None:
        self.manager.update_deck(request.deck_id, request.name, db)
    

    def delete_deck(self, deck_id: str, db: Session) -> None:
        return self.manager.delete_deck(deck_id, db)
    

    def add_flashcards(self, deck_id: int, flashcards: list[PostFlashcardDTO], db: Session) -> None:
        flashcard_models = [Flashcard(
                term=flashcard.term, 
                description=flashcard.description, 
                flascard_set_id = deck_id) 
                for flashcard in flashcards]
        
        self.manager.add_flashcards(deck_id, flashcard_models, db)


    def get_flashcards(self, deck_id: int, db: Session) -> list[Flashcard]:
        return self.manager.get_flashcards(deck_id, db)
        

    def update_flashcards(self, deck_id: int, flashcards: list[FlashcardDTO], db: Session) -> None:
        self.manager.update_flashcards(deck_id, flashcards, db)
        

    def update_flashcard_ratings(self, deck_id: int, time_studied: str, flashcards: list[FlashcardDTO], db: Session) -> None:
        self.manager.update_ratings(deck_id, time_studied, flashcards, db)


    def delete_flashcards(self, deck_id: int, flashcard_ids: list[int], db: Session) -> None:
        self.manager.delete_flashcards(deck_id, flashcard_ids, db)