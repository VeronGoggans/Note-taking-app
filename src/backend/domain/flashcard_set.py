from src.backend.domain.flashcard import Flashcard
from src.backend.domain.enums.flashcard_rating import FlashcardRating

class FlashcardSet:
    def __init__(self, id, name) -> None:
        self.id = id
        self.name = name
        self.rating = ''
        self.progress = None
        self.flashcards = []


    def add_flash_card(self, flashcard: Flashcard) -> None:
        self.flashcards.append(flashcard)


    def fill_set_with_cards(self, flashcards: list) -> None:
        self.flashcards = flashcards        


    def calculate_progress(self) -> list[int]:
        correct = 0
        wrong = 0 
        for card in self.flashcards:
            if card.rating == FlashcardRating.CORRECT.value:
                correct += 1
            elif card.rating == FlashcardRating.WRONG.value:
                wrong += 1

    
    @classmethod
    def from_json(self, json_set):
        return FlashcardSet(
            json_set['id'],
            json_set['name']
        )