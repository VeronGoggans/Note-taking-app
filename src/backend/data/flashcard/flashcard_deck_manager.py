from src.backend.domain.flashcard import Flashcard
from src.backend.domain.flashcard_deck import FlashcardDeck
from src.backend.data.file.flashcard_serializer import FlashcardSerializer
from src.backend.data.file.text_manager import TextManager
from src.backend.presentation.dtos.flashcard.flashcard_dto import FlashcardDTO


class FlashcardDeckManager:


    def add(self, decks: list, deck: FlashcardDeck):
        try:
            decks.append(deck.__dict__)
            return deck
        except Exception as e:
            return None


    def get_by_id(self, decks: list, id: str):
        for deck in decks:
            if deck['id'] == id:
                deck_object = FlashcardDeck.from_json(deck)
                self.__fill_deck_with_cards(deck_object, deck['flashcards_path'])
                return deck_object
            
        return None
    
    
    def get_all(self, decks: list):
        decks_list = []

        for deck in decks:
            deck_object = FlashcardDeck.from_json(deck)
            self.__fill_deck_with_cards(deck_object, deck['flashcards_path'])
            decks_list.append(deck_object)

        return decks_list


    def update(self, decks: list, id: str):
        pass


    def delete(self, decks: list, id: str):
        for deck in decks:
            if deck['id'] == id:
                decks.remove(deck)
                return deck
        return None


    def __fill_deck_with_cards(self, deck: FlashcardDeck, cards_path: str) -> FlashcardDeck:
        plain_text_cards = TextManager.get(cards_path)
        flashcards = FlashcardSerializer.deserialize(plain_text_cards)
        deck.fill_set_with_cards(flashcards)
        deck.calculate_progress()
        return deck