from fastapi import APIRouter
from src.backend.application.note_service import NoteService
from src.backend.data.note.note_manager import NoteManager
from src.backend.presentation.request_bodies.note.post_note_request import PostNoteRequest
from src.backend.presentation.request_bodies.note.put_note_request import PutNoteRequest
from src.backend.presentation.request_bodies.note.move_note_request import MoveNoteRequest
from src.backend.presentation.http_status import HttpStatus


class NoteRouter:
    def __init__(self, json_manager):
        self.route = APIRouter()
        self.note_service = NoteService(NoteManager(), json_manager)

        self.route.add_api_route('/notes/{folder_id}', self.get_notes, methods=['GET'])
        self.route.add_api_route('/noteById/{note_id}', self.get_note_by_id, methods=['GET'])
        self.route.add_api_route('/noteSearchObjects', self.get_note_name_id, methods=['GET'])
        self.route.add_api_route('/favorites', self.get_favorite_notes, methods=['GET'])
        self.route.add_api_route('/cache', self.cache, methods=['GET'])
        self.route.add_api_route('/note', self.add_note, methods=['POST'])
        self.route.add_api_route('/note/{note_id}', self.delete_note, methods=['DELETE'])
        self.route.add_api_route('/note', self.update_note, methods=['PUT'])
        self.route.add_api_route('/moveNote', self.move_note, methods=['PUT'])


    # This endpoint is for testing only.
    def cache(self):
        response = self.note_service.get_cache()

        if response != HttpStatus.INTERAL_SERVER_ERROR:
            return {'HttpStatus_code': HttpStatus.OK, "Cache-content": response}
        return {'HttpStatus_code': response}


    def get_notes(self, folder_id: str):
        response = self.note_service.get_notes(folder_id)

        if response != HttpStatus.NOT_FOUND:
            return {'HttpStatus_code': HttpStatus.OK, "Note": response}
        return {'HttpStatus_code': response}


    def get_note_by_id(self, note_id: str):
        response = self.note_service.get_note_by_id(note_id)

        if response != HttpStatus.NOT_FOUND:
            return {'HttpStatus_code': HttpStatus.OK, 'Note': response[0], 'Folder_id': response[1], 'Folder_name': response[2]}
        return {'HttpStatus_code': HttpStatus.NOT_FOUND}
    

    def get_note_name_id(self):
        response = self.note_service.get_search_options()

        if response != HttpStatus.INTERAL_SERVER_ERROR:
            return {'HttpStatus_code': HttpStatus.OK, 'Notes': response}
        return {'HttpStatus_code': HttpStatus.INTERAL_SERVER_ERROR}
    

    def get_favorite_notes(self):
        favorites = self.note_service.get_favorite_notes()

        if favorites != HttpStatus.NO_CONTENT:
            return {'HttpStatus_code': HttpStatus.OK, 'Notes': favorites}
        return {'HttpStatus_code': HttpStatus.NO_CONTENT, 'Notes': []}


    def add_note(self, post_request: PostNoteRequest):
        response = self.note_service.add_note(post_request)

        if response != HttpStatus.NOT_FOUND:
            return {'HttpStatus_code': HttpStatus.OK, "Note": response}
        return {'HttpStatus_code': response}


    def delete_note(self, note_id: str ):
        response = self.note_service.delete_note(note_id)

        if response != HttpStatus.NOT_FOUND:
            return {'HttpStatus_code': HttpStatus.OK, 'Note': response}
        return {'HttpStatus_code': HttpStatus.NOT_FOUND}


    def update_note(self, put_request: PutNoteRequest):
        response = self.note_service.update_note(put_request)

        if response != HttpStatus.NOT_FOUND:
            return {'HttpStatus_code': HttpStatus.OK, "Note": response}
        return {'HttpStatus_code': HttpStatus.NOT_FOUND}
    

    def move_note(self, mover_request: MoveNoteRequest):
        response = self.note_service.move_note(mover_request)

        if response != HttpStatus.NOT_FOUND:
            return {'HttpStatus_code': HttpStatus.OK, "Note": response}
        return {'HttpStatus_code': HttpStatus.NOT_FOUND}