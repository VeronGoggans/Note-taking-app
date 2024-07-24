from fastapi import APIRouter
from src.backend.application.note_service import NoteService
from src.backend.data.note.note_manager import NoteManager
from src.backend.presentation.request_bodies.note.post_note_request import PostNoteRequest
from src.backend.presentation.request_bodies.note.put_note_request import PutNoteRequest
from src.backend.presentation.request_bodies.note.move_note_request import MoveNoteRequest
from src.backend.presentation.http_status import HttpStatus
from src.backend.data.exceptions.exceptions import NotFoundException, AdditionException



class NoteRouter:
    def __init__(self, json_manager):
        self.route = APIRouter()
        self.service = NoteService(NoteManager(), json_manager)

        self.route.add_api_route('/note', self.add_note, methods=['POST'])
        self.route.add_api_route('/notes/{folder_id}', self.get_notes, methods=['GET'])
        self.route.add_api_route('/noteById/{note_id}', self.get_note_by_id, methods=['GET'])
        self.route.add_api_route('/noteSearchObjects', self.get_note_name_id, methods=['GET'])
        self.route.add_api_route('/cache', self.cache, methods=['GET'])
        self.route.add_api_route('/note', self.update_note, methods=['PUT'])
        self.route.add_api_route('/moveNote', self.move_note, methods=['PUT'])
        self.route.add_api_route('/note/{note_id}', self.delete_note, methods=['DELETE'])
        

    def add_note(self, post_request: PostNoteRequest):
        try:
            note = self.service.add_note(post_request)
            return {'status': 'succes', 'note': note}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NOT_FOUND
        except AdditionException as e:
            return {'status': 'error', 'message': str(e)}, HttpStatus.INTERAL_SERVER_ERROR
       

    def cache(self):
        response = self.service.get_cache()

        if response != HttpStatus.INTERAL_SERVER_ERROR:
            return {'HttpStatus_code': HttpStatus.OK, "Cache-content": response}
        return {'HttpStatus_code': response}


    def get_notes(self, folder_id: str):
        try:
            notes = self.service.get_notes(folder_id)
            return {'status': 'succes', 'notes': notes}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NOT_FOUND
       

    def get_note_by_id(self, note_id: str):
        try:
            note = self.service.get_note_by_id(note_id)
            return {'status': 'succes', 'note': note}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NOT_FOUND


    def get_note_name_id(self):
        try:
            notes = self.service.get_search_options()
            return {'status': 'succes', 'notes': notes}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NO_CONTENT
    

    def update_note(self, put_request: PutNoteRequest):
        try:
            note = self.service.update_note(put_request)
            return {'status': 'succes', 'note': note}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NOT_FOUND


    def move_note(self, mover_request: MoveNoteRequest):
        try:
            note = self.service.move_note(mover_request)
            return {'status': 'succes', 'note': note}, HttpStatus.OK
        except AdditionException as e:
            return {'status': 'error', 'message': str(e)}, HttpStatus.INTERAL_SERVER_ERROR
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NOT_FOUND


    def delete_note(self, note_id: str ):
        try:
            note = self.service.delete_note(note_id)
            return {'status': 'succes', 'note': note}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NOT_FOUND