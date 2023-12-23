from fastapi import APIRouter
from backend.application.service.domain.note_service import NoteService
from backend.data.note.note_manager import NoteManager
from backend.presentation.request_bodies.note.post_note_request import PostNoteRequest
from backend.presentation.request_bodies.note.put_note_request import PutNoteRequest
from backend.presentation.request_bodies.note.del_note_request import DeleteNoteRequest
from backend.domain.enums.responseMessages import RespMsg

route = APIRouter()
note_service = NoteService(NoteManager())


@route.get("/notes/{folder_id}/{note_type}")
def notes(folder_id: str, note_type: str):
    response = note_service.get_notes(folder_id, note_type)

    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': response}


@route.get('/noteById/{note_id}')
def note_by_id(note_id: str):
    response = note_service.get_note_by_id(note_id)

    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.post('/note')
def note(post_request: PostNoteRequest):  
    response = note_service.add_note(post_request)

    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': response}


@route.delete('/note')
def note(delete_request: DeleteNoteRequest):
    response = note_service.delete_note(delete_request)

    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, 'Note': response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.put('/note')
def note(put_request: PutNoteRequest):
    response = note_service.update_note(put_request)

    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Note": response}
    return {'Status_code': RespMsg.NOT_FOUND}