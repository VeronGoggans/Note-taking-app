from fastapi import APIRouter
from backend.data.DirectoryData import DirectoryData
from backend.presentation.requestBodies.DirectoryRequest import DirectoryRequest
from backend.domain.enums.responseMessages import RespMsg


route = APIRouter()
dir_data = DirectoryData()


@route.get('/directories')
def directories():
    response = dir_data.get()
    return {"Status_code": RespMsg.OK, "category_names": response}



@route.post('/directory')
def directory(dir: DirectoryRequest):
    response = dir_data.add(dir)

    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}



@route.put('/directory/{dir_id}')
def directory(dir_id: int, dir: DirectoryRequest):
    response = dir_data.update(dir_id, dir.name)

    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}



@route.delete('/directory/{dir_id}')
def directory(dir_id: int):
    response = dir_data.delete(dir_id)

    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}