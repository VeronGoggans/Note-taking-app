from fastapi import APIRouter
from backend.data.noteData.DirectoryNoteData import DirectoryNoteData
from backend.requestClasses.NoteRequest import NoteRequest
from backend.domain.enums.responseMessages import RespMsg

route = APIRouter()
note_data = DirectoryNoteData()


@route.get("/directory/notes/{dir_id}/{note_type}")
def notes(dir_id: int, note_type: str):
    response = note_data.get_notes(dir_id, note_type)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.get('/directory/noteById/{note_id}')
def note_by_id(note_id: int):
    response = note_data.get_note_by_id(note_id)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.post('/note/{category_id}/{parent}')
def note(category_id: int, parent: bool, note_data: NoteRequest):  
    response = note_data.add_note(category_id, parent, note_data)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.delete('/note/{note_id}/{child_of_parent}')
def note(note_id: int, child_of_parent: bool):
    response = note_data.delete_note(note_id, child_of_parent)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.put('/directory/note/{note_id}')
def note(note_id: int, note: NoteRequest):
    response = note_data.update_note(note_id, note)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}