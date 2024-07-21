from fastapi import APIRouter
from src.backend.presentation.http_status import HttpStatus
from src.backend.application.flashcard_service import FlashcardService
from src.backend.data.flashcard.flashcard_deck_manager import FlashcardDeckManager
from src.backend.presentation.request_bodies.flashcard.post_deck_request import PostDeckRequest
from src.backend.data.exceptions.exceptions import DeckSerializationException, NotFoundException, DeckDeserializationException


class FlashcardRouter:
    def __init__(self, json_manager):
        self.route = APIRouter()
        self.service = FlashcardService(FlashcardDeckManager(), json_manager)

        self.route.add_api_route('/deck/{id}', self.get_flashcard_by_id, methods=['GET'])
        self.route.add_api_route('/decks', self.get_all_decks, methods=['GET'])
        self.route.add_api_route('/deck', self.add_deck, methods=['POST'])


    def get_flashcard_by_id(self, id: str):
        try:
            deck = self.service.get_flashcard_by_id(id)
            return {'status': 'succes', "Deck": deck}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', "message": str(e)}, HttpStatus.NOT_FOUND
        except DeckDeserializationException as e:
            return {'status': 'error', 'message': str(e)}, HttpStatus.INTERAL_SERVER_ERROR
        
    
    def get_all_decks(self):
        try:
            all_decks = self.service.get_all_decks()
            return {'status': 'succes', 'Decks': all_decks}
        except DeckDeserializationException as e:
            return {'status': 'error', 'message': str(e)}, HttpStatus.INTERAL_SERVER_ERROR
    

    def add_deck(self, post_deck_request: PostDeckRequest): 
        try:
            new_deck = self.service.add_deck(post_deck_request)
            return {"status": 'succes', 'Deck': new_deck}, HttpStatus.OK
        
        except DeckSerializationException as e:
            return {'status': 'error', 'message': str(e)}, HttpStatus.INTERAL_SERVER_ERROR
        
        except Exception as e:
            return {"status": "error", "message": "An unexpected error occurred"}, HttpStatus.INTERAL_SERVER_ERROR