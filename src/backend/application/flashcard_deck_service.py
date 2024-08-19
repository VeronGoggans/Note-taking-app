from src.backend.data.file.json_manager import JsonManager
from src.backend.data.flashcard.flashcard_deck_manager import FlashcardDeckManager
from src.backend.presentation.request_bodies.flashcard_requests import PutDeckRequest
from src.backend.presentation.dtos.flashcard_dtos import PostFlashcardDTO
from src.backend.domain.flashcard_deck import FlashcardDeck
from src.backend.data.file.text_manager import TextManager
from src.backend.data.exceptions.exceptions import SerializationException, AdditionException, NotFoundException, DeserializationException
from os import getcwd


class FlashcardDeckService:
    def __init__(self, manager: FlashcardDeckManager, json_manager: JsonManager):
        self.manager = manager
        self.json_manager = json_manager
        self.BASE_URL = getcwd()
        self.deck_path = f'{self.BASE_URL}/storage/json/flashcard_bundles.json'
        self.id_path = f'{self.BASE_URL}/storage/json/id.json'
        self.misc_path = f'{self.BASE_URL}/storage/json/misc.json'


    def add_deck(self, name: str, flashcards: list[PostFlashcardDTO]) -> FlashcardDeck:
        try:
            json_decks = self.json_manager.load(self.deck_path)
            deck_id = self.json_manager.generate_id(self.id_path, 'flashcard-deck')
            
            deck = FlashcardDeck(deck_id, name)
            deck.set_flashcards_path(TextManager.create_deck_file(deck_id))

            self.manager.add(json_decks, deck, flashcards)

            self.json_manager.update(self.deck_path, json_decks)
            
            return self.get_deck_by_id(deck_id)
        except (SerializationException, AdditionException) as e:
            raise e
        except Exception as e:
            raise e


    def get_deck_by_id(self, id: str) -> FlashcardDeck:
        decks = self.json_manager.load(self.deck_path)
        try:
            return self.manager.get_by_id(decks, id)
        except (NotFoundException, DeserializationException) as e:
            raise e
    

    def get_all_decks(self) -> list[FlashcardDeck]:
        decks = self.json_manager.load(self.deck_path)
        misc = self.json_manager.load(self.misc_path)
        try:
            return self.manager.get_all(decks), misc['flashcard_misc']
        except DeserializationException as e:
            raise e
        

    def get_search_items(self) -> list[object]:
        decks = self.json_manager.load(self.deck_path)
        items = self.manager.get_search_items(decks)

        if len(items) > 0:
            return items
        raise NotFoundException('There are no folders to be retrieved.')
    

    def get_random_decks(self) -> list[FlashcardDeck]:
        decks = self.json_manager.load(self.deck_path)
        random_decks = self.manager.get_random_decks(decks)

        if len(random_decks) > 0:
            return random_decks
        raise NotFoundException('There are no decks to be retrieved.')

        

    def update_deck(self, request: PutDeckRequest) -> None:
        decks = self.json_manager.load(self.deck_path)
        try:
            self.manager.update(decks, request.deck_id, request.name)
            self.json_manager.update(self.deck_path, decks)
        except NotFoundException as e:
            raise e


    def delete_deck(self, deck_id: str) -> None:
        decks = self.json_manager.load(self.deck_path)
        try:
            deck = self.manager.delete(decks, deck_id)
            self.json_manager.update(self.deck_path, decks)
            return deck
        except NotFoundException as e:
            raise e