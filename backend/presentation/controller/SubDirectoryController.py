from fastapi import APIRouter
from backend.service.serviceClasses.SubDirectoryService import SubDirectoryService
from backend.data.subDirectory.SubDirectoryData import SubDirectoryData
from backend.presentation.requestBodies.SubDirectoryRequest import SubDirectoryRequest
from backend.domain.enums.responseMessages import RespMsg

route = APIRouter()
sub_dir_service = SubDirectoryService( sub_dir_data = SubDirectoryData() )


@route.get('/subDirectories/{dir_name}')
def subcategories(dir_id: int):
    response = sub_dir_service.get_subdirectories(dir_id)
    return {"Status_code": RespMsg.OK, "SubDirectoryNames": response}



@route.post('/subDirectory/{dir_id}')
def subcategory(dir_id: int, request_data: SubDirectoryRequest):
    response = sub_dir_service.add_subdirectory(dir_id, request_data)

    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}



@route.put('/subDirectory/{sub_dir_id}/{sub_dir_name}')
def subcategory(sub_dir_id: int, request_data: SubDirectoryRequest):
    response = sub_dir_service.update_subdirectory(sub_dir_id, request_data)

    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}



@route.delete('/subDirectory/{sub_dir_id}')
def subcategory(sub_dir_id: int):
    response = sub_dir_service.delete_subdirectory(sub_dir_id)

    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}