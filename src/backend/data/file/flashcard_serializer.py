from os import getcwd
from src.backend.domain.flashcard import Flashcard
from src.backend.domain.enums.flashcard_rating import FlashcardRating
from src.backend.presentation.dtos.flashcard.flashcard_dto import FlashcardDTO

class FlashcardSerializer:
    
    @staticmethod
    def deserialize(flashcards_text: str) -> list[Flashcard]:
        flashcards = []
        flashcard_blocks = flashcards_text.strip().split('# flashcard ')
        # Remove empty indexes e.g (['', 'first index is empty'])
        flashcard_blocks = [block.strip() for block in flashcard_blocks if block.strip()]
        
        # Deserializing process
        for block in flashcard_blocks:
            lines = block.strip().split('\n')
            id = int(lines[0])
            term = lines[1]
            description = ' '.join(lines[2:-1])
            rating = lines[-1].capitalize() 
            
            if rating == 'Correct':
                rating = Flashcard.rating = FlashcardRating.CORRECT.value
            elif rating == 'Wrong':
                rating = Flashcard.rating = FlashcardRating.WRONG.value
            else:
                rating = Flashcard.rating = FlashcardRating.IDLE.value
            
            flashcards.append(Flashcard(id, term, description, rating))
        
        return flashcards
    

    @staticmethod
    def serialize(deck_id: str, flashcards: list[FlashcardDTO]) -> str:
        flashcard_id = 1
        BASE_URL = getcwd()
        path = f'storage/flashcards/flashcard-deck-{deck_id}.txt'
        deck_content = ''

        for card in flashcards:
            deck_content += f'''# flashcard {flashcard_id}\n{card.term}\n{card.description}\nidle\n\n'''
            flashcard_id += 1

        try:
            with open(f'{BASE_URL}/{path}', 'w', encoding='utf-8') as file:
                file.write(deck_content)
                return path
        except Exception as e:
            print(f"UnicodeEncodeError occurred: {e}")
            return None
        


    def update_flashcards(self):
        pass


    def delete_flashcard(self):
        pass
