from src.backend.data.file.json_manager import JsonManager
from src.backend.data.file.flashcard_serializer import FlashcardSerializer
from src.backend.data.flashcard.flashcard_deck_manager import FlashcardDeckManager
from src.backend.presentation.request_bodies.flashcard.post_deck_request import PostDeckRequest
from src.backend.presentation.request_bodies.flashcard.post_flashcard_request import PostFlashcardRequest
from src.backend.presentation.dtos.flashcard.flashcard_dto import FlashcardDTO
from src.backend.domain.flashcard_deck import FlashcardDeck
from src.backend.data.exceptions.exceptions import DeckSerializationException, AdditionException, NotFoundException, DeckDeserializationException
from os import getcwd


class FlashcardService:
    def __init__(self, flashcard_manager: FlashcardDeckManager, json_manager: JsonManager):
        self.manager = flashcard_manager
        self.json_manager = json_manager
        self.BASE_URL = getcwd()
        self.flashcards_path = f'{self.BASE_URL}/storage/json/flashcard_bundles.json'
        self.id_path = f'{self.BASE_URL}/storage/json/id.json'


    def get_flashcard_by_id(self, id: str):
        json_decks = self.json_manager.load(self.flashcards_path)
        try:
            return self.manager.get_by_id(json_decks, id)
        except (NotFoundException, DeckDeserializationException) as e:
            raise e
    

    def get_all_decks(self):
        json_decks = self.json_manager.load(self.flashcards_path)
        try:
            return self.manager.get_all(json_decks)
        except AdditionException as e:
            raise e
    
    

    def add_deck(self, request: PostDeckRequest):
        try:
            json_decks = self.json_manager.load(self.flashcards_path)
            deck_id = self.json_manager.generate_id(self.id_path, 'flashcard-deck')
            flashcard_dtos = self.__request_to_dto(request.flashcards)
            cards_path = FlashcardSerializer.serialize(deck_id, flashcard_dtos)
            
            deck = FlashcardDeck(deck_id, request.name, cards_path)
            new_deck = self.manager.add(json_decks, deck)

            self.json_manager.update(self.flashcards_path, json_decks)
            return new_deck
        except (DeckSerializationException, AdditionException) as e:
            raise e
        except Exception as e:
            raise e


    def __request_to_dto(self, flashcards: list[PostFlashcardRequest]):
        return [FlashcardDTO(card.term, card.description) for card in flashcards]
