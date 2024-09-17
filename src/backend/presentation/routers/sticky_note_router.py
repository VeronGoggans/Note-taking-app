from fastapi import APIRouter
from src.backend.application.sticky_note_service import StickyNoteService
from src.backend.data.note.sticky_note_manager import StickyNoteManager
from src.backend.presentation.request_bodies.note_requests import PostStickyNoteRequest, PutStickyNoteRequest
from src.backend.presentation.http_status import HttpStatus
from src.backend.data.exceptions.exception_handler import handle_exceptions



class StickyNoteRouter:
    def __init__(self, json_manager):
        self.route = APIRouter()
        self.service = StickyNoteService(StickyNoteManager(), json_manager)

        self.route.add_api_route('/stickyNote', self.add_sticky_note, methods=['POST'])
        self.route.add_api_route('/stickyNotes', self.get_sticky_notes, methods=['GET'])
        self.route.add_api_route('/stickyNote', self.update_sticky_note, methods=['PUT'])
        self.route.add_api_route('/stickyNote/{id}', self.delete_sticky_note, methods=['DELETE'])
        

    @handle_exceptions
    def add_sticky_note(self, request: PostStickyNoteRequest):
        return {'status': HttpStatus.OK, 'stickyNote': self.service.add_sticky_note(request)}
       

    @handle_exceptions
    def get_sticky_notes(self):
        return {'status': HttpStatus.OK, 'stickyNotes': self.service.get_sticky_notes()}
       

    @handle_exceptions
    def update_sticky_note(self, request: PutStickyNoteRequest):
        return {'status': HttpStatus.OK, 'stickyNote': self.service.update_sticky_note(request)}
    

    @handle_exceptions
    def delete_sticky_note(self, id: str ):
        return {'status': HttpStatus.OK, 'stickyNote': self.service.delete_sticky_note(id)}