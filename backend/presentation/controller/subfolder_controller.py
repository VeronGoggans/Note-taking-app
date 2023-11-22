from fastapi import APIRouter
from backend.service.serviceClasses.SubDirectoryService import SubDirectoryService
from backend.data.subfolder.subfolder_manager import SubfolderManager
from backend.presentation.requestBodies.SubDirectoryRequest import SubDirectoryRequest
from backend.domain.enums.responseMessages import RespMsg

route = APIRouter()
subfolder_service = SubDirectoryService( subfolder_manager = SubfolderManager() )


@route.get('/subfolders/{folder_id}')
def subcategories(folder_id: int):
    response = subfolder_service.get_subdirectories(folder_id)
    return {"Status_code": RespMsg.OK, "SubDirectoryNames": response}



@route.post('/subfolder/{folder_id}')
def subcategory(folder_id: int, subfolder: SubDirectoryRequest):
    response = subfolder_service.add_subdirectory(folder_id, subfolder)

    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}



@route.put('/subfolder/{subfolder_id}')
def subcategory(subfolder_id: int, subfolder: SubDirectoryRequest):
    response = subfolder_service.update_subdirectory(subfolder_id, subfolder)

    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}



@route.delete('/subfolder/{subfolder_id}')
def subcategory(subfolder_id: int):
    response = subfolder_service.delete_subdirectory(subfolder_id)

    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}