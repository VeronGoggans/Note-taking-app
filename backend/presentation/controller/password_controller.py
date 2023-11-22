from fastapi import APIRouter
from backend.application.service.util.password_service import PasswordService
from backend.data.password.folder_password_manager import FolderPasswordManager
from backend.data.password.subfolder_password_manager import SubfolderPasswordManager
from backend.data.password.note_password_manager import NotePasswordManager
from backend.presentation.request_bodies.password_request import PasswordRequest
from backend.domain.enums.entities import Entities
from backend.domain.enums.responseMessages import RespMsg

route = APIRouter()
password_service = PasswordService( NotePasswordManager(), FolderPasswordManager(), SubfolderPasswordManager() )
note = Entities.NOTE.value
folder = Entities.FOLDER.value
subfolder = Entities.SUBFOLDER.value


@route.post('/password/note/{folder_id}/{note_id}')
def password(folder_id: int, note_id: int, password_str: PasswordRequest):
    response = password_service.add_password(folder_id, password_str.password, note, note_id)

    if response != RespMsg.NOT_FOUND:
        return {'Status_code': response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.post('/password/folder/{folder_id}')
def password(folder_id: int, password_str: PasswordRequest):
    response = password_service.add_password(folder_id, password_str.password, folder)

    if response != RespMsg.NOT_FOUND:
        return {'Status_code': response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.post('/password/subfolder/{folder_id}/{subfolder_id}')
def password(folder_id: int, subfolder_id: int, password_str: PasswordRequest):
    response = password_service.add_password(folder_id, password_str.password, subfolder, subfolder_id)

    if response != RespMsg.NOT_FOUND:
        return {'Status_code': response}
    return {'Status_code': RespMsg.NOT_FOUND}