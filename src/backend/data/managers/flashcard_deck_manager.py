from src.backend.domain.flashcard_deck import FlashcardDeck
from src.backend.presentation.dtos.flashcard_dtos import PostFlashcardDTO, FlashcardDTO
from src.backend.data.exceptions.exceptions import InsertException, NotFoundException
import random

class FlashcardDeckManager:

    def add(self, decks: list, deck: FlashcardDeck, flashcards: list[PostFlashcardDTO]):
        pass


    def get_by_id(self, decks: list, id: str) -> FlashcardDeck:
       pass
    
    
    def get_all(self, decks: list) -> list[FlashcardDeck]:
        pass
        

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
                return deck
        raise NotFoundException(f'Deck with id: {id}, could not be found.')


    def __fill_deck_with_cards(self, deck: FlashcardDeck, cards_path: str) -> FlashcardDeck:
        pass
        

    
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