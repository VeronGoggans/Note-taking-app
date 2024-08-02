from src.backend.presentation.dtos.flashcard_dtos import PostFlashcardDTO, FlashcardDTO
from src.backend.data.file.flashcard_serializer import FlashcardSerializer
from src.backend.data.exceptions.exceptions import SerializationException
from src.backend.data.exceptions.exceptions import NotFoundException


class FlashcardManager:
    def __init__(self):
        self.serializer = FlashcardSerializer()


    def add(self, decks: list, id: str, flashcards: list[PostFlashcardDTO]):
        self.__manage_flashcards(decks, id, 'add', flashcards=flashcards)

    def update(self, decks: list, id: str, flashcards: list[FlashcardDTO]):
        self.__manage_flashcards(decks, id, 'update', flashcards=flashcards)                

    def delete(self, decks: list, id: str, flashcard_ids: list[str]):
        self.__manage_flashcards(decks, id, 'delete', flashcard_ids=flashcard_ids)    
    

    def __manage_flashcards(self, decks: list, id: str, action: str, flashcards=None, flashcard_ids=None):
        try:
            if self.__does_deck_exist(decks, id):
                file_path = f'storage/flashcards/flashcard-deck-{id}.txt'
                
                if action == 'add':
                    self.serializer.serialize(file_path, flashcards, 'a')
                elif action == 'update':
                    self.serializer.update_flashcards(file_path, flashcards)
                elif action == 'delete':
                    self.serializer.delete_flashcard(file_path, flashcard_ids)
                else:
                    raise ValueError(f"Invalid action: {action}")
                return 
            raise NotFoundException(f'Deck with id: {id}, could not be found.')
        except SerializationException as e:
            raise e


    def __does_deck_exist(self, decks: list, id: str) -> bool:
        for deck in decks:
            if deck['id'] == id:
                return True
        return False