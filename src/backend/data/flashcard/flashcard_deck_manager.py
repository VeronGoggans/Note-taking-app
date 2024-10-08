from src.backend.domain.flashcard_deck import FlashcardDeck
from src.backend.presentation.dtos.flashcard_dtos import PostFlashcardDTO, FlashcardDTO
from src.backend.data.file.flashcard_serializer import FlashcardSerializer
from src.backend.data.file.text_manager import TextManager
from src.backend.data.exceptions.exceptions import AdditionException, NotFoundException, DeserializationException
import random

class FlashcardDeckManager:
    def __init__(self) -> None:
        self.serializer = FlashcardSerializer()


    def add(self, decks: list, deck: FlashcardDeck, flashcards: list[PostFlashcardDTO]):
        try:
            flashcard_dtos = self.__create_flashcard_dto(flashcards)
            self.serializer.serialize(deck.flashcards_path, flashcard_dtos)
            decks.append(deck.__dict__)
            return deck
        except Exception as e:
            raise AdditionException('An error occurred while adding the deck', errors={'exception': str(e)})


    def get_by_id(self, decks: list, id: str) -> FlashcardDeck:
        try:
            for deck in decks:
                if deck['id'] == id:
                    deck_object = FlashcardDeck.from_json(deck)
                    self.__fill_deck_with_cards(deck_object, deck['flashcards_path'])
                    return deck_object
            raise NotFoundException(f'Deck with id: {id}, could not be found.')
        except DeserializationException as e:
            raise e 
    
    
    def get_all(self, decks: list) -> list[FlashcardDeck]:
        try:
            decks_list = []

            for deck in decks:
                deck_object = FlashcardDeck.from_json(deck)
                self.__fill_deck_with_cards(deck_object, deck['flashcards_path'])
                decks_list.append(deck_object)

            return decks_list
        except DeserializationException as e:
            raise e
        

    def get_search_items(self, decks: list) -> list[object]:
        items = []
        for deck in decks:
            items.append({'name': deck['name'], 'id': deck['id']})
        return items
    

    def get_random_decks(self, decks: list) -> list[object]:
        amount_of_decks = 5
        if len(decks) < 5:
            # To prevent a valueError with the sample function 
            amount_of_decks = len(decks)
        
        if len(decks) > 0:    
            # Use get_all to deserialize the decks flashcards
            return self.get_all(random.sample(decks, amount_of_decks))
        return decks


    def update(self, decks: list, id: str, name: str) -> None:
        for deck in decks:
            if deck['id'] == id:
                deck['name'] = name
                return 
        raise NotFoundException(f'Deck with id: {id}, could not be found.')


    def delete(self, decks: list, id: str) -> object:
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
        

    
    def __create_flashcard_dto(self, flashcards: PostFlashcardDTO) -> list[FlashcardDTO]:
        """
            This method is only used for the add_flashcards() method
            The request parameter only expects a flashcard term/description
            This method fills in the other fields to create a flashcard DTO
        """
        dtos = []
        flashcard_id = 0
        for flashcard in flashcards:
            dtos.append(
                FlashcardDTO(
                    flashcard_id,
                    flashcard.term,
                    flashcard.description,
                    'idle'
                )
            )
            flashcard_id += 1
        return dtos