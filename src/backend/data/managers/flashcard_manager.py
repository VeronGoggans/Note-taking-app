from sqlalchemy.orm import Session
from src.backend.data.models import FlashcardSet
from src.backend.data.exceptions.exceptions import NotFoundException
from src.backend.presentation.dtos.flashcard_dtos import PostFlashcardDTO, FlashcardDTO


class FlashcardDeckManager:

    def add(self, deck: FlashcardSet, db: Session):
        db.add(deck)
        db.commit()
        db.refresh(deck)
        return deck


    def get_by_id(self, id: int, db: Session) -> ( FlashcardSet | NotFoundException ):
       return self.__find_deck(id, db)
    
    
    def get_all(self, db: Session) -> list[FlashcardSet]:
        return db.query(FlashcardSet).all()
        

    def get_search_items(self, db: Session) -> list[dict]:
        search_items = (db.query(FlashcardSet.id, FlashcardSet.name).all())
        return [{"id": item.id, "name": item.name} for item in search_items]
    

    def get_random_decks(self, db: Session) -> list[FlashcardSet]:
        pass


    def update(self, id: int, name: str, db: Session) -> None:
        deck = self.__find_deck(id, db)
        deck.name = name
        db.commit()
        db.refresh(deck)
        return deck


    def delete(self, id: int, db: Session) -> FlashcardSet:
        deck = self.__find_deck(id, db)
        db.delete(deck)
        db.commit()
        return deck
    

    def add(self, deck_id: int, flashcards: list[PostFlashcardDTO]) -> None:
        pass

    def update(self, deck_id: int, flashcards: list[FlashcardDTO]) -> None:
        pass

    def update_ratings(self, deck_id: str, time_studied: str, flashcards: list[FlashcardDTO]) -> None:
        pass

    def delete(self, deck_id: int, flashcard_ids: list[str]) -> None:
        pass


    def __find_deck(self, id: int, db: Session) -> ( FlashcardSet | NotFoundException ):
        deck = db.query(FlashcardSet).filter(FlashcardSet.id == id).first()
        
        if deck is None:
            raise NotFoundException(f"Deck with id {id} not found.")
        return deck