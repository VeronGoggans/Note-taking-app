from src.backend.domain.enums.flashcard_rating import FlashcardRating

class Flashcard:
    def __init__(self, id, term, description, rating = FlashcardRating.IDLE.value):
        self.id = id
        self.term = term
        self.description = description
        self.rating = rating

    
    @classmethod
    def from_json(self, json_flashcard):
        return Flashcard(
            json_flashcard['id'],
            json_flashcard['name'],
            json_flashcard['answer'],
            json_flashcard['rating']
        )