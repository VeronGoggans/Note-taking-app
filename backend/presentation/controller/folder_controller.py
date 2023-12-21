from fastapi import APIRouter
from backend.data.folder.folder_manager import FolderManager
from backend.presentation.request_bodies.folder.post_folder_request import PostFolderRequest
from backend.presentation.request_bodies.folder.del_folder_request import DeleteFolderRequest
from backend.presentation.request_bodies.folder.put_folder_request import PutFolderRequest
from backend.domain.enums.responseMessages import RespMsg
from backend.application.service.domain.folder_service import FolderService


route = APIRouter()
folder_service = FolderService( folder_manager = FolderManager() )


@route.get('/folders')
def folders():
    response = folder_service.get_folders()
    return {"Status_code": RespMsg.OK, "folders": response}


@route.post('/folder')
def folder(folder: PostFolderRequest):
    response = folder_service.add_folder(folder)

    if response != RespMsg.INTERAL_SERVER_ERROR:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.INTERAL_SERVER_ERROR}



@route.put('/folder')
def folder(folder: PutFolderRequest):
    response = folder_service.update_folder(folder)

    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Folder": response}
    return {'Status_code': RespMsg.NOT_FOUND}



@route.delete('/folder/{folder_id}')
def folder(folder_id: str):
    
    response = folder_service.delete_folder(folder_id)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}