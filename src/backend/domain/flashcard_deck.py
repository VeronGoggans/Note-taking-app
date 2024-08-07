from src.backend.domain.flashcard import Flashcard
from src.backend.domain.enums.flashcard_rating import FlashcardRating
from src.backend.util.calendar import Calendar

class FlashcardDeck:
    def __init__(self, id: str, name: str, last_study: str = Calendar.datetime(precise=True) ) -> None:
        self.id: str = id
        self.name: str = name
        self.flashcards_path: str = None
        self.last_study: str = last_study
        self.progress: object = None
        self.flashcards: list = []


    def add_flash_card(self, flashcard: Flashcard) -> None:
        self.flashcards.append(flashcard)


    def fill_set_with_cards(self, flashcards: list) -> None:
        self.flashcards = flashcards        


    def calculate_progress(self) -> list[int]:
        correct = 0
        wrong = 0
        idle = 0 
        
        for card in self.flashcards:
            if card.rating == FlashcardRating.CORRECT.value:
                correct += 1
            elif card.rating == FlashcardRating.WRONG.value:
                wrong += 1
            else:
                idle += 1
        
        self.progress = {
            'correct': correct,
            'wrong': wrong,
            'idle': idle,
            'percentage': int(correct / (correct + wrong + idle) * 100)
        }


    def set_flashcards_path(self, path):
        self.flashcards_path = path

    
    @classmethod
    def from_json(self, json_deck):
        return FlashcardDeck(
            json_deck['id'],
            json_deck['name'],
            json_deck['last_study']
        )