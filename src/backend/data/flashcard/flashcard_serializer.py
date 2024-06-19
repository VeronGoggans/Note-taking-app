from src.backend.domain.flashcard import Flashcard
from src.backend.domain.enums.flashcard_rating import FlashcardRating

class FlashcardSerializer:
    def __init__(self) -> None:
        pass

    def deserialize(self, flashcards_text: str) -> list[Flashcard]:
        flashcards = []
        flashcard_blocks = flashcards_text.strip().split('# flashcard ')
        # Remove empty indexes e.g (['', 'first index is empty'])
        flashcard_blocks = [block.strip() for block in flashcard_blocks if block.strip()]
        
        # Deserializing process
        for block in flashcard_blocks:
            lines = block.strip().split('\n')
            id_line = lines[0]
            id = int(lines[0])
            name = lines[1]
            answer = ' '.join(lines[2:-1])
            rating = lines[-1].capitalize() 
            
            if rating == 'Correct':
                rating = Flashcard.rating = FlashcardRating.CORRECT.value
            elif rating == 'Wrong':
                rating = Flashcard.rating = FlashcardRating.WRONG.value
            else:
                rating = Flashcard.rating = FlashcardRating.IDLE.value
            
            flashcards.append(Flashcard(id, name, answer, rating))
        
        return flashcards