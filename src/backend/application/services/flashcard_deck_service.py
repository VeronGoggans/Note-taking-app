from src.backend.data.managers.flashcard_deck_manager import FlashcardDeckManager
from src.backend.presentation.request_bodies.flashcard_requests import PutDeckRequest
from src.backend.presentation.dtos.flashcard_dtos import PostFlashcardDTO
from src.backend.domain.flashcard_deck import FlashcardDeck
from src.backend.data.exceptions.exceptions import *


class FlashcardDeckService:
    def __init__(self, manager: FlashcardDeckManager):
        self.manager = manager


    def add_deck(self, name: str, flashcards: list[PostFlashcardDTO]) -> FlashcardDeck:
        try:
            deck = FlashcardDeck(1, name)
            return self.manager.add(deck, flashcards)            
        except InsertException as e:
            raise e


    def get_deck_by_id(self, id: str) -> FlashcardDeck:
         return self.manager.get_by_id(id)
        

    def get_all_decks(self) -> list[FlashcardDeck]:
        return self.manager.get_all()


    def get_search_items(self) -> list[object]:
        return self.manager.get_search_items()
    

    def get_random_decks(self) -> list[FlashcardDeck]:
        return self.manager.get_random_decks()
        

    def update_deck(self, request: PutDeckRequest) -> None:
        self.manager.update(request.deck_id, request.name)
    

    def delete_deck(self, deck_id: str) -> None:
        return self.manager.delete(deck_id)