from src.backend.domain.flashcard_deck import FlashcardDeck
from src.backend.presentation.dtos.flashcard.flashcard_dto import PostFlashcardDTO
from src.backend.data.file.flashcard_serializer import FlashcardSerializer
from src.backend.data.file.text_manager import TextManager
from src.backend.data.exceptions.exceptions import AdditionException, NotFoundException, DeserializationException


class FlashcardDeckManager:
    def __init__(self) -> None:
        self.serializer = FlashcardSerializer()


    def add(self, decks: list, deck: FlashcardDeck, flashcards: list[PostFlashcardDTO]):
        try:
            self.serializer.serialize(deck.flashcards_path, flashcards)
            decks.append(deck.__dict__)
            return deck
        except Exception as e:
            raise AdditionException('An error occurred while adding the deck', errors={'exception': str(e)})


    def get_by_id(self, decks: list, id: str):
        try:
            for deck in decks:
                if deck['id'] == id:
                    deck_object = FlashcardDeck.from_json(deck)
                    self.__fill_deck_with_cards(deck_object, deck['flashcards_path'])
                    return deck_object
            raise NotFoundException(f'Deck with id: {id}, could not be found.')
        except DeserializationException as e:
            raise e 
    
    
    def get_all(self, decks: list):
        try:
            decks_list = []

            for deck in decks:
                deck_object = FlashcardDeck.from_json(deck)
                self.__fill_deck_with_cards(deck_object, deck['flashcards_path'])
                decks_list.append(deck_object)

            return decks_list
        except DeserializationException as e:
            raise e


    def update(self, decks: list, id: str, name: str):
        for deck in decks:
            if deck['id'] == id:
                deck['name'] = name
                return deck
        raise NotFoundException(f'Deck with id: {id}, could not be found.')


    def delete(self, decks: list, id: str):
        for deck in decks:
            if deck['id'] == id:
                decks.remove(deck)
                TextManager.delete(deck['flashcards_path'])
                return deck
        raise NotFoundException(f'Deck with id: {id}, could not be found.')


    def __fill_deck_with_cards(self, deck: FlashcardDeck, cards_path: str) -> FlashcardDeck:
        try:
            flashcards = self.serializer.deserialize(cards_path)
            deck.fill_set_with_cards(flashcards)
            deck.calculate_progress()
            return deck
        except DeserializationException as e:
            raise e