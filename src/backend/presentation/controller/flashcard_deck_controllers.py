from fastapi import APIRouter
from src.backend.presentation.http_status import HttpStatus
from src.backend.application.flashcard_deck_service import FlashcardDeckService
from src.backend.data.flashcard.flashcard_deck_manager import FlashcardDeckManager
from src.backend.presentation.request_bodies.flashcard_requests import PostDeckRequest, PutDeckRequest
from src.backend.presentation.request_bodies.flashcard_requests import PostFlashcardRequest
from src.backend.presentation.dtos.flashcard_dtos import PostFlashcardDTO
from src.backend.data.exceptions.exceptions import SerializationException, NotFoundException, DeserializationException


class FlashcardDeckRouter:
    def __init__(self, json_manager):
        self.route = APIRouter()
        self.service = FlashcardDeckService(FlashcardDeckManager(), json_manager)

        self.route.add_api_route('/deck/{id}', self.get_deck_by_id, methods=['GET'])
        self.route.add_api_route('/deckSearchItems', self.get_search_items, methods=['GET'])
        self.route.add_api_route('/decks', self.get_all_decks, methods=['GET'])
        self.route.add_api_route('/deck', self.add_deck, methods=['POST'])
        self.route.add_api_route('/deck', self.update_deck, methods=['PUT'])
        self.route.add_api_route('/deck/{id}', self.delete_deck, methods=['DELETE'])


    def add_deck(self, request: PostDeckRequest): 
        try:
            flashcards = self.__request_to_dto(request.flashcards)
            new_deck = self.service.add_deck(request.name, flashcards)
            return {"status": 'succes', 'deck': new_deck}, HttpStatus.OK
        except SerializationException as e:
            return {'status': 'error', 'message': str(e)}, HttpStatus.INTERAL_SERVER_ERROR
        except Exception as e:
            return {"status": "error", "message": "An unexpected error occurred"}, HttpStatus.INTERAL_SERVER_ERROR


    def get_deck_by_id(self, id: str):
        try:
            deck = self.service.get_deck_by_id(id)
            return {'status': 'succes', "deck": deck}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', "message": str(e)}, HttpStatus.NOT_FOUND
        except DeserializationException as e:
            return {'status': 'error', 'message': str(e)}, HttpStatus.INTERAL_SERVER_ERROR
        
    
    def get_all_decks(self):
        try:
            all_decks, misc = self.service.get_all_decks()
            return {'status': 'succes', 'decks': all_decks, 'misc': misc}, HttpStatus.OK
        except DeserializationException as e:
            return {'status': 'error', 'message': str(e)}, HttpStatus.INTERAL_SERVER_ERROR
        
    
    def get_search_items(self):
        try:
            search_items = self.service.get_search_items()
            return {'status': 'succes', 'items': search_items}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NO_CONTENT
        

    def update_deck(self, request: PutDeckRequest):
        try:
            self.service.update_deck(request)
            return {'status': 'succes'}, HttpStatus.OK
        except Exception as e:
            return {'status': 'error', 'message': str(e)}
        

    def delete_deck(self, id: str):
        try:
            deck = self.service.delete_deck(id)
            return {"status": 'succes', 'deck': deck}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', "message": str(e)}, HttpStatus.NOT_FOUND
        

    def __request_to_dto(self, flashcards: list[PostFlashcardRequest]):
        return [PostFlashcardDTO(card.term, card.description) for card in flashcards]