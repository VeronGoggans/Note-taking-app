from src.backend.data.flashcard.flashcard_deck_manager import FlashcardDeckManager
from src.backend.presentation.request_bodies.flashcard_requests import PutDeckRequest
from src.backend.presentation.dtos.flashcard_dtos import PostFlashcardDTO
from src.backend.domain.flashcard_deck import FlashcardDeck
from src.backend.data.exceptions.exceptions import *
from src.backend.application.decorators.exceptions import check_for_null 


class FlashcardDeckService:
    def __init__(self, manager: FlashcardDeckManager):
        self.manager = manager


    def add_deck(self, name: str, flashcards: list[PostFlashcardDTO]) -> FlashcardDeck:
        try:
            deck = FlashcardDeck(1, name)
            return self.manager.add(deck, flashcards)            
        except AdditionException as e:
            raise e


    @check_for_null
    def get_deck_by_id(self, id: str) -> FlashcardDeck:
         return self.manager.get_by_id(id)
        

    @check_for_null
    def get_all_decks(self) -> list[FlashcardDeck]:
        return self.manager.get_all()


    @check_for_null
    def get_search_items(self) -> list[object]:
        return self.manager.get_search_items()
    

    @check_for_null
    def get_random_decks(self) -> list[FlashcardDeck]:
        return self.manager.get_random_decks()
        

    @check_for_null
    def update_deck(self, request: PutDeckRequest) -> None:
        self.manager.update(request.deck_id, request.name)
    

    @check_for_null
    def delete_deck(self, deck_id: str) -> None:
        return self.manager.delete(deck_id)