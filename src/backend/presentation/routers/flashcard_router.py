from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.backend.data.database import Database
from src.backend.presentation.http_status import HttpStatus
from src.backend.application.services.flashcard_service import FlashcardDeckService
from src.backend.data.managers.flashcard_manager import FlashcardDeckManager
from src.backend.presentation.request_bodies.flashcard_requests import *
from src.backend.data.exceptions.exception_handler import handle_exceptions


class FlashcardDeckRouter:
    def __init__(self):
        self.route = APIRouter()
        self.service = FlashcardDeckService(FlashcardDeckManager())

        self.route.add_api_route('/deck/{id}', self.get_deck_by_id, methods=['GET'])
        self.route.add_api_route('/deckSearchItems', self.get_search_items, methods=['GET'])
        self.route.add_api_route('/decks', self.get_all_decks, methods=['GET'])
        self.route.add_api_route('/randomDecks', self.get_5_random_decks, methods=['GET'])
        self.route.add_api_route('/deck', self.add_deck, methods=['POST'])
        self.route.add_api_route('/deck', self.update_deck, methods=['PUT'])
        self.route.add_api_route('/deck/{id}', self.delete_deck, methods=['DELETE'])

        self.route.add_api_route('/flashcards', self.add_flashcards, methods=['POST'])
        self.route.add_api_route('/flashcards/{deck_id}', self.get_flashcards, methods=['GET'])
        self.route.add_api_route('/flashcards', self.update_flashcards, methods=['PUT'])
        self.route.add_api_route('/flashcardRatings', self.update_flashcard_ratings, methods=['PUT'])
        self.route.add_api_route('/flashcards', self.delete_flashcards, methods=['DELETE'])


    @handle_exceptions
    def add_deck(self, request: PostDeckRequest, db: Session = Depends(Database.get_db)): 
        return {"status": HttpStatus.OK, 'deck': self.service.add_deck(request.name, request.flashcards, db)}


    @handle_exceptions
    def get_deck_by_id(self, id: int, db: Session = Depends(Database.get_db)):
        deck, flashcards = self.service.get_deck_by_id(id, db)
        return {'status': HttpStatus.OK, 'deck': deck, 'flashcards': flashcards}
        

    @handle_exceptions
    def get_all_decks(self, db: Session = Depends(Database.get_db)):
        return {'status': HttpStatus.OK, 'decks': self.service.get_all_decks(db)}
        

    @handle_exceptions
    def get_search_items(self, db: Session = Depends(Database.get_db)):
        return {'status': HttpStatus.OK, 'items': self.service.get_search_items(db)}
        

    @handle_exceptions
    def get_5_random_decks(self, db: Session = Depends(Database.get_db)):
        return {'status': HttpStatus.OK, 'decks': self.service.get_random_decks(db)}
        

    @handle_exceptions
    def update_deck(self, request: PutDeckRequest, db: Session = Depends(Database.get_db)):
        self.service.update_deck(request, db)
        return {'status': HttpStatus.OK}
        

    @handle_exceptions
    def delete_deck(self, id: int, db: Session = Depends(Database.get_db)):
        return {"status": HttpStatus.OK, 'deck': self.service.delete_deck(id, db)}
    

    @handle_exceptions
    def add_flashcards(self, request: PostFlashcardsRequest, db: Session = Depends(Database.get_db)):
        self.service.add_flashcards(request.deck_id, request.flashcards, db)
        return {'status': HttpStatus.OK}
    

    @handle_exceptions
    def get_flashcards(self, deck_id: int, db: Session = Depends(Database.get_db)):
        return {'status': HttpStatus.OK, 'flashcards': self.service.get_flashcards(deck_id, db)}
        

    @handle_exceptions
    def update_flashcards(self, request: PutFlashcardsRequest, db: Session = Depends(Database.get_db)):
        self.service.update_flashcards(request.deck_id, request.flashcards, db)
        return {'status': HttpStatus.OK}
        

    @handle_exceptions
    def update_flashcard_ratings(self, request: FlashcardStudyRequest, db: Session = Depends(Database.get_db)):
        self.service.update_flashcard_ratings(request.deck_id, request.time_studied, request.flashcards, db)
        return {'status': HttpStatus.OK}
        

    @handle_exceptions
    def delete_flashcards(self, request: DeleteFlashcardsRequest, db: Session = Depends(Database.get_db)):
        self.service.delete_flashcards(request.deck_id, request.flashcard_ids, db)
        return {'status': HttpStatus.OK}