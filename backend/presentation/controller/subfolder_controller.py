from fastapi import APIRouter
from backend.application.service.domain.subfolder_service import SubfolderService
from backend.data.subfolder.subfolder_manager import SubfolderManager
from backend.presentation.request_bodies.subfolder.post_subfolder_request import PostSubfolderRequest
from backend.presentation.request_bodies.subfolder.put_subfolder_request import PutSubfolderRequest
from backend.presentation.request_bodies.subfolder.del_subfolder_request import DeleteSubfolderRequest
from backend.domain.enums.responseMessages import RespMsg

route = APIRouter()
subfolder_service = SubfolderService( subfolder_manager = SubfolderManager() )


@route.get('/subfolders/{folder_id}')
def subfolders(folder_id: str):
    response = subfolder_service.get_subfolders(folder_id)

    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}



@route.post('/subfolder')
def subfolder(subfolder: PostSubfolderRequest):
    response = subfolder_service.add_subfolder(subfolder)

    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}



@route.put('/subfolder')
def subfolder(update_request: PutSubfolderRequest):
    response = subfolder_service.update_subfolder(update_request)

    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}



@route.delete('/subfolder')
def subfolder(delete_request: DeleteSubfolderRequest):
    response = subfolder_service.delete_subfolder(delete_request)

    if response != RespMsg.NOT_FOUND:
        return {'Status_code': response}
    return {'Status_code': RespMsg.NOT_FOUND}