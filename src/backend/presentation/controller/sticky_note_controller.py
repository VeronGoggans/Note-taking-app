from fastapi import APIRouter
from src.backend.application.sticky_note_service import StickyNoteService
from src.backend.data.note.sticky_note_manager import StickyNoteManager
from src.backend.presentation.request_bodies.note_requests import PostStickyNoteRequest, PutStickyNoteRequest
from src.backend.presentation.dtos.note_dtos import PostStickyNoteDto, PutStickyNoteDto
from src.backend.presentation.http_status import HttpStatus
from src.backend.presentation.decorators.controller_decorators import exception_handler



class StickyNoteRouter:
    def __init__(self, json_manager):
        self.route = APIRouter()
        self.service = StickyNoteService(StickyNoteManager(), json_manager)

        self.route.add_api_route('/stickyNote', self.add_sticky_note, methods=['POST'])
        self.route.add_api_route('/stickyNotes', self.get_sticky_notes, methods=['GET'])
        self.route.add_api_route('/stickyNote', self.update_sticky_note, methods=['PUT'])
        self.route.add_api_route('/stickyNote/{id}', self.delete_sticky_note, methods=['DELETE'])
        

    @exception_handler
    def add_sticky_note(self, request: PostStickyNoteRequest):
        request_dto = PostStickyNoteDto(request.name, request.content)
        note = self.service.add_sticky_note(request_dto)
        return {'status': 'succes', 'stickyNote': note}, HttpStatus.OK
       

    @exception_handler
    def get_sticky_notes(self):
        notes = self.service.get_sticky_notes()
        return {'status': 'succes', 'stickyNotes': notes}, HttpStatus.OK
       

    @exception_handler
    def update_sticky_note(self, request: PutStickyNoteRequest):
        request_dto = PutStickyNoteDto(request.id, request.name, request.content)
        note = self.service.update_sticky_note(request_dto)
        return {'status': 'succes', 'stickyNote': note}, HttpStatus.OK
    

    @exception_handler
    def delete_sticky_note(self, id: str ):
        note = self.service.delete_sticky_note(id)
        return {'status': 'succes', 'stickyNote': note}, HttpStatus.OK