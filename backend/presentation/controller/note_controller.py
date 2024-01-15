from fastapi import APIRouter
from backend.application.service.domain.note_service import NoteService
from backend.data.note.note_manager import NoteManager
from backend.presentation.request_bodies.note.post_note_request import PostNoteRequest
from backend.presentation.request_bodies.note.put_note_request import PutNoteRequest
from backend.presentation.request_bodies.note.del_note_request import DeleteNoteRequest
from backend.domain.enums.responseMessages import Status


class NoteRouter:
    def __init__(self, json_manager):
        self.route = APIRouter()
        self.note_service = NoteService(NoteManager(), json_manager)

        self.route.add_api_route("/notes/{folder_id}", self.notes, methods=['GET'])
        self.route.add_api_route('/noteById/{note_id}', self.note_by_id, methods=['GET'])
        self.route.add_api_route('/noteSearchObjects', self.note_name_id, methods=['GET'])
        self.route.add_api_route('/note', self.create_note, methods=['POST'])
        self.route.add_api_route('/note', self.delete_note, methods=['DELETE'])
        self.route.add_api_route('/note', self.update_note, methods=['PUT'])
        self.route.add_api_route('/cache', self.cache, methods=['GET'])

    # This endpoint is for testing only.
    def cache(self):
        response = self.note_service.get_cache()

        if response != Status.INTERAL_SERVER_ERROR:
            return {'Status_code': Status.OK, "Cache-content": response}
        return {'Status_code': response}


    def notes(self, folder_id: str):
        response = self.note_service.get_notes(folder_id)

        if response != Status.NOT_FOUND:
            return {'Status_code': Status.OK, "Object": response}
        return {'Status_code': response}


    def note_by_id(self, note_id: str):
        response = self.note_service.get_note_by_id(note_id)

        if response != Status.NOT_FOUND:
            return {'Status_code': Status.OK, "Note": response}
        return {'Status_code': Status.NOT_FOUND}
    

    def note_name_id(self):
        response = self.note_service.get_search_options()

        if response != Status.INTERAL_SERVER_ERROR:
            return {'Status_code': Status.OK, 'Notes': response}
        return {'Status_code': Status.INTERAL_SERVER_ERROR}


    def create_note(self, post_request: PostNoteRequest):
        response = self.note_service.add_note(post_request)

        if response != Status.NOT_FOUND:
            return {'Status_code': Status.OK, "Note": response}
        return {'Status_code': response}


    def delete_note(self, delete_request: DeleteNoteRequest):
        response = self.note_service.delete_note(delete_request)

        if response != Status.NOT_FOUND:
            return {'Status_code': Status.OK, 'Note': response}
        return {'Status_code': Status.NOT_FOUND}


    def update_note(self, put_request: PutNoteRequest):
        response = self.note_service.update_note(put_request)

        if response != Status.NOT_FOUND:
            return {'Status_code': Status.OK, "Note": response}
        return {'Status_code': Status.NOT_FOUND}