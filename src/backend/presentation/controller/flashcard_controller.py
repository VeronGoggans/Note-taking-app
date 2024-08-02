from fastapi import APIRouter
from src.backend.presentation.http_status import HttpStatus
from src.backend.application.flashcard_service import FlashcardService
from src.backend.data.flashcard.flashcard_manager import FlashcardManager
from src.backend.data.exceptions.exceptions import NotFoundException, SerializationException
from src.backend.presentation.request_bodies.flashcard_requests import PostFlashcardsRequest, PutFlashcardsRequest, DeleteFlashcardsRequest
from src.backend.presentation.dtos.flashcard_dtos import PostFlashcardDTO, FlashcardDTO


class FlashcardRouter:
    def __init__(self, json_manager):
        self.route = APIRouter()
        self.service = FlashcardService(FlashcardManager(), json_manager)

        self.route.add_api_route('/flashcard', self.add_flashcards, methods=['POST'])
        self.route.add_api_route('/flashcard', self.update_flashcards, methods=['PUT'])
        self.route.add_api_route('/flashcard', self.delete_flashcards, methods=['DELETE'])

    
    def add_flashcards(self, request: PostFlashcardsRequest):
        try:
            flashcards = self.__request_to_dto('add', request.flashcards)
            self.service.add_flashcards(request.deck_id, flashcards)
            return {'status': 'succes'}, HttpStatus.OK
        except SerializationException as e:
            return {'status': 'error', 'message': str(e)}, HttpStatus.INTERAL_SERVER_ERROR
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NOT_FOUND
        

    def update_flashcards(self, request: PutFlashcardsRequest):
        try:
            flashcards = self.__request_to_dto('update', request.flashcards)
            flashcard = self.service.update_flashcards(request.deck_id, flashcards)
            return {'status': 'succes', "flashcard": flashcard}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NOT_FOUND
        

    def delete_flashcards(self, request: DeleteFlashcardsRequest):
        try:
            flashcard = self.service.delete_flashcards(request.deck_id, request.flashcard_ids)
            return {'status': 'succes', "flashcard": flashcard}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NOT_FOUND
        
    
    def __request_to_dto(self, 
        action: str, 
        new_flashcards: list[PostFlashcardDTO] = None, 
        updated_flashcards: list[FlashcardDTO] = None
        ):

        if action == 'add':
            return [PostFlashcardDTO(card.term, card.description) for card in new_flashcards]
        elif action == 'update':
            return [FlashcardDTO(card.id, card.term, card.description, card.rating) for card in updated_flashcards]