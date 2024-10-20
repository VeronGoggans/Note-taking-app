from sqlalchemy.orm import Session
import random
from src.backend.data.models import FlashcardSet, Flashcard
from src.backend.data.exceptions.exceptions import NotFoundException
from src.backend.presentation.request_bodies.flashcard_requests import PutFlashcardRequest
from src.backend.data.helpers import find_deck, find_flashcard


class FlashcardDeckManager:

    def add_deck(self, deck: FlashcardSet, db: Session):
        db.add(deck)
        db.commit()
        db.refresh(deck)
        return deck


    def get_deck_by_id(self, deck_id: int, db: Session) -> ( FlashcardSet | NotFoundException ):
        deck = find_deck(deck_id, db)
        flashcards = (
            db.query(Flashcard)
            .filter(Flashcard.flascard_set_id == deck_id)
            .all()
        )
        return deck, flashcards
    
    
    def get_all_decks(self, db: Session) -> list[FlashcardSet]:
        decks = db.query(FlashcardSet).all()
        decks_with_prog = []
        for deck in decks:
            decks_with_prog.append({
                'deck': deck,
                'stats': self.__get_deck_progression(deck.id, db)
            })
        return decks_with_prog
        

    def get_search_items(self, db: Session) -> list[dict]:
        search_items = (db.query(FlashcardSet.id, FlashcardSet.name).all())
        return [{"id": item.id, "name": item.name} for item in search_items]
    

    def get_random_decks(self, db: Session) -> list[FlashcardSet]:
        all_decks = db.query(FlashcardSet).all()
        sample_size = 5

        if len(all_decks) < 5:
            sample_size = len(all_decks)

        decks = random.sample(all_decks, sample_size)  # Get up to 5 random decks
        decks_with_prog = []
        for deck in decks:
            decks_with_prog.append({
                'deck': deck,
                'stats': self.__get_deck_progression(deck.id, db)
            })
        return decks_with_prog


    def update_deck(self, id: int, name: str, db: Session) -> None:
        deck = find_deck(id, db)
        deck.name = name

        db.commit()
        db.refresh(deck)
        return deck


    def delete_deck(self, id: int, db: Session) -> FlashcardSet:
        deck = find_deck(id, db)
        db.delete(deck)
        db.commit()
        return deck
    

    def add_flashcards(self, deck_id: int, flashcards: list[Flashcard], db: Session) -> None:
        find_deck(deck_id, db)
        db.add_all(flashcards)
        db.commit()


    def add_flashcard(self, flashcard: Flashcard, db: Session) -> Flashcard:
        db.add(flashcard)
        db.commit()
        db.refresh(flashcard)
        return flashcard


    def get_flashcards(self, deck_id: int, db: Session) -> list[Flashcard]:
        return db.query(Flashcard).filter(Flashcard.flascard_set_id == deck_id).all()
        

    def update_flashcard(self, updated_flashcard: PutFlashcardRequest, db: Session) -> Flashcard:
        flashcard = find_flashcard(updated_flashcard.id, db)
        flashcard.term = updated_flashcard.term
        flashcard.description = updated_flashcard.description

        db.commit()
        db.refresh(flashcard)
        return flashcard


    def update_rating(self, flashcard_id: int, rating: str, db: Session) -> None:
        flashcard = find_flashcard(flashcard_id, db)
        flashcard.rating = rating
        db.commit()
        

    def delete_flashcard(self, flashcard_id: int, db: Session) -> Flashcard:
        flashcard = find_flashcard(flashcard_id, db)
        db.delete(flashcard)
        db.commit()
        return flashcard


    def __get_deck_progression(self, deck_id: int, db: Session):
        wrong, correct, idle, progression = 0, 0, 0, 0
        flashcards = db.query(Flashcard).filter(Flashcard.flascard_set_id == deck_id).all()


        for flashcard in flashcards:
            if flashcard.rating == 'wrong':
                wrong += 1
            elif flashcard.rating == 'correct':
                correct += 1
            elif flashcard.rating == 'idle':
                idle += 1

        if correct + wrong + idle > 0:
            progression = int(correct / (correct + wrong + idle) * 100)
        
        return {'progression': progression, 'flashcards': len(flashcards)}
        

    def __get_deck_card_count(self, deck_id: int, db: Session) -> dict:
        return {
            'flashcards': db.query(Flashcard).filter(Flashcard.flascard_set_id == deck_id).count()
        }

