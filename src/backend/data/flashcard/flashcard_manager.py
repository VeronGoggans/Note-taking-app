from src.backend.presentation.dtos.flashcard.flashcard_dto import FlashcardDTO
from src.backend.data.file.flashcard_serializer import FlashcardSerializer
from src.backend.data.exceptions.exceptions import SerializationException
from src.backend.data.exceptions.exceptions import NotFoundException


class FlashcardManager:
    def __init__(self):
        self.serializer = FlashcardSerializer()

    def add(self, decks: list, id: str, flashcards: list[FlashcardDTO]):
        try:
            for deck in decks:
                if deck['id'] == id:
                    file_path = f'storage/flashcards/flashcard-deck-{id}.txt'
                    self.serializer.serialize(file_path, flashcards, 'a')
                    return 
            raise NotFoundException(f'Deck with id: {id}, could not be found.')
        except SerializationException as e:
            raise SerializationException('Failed to serialize the flashcards', errors={'exceptions': str(e)})


    def update(self):
        pass


    def delete(self):
        pass