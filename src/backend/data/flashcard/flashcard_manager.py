from src.backend.domain.flashcard import Flashcard
from src.backend.domain.flashcard_set import FlashcardSet
from src.backend.data.flashcard.flashcard_serializer import FlashcardSerializer
from src.backend.data.file.html_manager import HTMLManager


class FlashcardManager:

    def get_by_id(self, flashcard_sets: list, id: str):
        for set in flashcard_sets:
            if set['id'] == id:
                flashcard_set = FlashcardSet.from_json(set)
                plain_text_cards = HTMLManager.get(set['cards'])
                flashcards = FlashcardSerializer.deserialize(plain_text_cards)
                flashcard_set.fill_set_with_cards(flashcards)
                return flashcard_set
            
        return None





        