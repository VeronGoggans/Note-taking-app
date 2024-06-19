from src.backend.domain.enums.flashcard_rating import FlashcardRating

class Flashcard:
    def __init__(self, id, name, answer, rating = FlashcardRating.IDLE.value):
        self.id = id
        self.name = name
        self.answer = answer
        self.rating = rating

    