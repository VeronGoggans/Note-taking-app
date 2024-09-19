from fastapi import APIRouter
from src.backend.presentation.http_status import HttpStatus
from src.backend.application.services.flashcard_deck_service import FlashcardDeckService
from src.backend.data.flashcard.flashcard_deck_manager import FlashcardDeckManager
from src.backend.presentation.request_bodies.flashcard_requests import PostDeckRequest, PutDeckRequest
from src.backend.data.exceptions.exception_handler import handle_exceptions


class FlashcardDeckRouter:
    def __init__(self, json_manager):
        self.route = APIRouter()
        self.service = FlashcardDeckService(FlashcardDeckManager(), json_manager)

        self.route.add_api_route('/deck/{id}', self.get_deck_by_id, methods=['GET'])
        self.route.add_api_route('/deckSearchItems', self.get_search_items, methods=['GET'])
        self.route.add_api_route('/decks', self.get_all_decks, methods=['GET'])
        self.route.add_api_route('/randomDecks', self.get_5_random_decks, methods=['GET'])
        self.route.add_api_route('/deck', self.add_deck, methods=['POST'])
        self.route.add_api_route('/deck', self.update_deck, methods=['PUT'])
        self.route.add_api_route('/deck/{id}', self.delete_deck, methods=['DELETE'])


    @handle_exceptions
    def add_deck(self, request: PostDeckRequest): 
        return {"status": HttpStatus.OK, 'deck': self.service.add_deck(request)}


    @handle_exceptions
    def get_deck_by_id(self, id: str):
        return {'status': HttpStatus.OK, "deck": self.service.get_deck_by_id(id)}
        

    @handle_exceptions
    def get_all_decks(self):
        all_decks, misc = self.service.get_all_decks()
        return {'status': HttpStatus.OK, 'decks': all_decks, 'misc': misc}
        

    @handle_exceptions
    def get_search_items(self):
        return {'status': HttpStatus.OK, 'items': self.service.get_search_items()}
        

    @handle_exceptions
    def get_5_random_decks(self):
        return {'status': HttpStatus.OK, 'decks': self.service.get_random_decks()}
        

    @handle_exceptions
    def update_deck(self, request: PutDeckRequest):
        self.service.update_deck(request)
        return {'status': HttpStatus.OK}
        

    @handle_exceptions
    def delete_deck(self, id: str):
        return {"status": HttpStatus.OK, 'deck': self.service.delete_deck(id)}