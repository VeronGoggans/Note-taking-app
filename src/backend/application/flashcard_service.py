from src.backend.data.file.json_manager import JsonManager
from src.backend.data.flashcard.flashcard_manager import FlashcardManager
from src.backend.domain.enums.responseMessages import Status



from os import getcwd


class FlashcardService:
    def __init__(self, flashcard_manager: FlashcardManager, json_manager: JsonManager):
        self.manager = flashcard_manager
        self.json_manager = json_manager
        self.BASE_URL = getcwd()
        self.flashcards_path = f'{self.BASE_URL}/storage/json/flashcard_bundles.json'
        self.id_path = f'{self.BASE_URL}/storage/json/id.json'


    def get_flashcard_by_id(self, id: str):
        flashcard_sets = self.json_manager.load(self.flashcards_path)
        flashcard_set = self.manager.get_by_id(flashcard_sets, id)

        if flashcard_set:
            return flashcard_set
        return Status.NOT_FOUND


