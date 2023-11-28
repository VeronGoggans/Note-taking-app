from fastapi import APIRouter
from backend.data.folder.folder_manager import FolderManager
from backend.presentation.request_bodies.folder_request import FolderRequest
from backend.domain.enums.responseMessages import RespMsg
from backend.application.service.domain.folder_service import DirectoryService


route = APIRouter()
folder_service = DirectoryService( folder_manager = FolderManager() )


@route.get('/folders')
def directories():
    response = folder_service.get_folders()
    return {"Status_code": RespMsg.OK, "category_names": response}


@route.get('/folder/content')
def folder_content(folder_id: int, note_type: str):
    pass



@route.post('/folder')
def directory(folder: FolderRequest):
    response = folder_service.add_folder(folder)

    if response != RespMsg.INTERAL_SERVER_ERROR:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.INTERAL_SERVER_ERROR}



@route.put('/folder/{folder_id}')
def directory(folder_id: int, folder: FolderRequest):
    response = folder_service.update_directory(folder_id, folder)

    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}



@route.delete('/folder/{folder_id}')
def directory(folder_id: int):
    
    response = folder_service.delete_directory(folder_id)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': response}
    return {'Status_code': RespMsg.NOT_FOUND}