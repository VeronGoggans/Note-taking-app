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


    def calculate_progress(self) -> list[int]:
        correct = 0
        wrong = 0 
        for card in self.flashcards:
            if card.rating == FlashcardRating.CORRECT.value:
                correct += 1
            elif card.rating == FlashcardRating.WRONG.value:
                wrong += 1
