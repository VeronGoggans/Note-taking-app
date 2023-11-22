from fastapi import APIRouter
from backend.application.service.domain.note_service import NoteService
from backend.data.note.folder_note_manager import FolderNoteManager
from backend.data.note.subfolder_note_manager import SubFolderNoteManager
from backend.presentation.request_bodies.note_request import NoteRequest
from backend.domain.enums.responseMessages import RespMsg

route = APIRouter()
note_service = NoteService(FolderNoteManager(), SubFolderNoteManager())


@route.get("/folder/notes/{folder_id}/{note_type}")
def notes(folder_id: int, note_type: str):
    response = note_service.get_notes(folder_id, note_type)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}


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
    return {'Status_code': RespMsg.NOT_FOUND}


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


@route.get("/subfolder/notes/{folder_id}/{note_type}")
def notes(folder_id: int, note_type: str):
    response = note_service.get_notes(folder_id, note_type, False)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.get('/subfolder/noteById/{note_id}')
def note_by_id(note_id: int):
    response = note_service.get_note_by_id(note_id, False)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.post('/subfolder/note/{folder_id}')
def note(folder_id: int, note: NoteRequest):  
    response = note_service.add_note(folder_id, note, False)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.delete('/subfolder/note/{note_id}')
def note(note_id: int):
    response = note_service.delete_note(note_id, False)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.put('/subfolder/note/{note_id}')
def note(note_id: int, note: NoteRequest):
    response = note_service.update_note(note_id, note, False)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}