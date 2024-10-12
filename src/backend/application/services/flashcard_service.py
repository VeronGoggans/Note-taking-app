from sqlalchemy.orm import Session
from src.backend.data.managers.flashcard_manager import FlashcardDeckManager
from src.backend.presentation.request_bodies.flashcard_requests import PutDeckRequest, PostFlashcardRequest, PutFlashcardRequest
from src.backend.data.models import FlashcardSet, Flashcard
from src.backend.data.exceptions.exceptions import *


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
    

    def delete_deck(self, deck_id: int, db: Session) -> None:
        return self.manager.delete_deck(deck_id, db)
    

    def add_flashcards(self, deck_id: int, flashcards: list[PostFlashcardRequest], db: Session) -> None:
        flashcard_models = [Flashcard(
                term=flashcard.term, 
                description=flashcard.description, 
                flascard_set_id = deck_id) 
                for flashcard in flashcards]
        
        self.manager.add_flashcards(deck_id, flashcard_models, db)


    def add_flashcard(self, deck_id: int, flashcard: PostFlashcardRequest, db: Session) -> Flashcard:
        new_flahcard = Flashcard(
                term=flashcard.term, 
                description=flashcard.description, 
                flascard_set_id = deck_id
                ) 
        return self.manager.add_flashcard(new_flahcard, db)


    def get_flashcards(self, deck_id: int, db: Session) -> list[Flashcard]:
        return self.manager.get_flashcards(deck_id, db)
        

    def update_flashcard(self, flashcard: PutFlashcardRequest, db: Session) -> Flashcard:
        return self.manager.update_flashcard(flashcard, db)
        

    def update_flashcard_rating(self, flashcard_id: int, rating: str, db: Session) -> None:
        self.manager.update_rating(flashcard_id, rating, db)


    def delete_flashcard(self, flashcard_id: int, db: Session) -> Flashcard:
        return self.manager.delete_flashcard(flashcard_id, db)