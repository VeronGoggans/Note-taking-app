from fastapi import APIRouter
from backend.application.service.domain.subfolder_service import SubDirectoryService
from backend.data.subfolder.subfolder_manager import SubfolderManager
from backend.presentation.request_bodies.subfolder_request import SubfolderRequest
from backend.domain.enums.responseMessages import RespMsg

route = APIRouter()
subfolder_service = SubDirectoryService( subfolder_manager = SubfolderManager() )


@route.get('/subfolders/{folder_id}')
def subcategories(folder_id: int):
    response = subfolder_service.get_subfolders(folder_id)

    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}



@route.post('/subfolder/{folder_id}')
def subcategory(folder_id: int, subfolder: SubfolderRequest):
    response = subfolder_service.add_subfolder(folder_id, subfolder)

    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}



@route.put('/subfolder/{subfolder_id}')
def subcategory(subfolder_id: int, subfolder: SubfolderRequest):
    response = subfolder_service.update_subfolder(subfolder_id, subfolder)

    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}



@route.delete('/subfolder/{subfolder_id}')
def subcategory(subfolder_id: int):
    response = subfolder_service.delete_subfolder(subfolder_id)

    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}