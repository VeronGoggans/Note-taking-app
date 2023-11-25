from fastapi import APIRouter
from backend.application.service.domain.note_service import NoteService
from backend.data.note.note_manager import NoteManager
from backend.presentation.request_bodies.note_request import NoteRequest
from backend.domain.enums.responseMessages import RespMsg

route = APIRouter()
note_service = NoteService(NoteManager())

# NOTE Maybe add a path variable that indicates folder or subfolder.
# NOTE Then I only need 5 endpoints instead of 10.

@route.get("/folder/notes/{folder_id}/{note_type}")
def notes(folder_id: int, note_type: str):
    response = note_service.get_notes(folder_id, note_type)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': response}


@route.get('/folder/noteById/{note_id}')
def note_by_id(note_id: int):
    response = note_service.get_note_by_id(note_id)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.post('/folder/note/{folder_id}')
def note(folder_id: int, note: NoteRequest):  
    response = note_service.add_note(folder_id, note)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': response}


@route.delete('/folder/note/{note_id}')
def note(note_id: int):
    response = note_service.delete_note(note_id)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.put('/folder/note/{note_id}')
def note(note_id: int, note: NoteRequest):
    response = note_service.update_note(note_id, note)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}