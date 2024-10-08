from fastapi import APIRouter
from src.backend.application.note_service import NoteService
from src.backend.data.note.note_manager import NoteManager
from src.backend.presentation.request_bodies.note_requests import *
from src.backend.presentation.http_status import HttpStatus
from src.backend.data.exceptions.exception_handler import handle_exceptions



class NoteRouter:
    def __init__(self, json_manager):
        self.route = APIRouter()
        self.service = NoteService(NoteManager(), json_manager)

        self.route.add_api_route('/note', self.add_note, methods=['POST'])
        self.route.add_api_route('/notes/{folder_id}', self.get_notes, methods=['GET'])
        self.route.add_api_route('/noteById/{note_id}', self.get_note_by_id, methods=['GET'])
        self.route.add_api_route('/noteSearchItems', self.get_search_items, methods=['GET'])
        self.route.add_api_route('/recentNotes', self.get_recent_notes, methods=['GET'])
        self.route.add_api_route('/cache', self.cache, methods=['GET'])
        self.route.add_api_route('/note', self.update_note, methods=['PUT'])
        self.route.add_api_route('/moveNote', self.move_note, methods=['PUT'])
        self.route.add_api_route('/note/{note_id}', self.delete_note, methods=['DELETE'])
        

    
       

    def cache(self):
        response = self.service.get_cache()

        if response != HttpStatus.INTERAL_SERVER_ERROR:
            return {'HttpStatus_code': HttpStatus.OK, "Cache-content": response}
        return {'HttpStatus_code': response}


    @handle_exceptions
    def add_note(self, request: PostNoteRequest):
        return {'status': HttpStatus.OK, 'note': self.service.add_note(request)}


    @handle_exceptions
    def get_notes(self, folder_id: str):
        return {'status': HttpStatus.OK, 'notes': self.service.get_notes(folder_id)}
       

    @handle_exceptions
    def get_note_by_id(self, note_id: str):
        note_location, note = self.service.get_note_by_id(note_id)
        return {'status': HttpStatus.OK, 'note': note, 'location': note_location}


    @handle_exceptions
    def get_search_items(self):
        return {'status': HttpStatus.OK, 'notes': self.service.get_search_options()}
        

    @handle_exceptions
    def get_recent_notes(self):
        return {'status': HttpStatus.OK, 'notes': self.service.get_recent_notes()}
    

    @handle_exceptions
    def update_note(self, request: PutNoteRequest):
        return {'status': HttpStatus.OK, 'note': self.service.update_note(request)}


    @handle_exceptions
    def move_note(self, request: MoveNoteRequest):
        return {'status': HttpStatus.OK, 'note': self.service.move_note(request.folder_id, request.note_id)}


    @handle_exceptions
    def delete_note(self, note_id: str ):
        return {'status': HttpStatus.OK, 'note': self.service.delete_note(note_id)}