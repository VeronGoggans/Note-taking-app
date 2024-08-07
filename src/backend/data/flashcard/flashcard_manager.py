from src.backend.presentation.dtos.flashcard_dtos import PostFlashcardDTO, FlashcardDTO
from src.backend.data.file.flashcard_serializer import FlashcardSerializer
from src.backend.data.exceptions.exceptions import SerializationException
from src.backend.data.exceptions.exceptions import NotFoundException
from src.backend.util.calendar import Calendar


class FlashcardManager:
    def __init__(self):
        self.serializer = FlashcardSerializer()


    def add(self, decks: list, deck_id: str, flashcards: list[PostFlashcardDTO]):
        self.__manage_flashcards(decks, deck_id, 'add', flashcards=flashcards)

    def update(self, decks: list, deck_id: str, flashcards: list[FlashcardDTO]):
        self.__manage_flashcards(decks, deck_id, 'update', flashcards=flashcards)

    def update_ratings(self, decks: list, flashcard_misc: dict, deck_id: str, time_studied: str, flashcards: list[FlashcardDTO]):
        # Updating the flashcards
        self.__manage_flashcards(decks, deck_id, 'update', flashcards=flashcards)

        # Updating the study streak and study time
        flashcard_misc['streak'] += 1
        flashcard_misc['study_time'] += time_studied

        # Updating the deck study date.
        self.__update_deck_study_date(decks, deck_id)
        

    def delete(self, decks: list, deck_id: str, flashcard_ids: list[str]):
        self.__manage_flashcards(decks, deck_id, 'delete', flashcard_ids=flashcard_ids)    
    

    def __manage_flashcards(self, decks: list, deck_id: str, action: str, flashcards=None, flashcard_ids=None):
        try:
            if self.__does_deck_exist(decks, deck_id):
                file_path = f'storage/flashcards/flashcard-deck-{deck_id}.txt'
                
                if action == 'add':
                    self.serializer.serialize(file_path, flashcards, 'a')
                elif action == 'update':
                    self.serializer.update_flashcards(file_path, flashcards)
                elif action == 'delete':
                    self.serializer.delete_flashcard(file_path, flashcard_ids)
                else:
                    raise ValueError(f"Invalid action: {action}")
                return 
            raise NotFoundException(f'Deck with id: {deck_id}, could not be found.')
        except SerializationException as e:
            raise e


    def __does_deck_exist(self, decks: list, deck_id: str) -> bool:
        for deck in decks:
            if deck['id'] == deck_id:
                return True
        return False
    

    def __update_deck_study_date(self, decks: list, deck_id: str) -> object:
        for deck in decks:
            if deck['id'] == deck_id:
                deck['last_study'] = Calendar.datetime()