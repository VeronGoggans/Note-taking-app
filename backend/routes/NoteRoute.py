from fastapi import APIRouter
from backend.data.noteData.SubDirectoryNoteData import SubDirectoryNoteData
from backend.requestClasses.NoteRequest import NoteRequest
from backend.domain.enums.responseMessages import RespMsg

route = APIRouter()




@route.get("/notes/{dir_name}/{parent}/{rerender}/{note_type}")
def notes(category_name: str, parent: bool, rerender: bool, note_type: str):
    response = note_data.get_notes(category_name, parent, rerender, note_type)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.get('/noteById/{parent}/{id}')
def note_by_id(parent: bool, id: int):
    response = note_data.get_note_by_id(parent, id)
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


@route.put('/note/{note_id}/{parent}')
def note(note_id: int, parent: bool, note_data: NoteRequest):
    response = note_data.update_note(note_id, note_data)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}