from src.backend.data.file.json_manager import JsonManager
from src.backend.data.flashcard.flashcard_deck_manager import FlashcardDeckManager
from src.backend.domain.enums.responseMessages import Status
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
        deck = self.manager.get_by_id(json_decks, id)

        if deck:
            return deck
        return Status.NOT_FOUND
    

    def get_all_decks(self):
        json_decks = self.json_manager.load(self.flashcards_path)
        decks = self.manager.get_all(json_decks)

        if decks:
            return decks
        return None 




