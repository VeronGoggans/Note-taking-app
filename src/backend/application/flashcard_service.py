from src.backend.data.file.json_manager import JsonManager
from src.backend.data.flashcard.flashcard_manager import FlashcardManager
from src.backend.data.exceptions.exceptions import NotFoundException, SerializationException
from src.backend.presentation.request_bodies.flashcard.flashcard_request import PostFlashcardsRequest, PostFlashcardRequest
from src.backend.presentation.dtos.flashcard.flashcard_dto import FlashcardDTO
from os import getcwd


class FlashcardService:
    def __init__(self, manager: FlashcardManager, json_manager: JsonManager):
        self.manager = manager
        self.json_manager = json_manager
        self.BASE_URL = getcwd()
        self.deck_path = f'{self.BASE_URL}/storage/json/flashcard_bundles.json'
        self.id_path = f'{self.BASE_URL}/storage/json/id.json'


    def add_flashcards(self, deck_id: str, flashcards: list[FlashcardDTO]):
        decks = self.json_manager.load(self.deck_path)
        try:
            self.manager.add(decks, deck_id, flashcards)
        except (NotFoundException, SerializationException) as e:
            raise e
        


    def update_flashcard(self):
        pass


    def delete_flashcard(self):
        pass