from src.backend.domain.flashcard import Flashcard
from src.backend.domain.flashcard_deck import FlashcardDeck
from src.backend.data.flashcard.flashcard_serializer import FlashcardSerializer
from src.backend.data.file.html_manager import HTMLManager


class FlashcardDeckManager:


    def add(self, decks: list, deck):
        pass


    def get_by_id(self, decks: list, id: str):
        for deck in decks:
            if deck['id'] == id:
                deck_object = FlashcardDeck.from_json(deck)
                self.__fill_deck_with_cards(deck_object, deck['cards'])
                return deck_object
            
        return None
    
    
    def get_all(self, decks: list):
        decks_list = []

        for deck in decks:
            deck_object = FlashcardDeck.from_json(deck)
            self.__fill_deck_with_cards(deck_object, deck['cards'])
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
        plain_text_cards = HTMLManager.get(cards_path)
        flashcards = FlashcardSerializer.deserialize(plain_text_cards)
        deck.fill_set_with_cards(flashcards)
        deck.calculate_progress()
        return deck