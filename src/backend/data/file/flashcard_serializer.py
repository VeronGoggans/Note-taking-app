from os import getcwd
from src.backend.domain.enums.flashcard_rating import FlashcardRating
from src.backend.presentation.dtos.flashcard_dtos import FlashcardDTO
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

    
    def deserialize(self, file_path: str) -> list[FlashcardDTO]:
        try:
            flashcards = []
            plain_text = TextManager.get(file_path)
            
            flashcard_blocks = plain_text.strip().split('# flashcard ')
            flashcard_blocks = [block.strip() for block in flashcard_blocks if block.strip()]
            
            for block in flashcard_blocks:
                lines = block.strip().split('\n')
                flashcards.append(
                    FlashcardDTO(
                    id = int(lines[0]),
                    term = lines[1],
                    description = ' '.join(lines[2:-1]),
                    rating = self.ratings[lines[-1]].lower()
                    )
                )

            return flashcards
        except Exception as e:
            raise DeserializationException('Failed to deserialize the deck', errors={'exceptions': str(e)})
    


    def serialize(self, file_path: str, flashcards: list, mode = 'w') -> None:
        try:
            deck_content = ''

            if mode == 'a':
                flashcard_id = self.__get_current_id_index(file_path)

                for card in flashcards:
                    deck_content += f'# flashcard {flashcard_id}\n{card.term}\n{card.description}\nidle\n\n'
                    flashcard_id += 1

            elif mode == 'w':
                for card in flashcards:
                    deck_content += f'# flashcard {card.id}\n{card.term}\n{card.description}\n{card.rating}\n\n'

            with open(f'{self.base_url}/{file_path}', mode, encoding='utf-8') as file:
                file.write(deck_content)
        except Exception as e:
            raise SerializationException('Failed to serialize the deck', errors={'exceptions': str(e)})



    def update_flashcards(self, file_path: str, updated_flashcards: list[FlashcardDTO]) -> None:
        original_flashcards: list[FlashcardDTO] = self.deserialize(file_path)
        updated_flashcards_dict = {flashcard.id: flashcard for flashcard in updated_flashcards}

        for i, flashcard in enumerate(original_flashcards):
            if flashcard.id in updated_flashcards_dict:
                # Replace the original flashcard with the updated one
                original_flashcards[i] = updated_flashcards_dict[flashcard.id]
    
        self.serialize(file_path, original_flashcards)



    def delete_flashcard(self, file_path: str, flashcards_to_remove: list[int]) -> None:
        original_flashcards: list[FlashcardDTO] = self.deserialize(file_path)
        ids_to_remove_set = set(flashcards_to_remove)
    
        # Filter the original flashcards to exclude those with IDs in the removal list
        updated_flashcards = [flashcard for flashcard in original_flashcards if flashcard.id not in ids_to_remove_set]
        
        self.serialize(file_path, updated_flashcards)



    def __get_current_id_index(self, path: str) -> int:
        """
        This method will check if there are aready flashcards in the given file.
        If so it returns the last flashcard id.

        If the file is empty it returns 0
        """
        with open(path, 'r') as file:
            lines = file.readlines()
            # If there are no cards in the file.
            if len(lines) < 5:
                return 0
            # If there is atleast one card in the file return the last id
            return int(lines[-5].split(' ')[2]) + 1