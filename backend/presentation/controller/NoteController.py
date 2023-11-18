from fastapi import APIRouter
from backend.service.serviceClasses.NoteService import NoteService
from backend.data.note.NoteData1 import NoteData1
from backend.data.note.NoteData2 import NoteData2
from backend.presentation.requestBodies.NoteRequest import NoteRequest
from backend.domain.enums.responseMessages import RespMsg

route = APIRouter()
note_service = NoteService(NoteData1(), NoteData2())


@route.get("/directory/notes/{dir_id}/{note_type}")
def notes(dir_id: int, note_type: str):
    response = note_service.get_notes(dir_id, note_type)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.get('/directory/noteById/{note_id}')
def note_by_id(note_id: int):
    response = note_service.get_note_by_id(note_id)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.post('/directory/note/{dir_id}')
def note(dir_id: int, note: NoteRequest):  
    response = note_service.add_note(dir_id, note)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.delete('/directory/note/{note_id}')
def note(note_id: int):
    response = note_service.delete_note(note_id)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.put('/directory/note/{note_id}')
def note(note_id: int, note: NoteRequest):
    response = note_service.update_note(note_id, note)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.get("/subdirectory/notes/{dir_id}/{note_type}")
def notes(dir_id: int, note_type: str):
    response = note_service.get_notes(dir_id, note_type, False)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.get('/subdirectory/noteById/{note_id}')
def note_by_id(note_id: int):
    response = note_service.get_note_by_id(note_id, False)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.post('/subdirectory/note/{dir_id}')
def note(dir_id: int, note: NoteRequest):  
    response = note_service.add_note(dir_id, note, False)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.delete('/subdirectory/note/{note_id}')
def note(note_id: int):
    response = note_service.delete_note(note_id, False)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.put('/subdirectory/note/{note_id}')
def note(note_id: int, note: NoteRequest):
    response = note_service.update_note(note_id, note, False)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}