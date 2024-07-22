from os import getcwd
from src.backend.domain.flashcard import Flashcard
from src.backend.domain.enums.flashcard_rating import FlashcardRating
from src.backend.presentation.dtos.flashcard.flashcard_dto import FlashcardDTO
from src.backend.data.exceptions.exceptions import SerializationException, DeserializationException
from src.backend.data.file.text_manager import TextManager


class FlashcardSerializer:
    def __init__(self):
        self.base_url = getcwd()
        self.ratings = {
            'correct': FlashcardRating.CORRECT.value,
            'wrong': FlashcardRating.WRONG.value,
            'idle': FlashcardRating.IDLE.value
        }

    
    def deserialize(self, file_path: str) -> list[Flashcard]:
        try:
            flashcards = []
            plain_text = TextManager.get(file_path)
            
            flashcard_blocks = plain_text.strip().split('# flashcard ')
            flashcard_blocks = [block.strip() for block in flashcard_blocks if block.strip()]
            
            for block in flashcard_blocks:
                lines = block.strip().split('\n')
                flashcards.append(
                    Flashcard(
                    id = int(lines[0]),
                    term = lines[1],
                    description = ' '.join(lines[2:-1]),
                    rating = self.ratings[lines[-1]]
                    )
                )

            return flashcards
        except Exception as e:
            raise DeserializationException('Failed to deserialize the deck', errors={'exceptions': str(e)})
    


    def serialize(self, file_path: str, flashcards: list[FlashcardDTO], mode = 'w'):
        try:
            flashcard_id = self.__get_current_id_index(file_path)
            deck_content = ''

            for card in flashcards:
                deck_content += f'''# flashcard {flashcard_id}\n{card.term}\n{card.description}\nidle\n\n'''
                flashcard_id += 1

            with open(f'{self.base_url}/{file_path}', mode, encoding='utf-8') as file:
                file.write(deck_content)
        except Exception as e:
            raise SerializationException('Failed to serialize the deck', errors={'exceptions': str(e)})


    def __get_current_id_index(self, path: str) -> int:
        with open(path, 'r') as file:
            lines = file.readlines()
            # If there are no cards in the file.
            if len(lines) < 5:
                return 0
            # If there is atleast one card in the file return the last id
            return int(lines[-5].split(' ')[2]) + 1


    def update_flashcards(self):
        pass


    def delete_flashcard(self):
        pass
