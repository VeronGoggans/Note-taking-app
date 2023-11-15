from fastapi import APIRouter
from backend.data.SubDirectoryData import SubDirectoryData
from backend.presentation.requestBodies.SubDirectoryRequest import SubDirectoryRequest
from backend.domain.enums.responseMessages import RespMsg

route = APIRouter()
sub_dir_data = SubDirectoryData()



@route.get('/subDirectories/{dir_name}')
def subcategories(dir_name: str):
    response = sub_dir_data.get(dir_name)
    return {"Status_code": RespMsg.OK, "SubDirectoryNames": response}



@route.post('/subDirectory/{dir_id}')
def subcategory(dir_id: int, request_data: SubDirectoryRequest):
    response = sub_dir_data.add(dir_id, request_data.name)

    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}



@route.put('/subDirectory/{sub_dir_id}/{sub_dir_name}')
def subcategory(sub_dir_id: int, sub_dir_name: str):
    response = sub_dir_data.update(sub_dir_id, sub_dir_name)

    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}



@route.delete('/subDirectory/{sub_dir_id}')
def subcategory(sub_dir_id: int):
    response = sub_dir_data.delete(sub_dir_id)

    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}