from src.backend.data.file.json_manager import JsonManager
from src.backend.data.flashcard.flashcard_manager import FlashcardManager
from src.backend.data.exceptions.exceptions import NotFoundException, SerializationException
from src.backend.presentation.dtos.flashcard_dtos import PostFlashcardDTO, FlashcardDTO
from os import getcwd


class FlashcardService:
    def __init__(self, manager: FlashcardManager, json_manager: JsonManager):
        self.manager = manager
        self.json_manager = json_manager
        self.BASE_URL = getcwd()
        self.deck_path = f'{self.BASE_URL}/storage/json/flashcard_bundles.json'
        self.id_path = f'{self.BASE_URL}/storage/json/id.json'
        self.misc_path = f'{self.BASE_URL}/storage/json/misc.json'


    def add_flashcards(self, deck_id: str, flashcards: list[PostFlashcardDTO]) -> None:
        decks = self.json_manager.load(self.deck_path)
        try:
            self.manager.add(decks, deck_id, flashcards)
        except (NotFoundException, SerializationException) as e:
            raise e
        

    def update_flashcards(self, deck_id: str, flashcards: list[FlashcardDTO]) -> None:
        decks = self.json_manager.load(self.deck_path)
        try:
            self.manager.update(decks, deck_id, flashcards)
        except (NotFoundException, SerializationException) as e:
            raise e
        

    def update_flashcard_ratings(self, deck_id: str, time_studied: str, flashcards: list[FlashcardDTO]) -> None:
        decks = self.json_manager.load(self.deck_path)
        misc = self.json_manager.load(self.misc_path)

        try:
            self.manager.update_ratings(decks, misc['flashcard_misc'], deck_id, time_studied, flashcards)
            self.json_manager.update(self.misc_path, misc)
            self.json_manager.update(self.deck_path, decks)
        except (NotFoundException, SerializationException) as e:
            raise e


    def delete_flashcards(self, deck_id: str, flashcard_ids: list[str]) -> None:
        decks = self.json_manager.load(self.deck_path)
        try:
            self.manager.delete(decks, deck_id, flashcard_ids)
        except Exception as e:
            raise e