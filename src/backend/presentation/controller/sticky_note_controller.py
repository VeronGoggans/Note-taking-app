from fastapi import APIRouter
from src.backend.application.sticky_note_service import StickyNoteService
from src.backend.data.note.sticky_note_manager import StickyNoteManager
from src.backend.presentation.request_bodies.note_requests import PostStickyNoteRequest, PutStickyNoteRequest
from src.backend.presentation.dtos.note_dtos import PostStickyNoteDto, PutStickyNoteDto
from src.backend.presentation.http_status import HttpStatus
from src.backend.data.exceptions.exceptions import NotFoundException, AdditionException



class StickyNoteRouter:
    def __init__(self, json_manager):
        self.route = APIRouter()
        self.service = StickyNoteService(StickyNoteManager(), json_manager)

        self.route.add_api_route('/stickyNote', self.add_sticky_note, methods=['POST'])
        self.route.add_api_route('/stickyNotes', self.get_sticky_notes, methods=['GET'])
        self.route.add_api_route('/stickyNote', self.update_sticky_note, methods=['PUT'])
        self.route.add_api_route('/stickyNote/{id}', self.delete_sticky_note, methods=['DELETE'])
        

    def add_sticky_note(self, request: PostStickyNoteRequest):
        try:
            request_dto = PostStickyNoteDto(request.name, request.content)
            note = self.service.add_sticky_note(request_dto)
            return {'status': 'succes', 'stickyNote': note}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NOT_FOUND
        except AdditionException as e:
            return {'status': 'error', 'message': str(e)}, HttpStatus.INTERAL_SERVER_ERROR
       

    def get_sticky_notes(self):
        try:
            notes = self.service.get_sticky_notes()
            return {'status': 'succes', 'stickyNotes': notes}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NOT_FOUND
       

    def update_sticky_note(self, request: PutStickyNoteRequest):
        try:
            request_dto = PutStickyNoteDto(request.id, request.name, request.content)
            note = self.service.update_sticky_note(request_dto)
            return {'status': 'succes', 'stickyNote': note}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NOT_FOUND


    def delete_sticky_note(self, id: str ):
        try:
            note = self.service.delete_sticky_note(id)
            return {'status': 'succes', 'stickyNote': note}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NOT_FOUND