from fastapi import APIRouter
from src.backend.presentation.http_status import HttpStatus
from src.backend.application.flashcard_service import FlashcardService
from src.backend.data.flashcard.flashcard_manager import FlashcardManager
from src.backend.data.exceptions.exceptions import NotFoundException, SerializationException
from src.backend.presentation.request_bodies.flashcard.flashcard_request import PostFlashcardsRequest, PostFlashcardRequest
from src.backend.presentation.dtos.flashcard.flashcard_dto import FlashcardDTO


class FlashcardRouter:
    def __init__(self, json_manager):
        self.route = APIRouter()
        self.service = FlashcardService(FlashcardManager(), json_manager)

        self.route.add_api_route('/flashcard', self.add_flashcards, methods=['POST'])
        self.route.add_api_route('/flashcard', self.update_flashcard, methods=['PUT'])
        self.route.add_api_route('/flashcard', self.delete_flashcard, methods=['DELETE'])

    
    def add_flashcards(self, request: PostFlashcardsRequest):
        try:
            flashcards = self.__request_to_dto(request.flashcards)
            self.service.add_flashcards(request.deck_id, flashcards)
            return {'status': 'succes'}, HttpStatus.OK
        except SerializationException as e:
            return {'status': 'error', 'message': str(e)}, HttpStatus.INTERAL_SERVER_ERROR
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NOT_FOUND
        

    def update_flashcard(self, request):
        try:
            flashcard = self.service.update_flashcard(request)
            return {'status': 'succes', "flashcard": flashcard}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NOT_FOUND
        

    def delete_flashcard(self, id: str):
        try:
            flashcard = self.service.delete_flashcard(id)
            return {'status': 'succes', "flashcard": flashcard}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NOT_FOUND
        
    
    def __request_to_dto(self, flashcards: list[PostFlashcardRequest]):
        return [FlashcardDTO(card.term, card.description) for card in flashcards]