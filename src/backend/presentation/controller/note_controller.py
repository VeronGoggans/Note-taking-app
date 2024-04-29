from fastapi import APIRouter
from src.backend.application.service.domain.note_service import NoteService
from src.backend.data.note.note_manager import NoteManager
from src.backend.presentation.request_bodies.note.post_note_request import PostNoteRequest
from src.backend.presentation.request_bodies.note.put_note_request import PutNoteRequest
from src.backend.presentation.request_bodies.note.del_note_request import DeleteNoteRequest
from src.backend.presentation.request_bodies.note.move_note_request import MoveNoteRequest
from src.backend.presentation.request_bodies.note.put_note_color_request import PutNoteColorRequest
from src.backend.presentation.request_bodies.note.export_note_request import ExportNoteRequest
from src.backend.domain.enums.exportStatus import ExportStatus
from src.backend.domain.enums.responseMessages import Status


class NoteRouter:
    def __init__(self, json_manager):
        self.route = APIRouter()
        self.note_service = NoteService(NoteManager(), json_manager)

        self.route.add_api_route('/notes/{folder_id}', self.notes, methods=['GET'])
        self.route.add_api_route('/noteById/{note_id}', self.note_by_id, methods=['GET'])
        self.route.add_api_route('/noteSearchObjects', self.note_name_id, methods=['GET'])
        self.route.add_api_route('/cache', self.cache, methods=['GET'])
        self.route.add_api_route('/note', self.create_note, methods=['POST'])
        self.route.add_api_route('/note', self.delete_note, methods=['DELETE'])
        self.route.add_api_route('/note', self.update_note, methods=['PUT'])
        self.route.add_api_route('/moveNote', self.move_note, methods=['PUT'])
        self.route.add_api_route('/noteColor', self.update_note_color, methods=['PUT'])


    # This endpoint is for testing only.
    def cache(self):
        response = self.note_service.get_cache()

        if response != Status.INTERAL_SERVER_ERROR:
            return {'Status_code': Status.OK, "Cache-content": response}
        return {'Status_code': response}


    def notes(self, folder_id: str):
        response = self.note_service.get_notes(folder_id)

        if response != Status.NOT_FOUND:
            return {'Status_code': Status.OK, "Note": response}
        return {'Status_code': response}


    def note_by_id(self, note_id: str):
        response = self.note_service.get_note_by_id(note_id)

        if response != Status.NOT_FOUND:
            return {'Status_code': Status.OK, 'Note': response[0], 'Folder_id': response[1], 'Folder_name': response[2]}
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
    
    
    def update_note_color(self, put_request: PutNoteColorRequest):
        response = self.note_service.update_note_color(put_request)

        if response != Status.NOT_FOUND:
            return {'Status_code': Status.OK, "Note": response}
        return {'Status_code': Status.NOT_FOUND}
    

    def move_note(self, mover_request: MoveNoteRequest):
        response = self.note_service.move_note(mover_request)

        if response != Status.NOT_FOUND:
            return {'Status_code': Status.OK, "Note": response}
        return {'Status_code': Status.NOT_FOUND}