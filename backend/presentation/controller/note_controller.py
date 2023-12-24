from fastapi import APIRouter
from backend.application.service.domain.note_service import NoteService
from backend.data.note.note_manager import NoteManager
from backend.presentation.request_bodies.note.post_note_request import PostNoteRequest
from backend.presentation.request_bodies.note.put_note_request import PutNoteRequest
from backend.presentation.request_bodies.note.del_note_request import DeleteNoteRequest
from backend.domain.enums.responseMessages import RespMsg


class NoteRouter:
    def __init__(self, json_manager):
        self.route = APIRouter()
        self.note_service = NoteService(NoteManager(), json_manager)

        self.route.add_api_route("/notes/{folder_id}/{note_type}", self.notes, methods=['GET'])
        self.route.add_api_route('/noteById/{note_id}', self.note_by_id, methods=['GET'])
        self.route.add_api_route('/note', self.create_note, methods=['POST'])
        self.route.add_api_route('/note', self.delete_note, methods=['DELETE'])
        self.route.add_api_route('/note', self.update_note, methods=['PUT'])


    def notes(self, folder_id: str, note_type: str):
        response = self.note_service.get_notes(folder_id, note_type)

        if response != RespMsg.NOT_FOUND:
            return {'Status_code': RespMsg.OK, "Object": response}
        return {'Status_code': response}


    def note_by_id(self, note_id: str):
        response = self.note_service.get_note_by_id(note_id)

        if response != RespMsg.NOT_FOUND:
            return {'Status_code': RespMsg.OK, "Object": response}
        return {'Status_code': RespMsg.NOT_FOUND}


    def create_note(self, post_request: PostNoteRequest):
        response = self.note_service.add_note(post_request)

        if response != RespMsg.NOT_FOUND:
            return {'Status_code': RespMsg.OK, "Object": response}
        return {'Status_code': response}


    def delete_note(self, delete_request: DeleteNoteRequest):
        response = self.note_service.delete_note(delete_request)

        if response != RespMsg.NOT_FOUND:
            return {'Status_code': RespMsg.OK, 'Note': response}
        return {'Status_code': RespMsg.NOT_FOUND}


    def update_note(self, put_request: PutNoteRequest):
        response = self.note_service.update_note(put_request)

        if response != RespMsg.NOT_FOUND:
            return {'Status_code': RespMsg.OK, "Note": response}
        return {'Status_code': RespMsg.NOT_FOUND}