from fastapi import APIRouter
from backend.src.requestClasses.BoardTaskRequest import BoardTaskRequest
from backend.src.service.dataClasses.ProjectTaskData import ProjectTaskData
from backend.src.service.enums.responseMessages import RespMsg

route = APIRouter()
project_task_data_class = ProjectTaskData()

@route.get('/boardTask/{project_id}')
def board_task(project_id: int):
    response = project_task_data_class.get(project_id)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, 'Objects': response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.get('/boardTaskById/{project_id}/{task_id}')
def board_task(project_id: int, task_id: int):
    response = project_task_data_class.get_by_id(project_id, task_id)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, 'Object': response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.post('/boardTask/{project_id}')
def board_task(project_id: int, task_data: BoardTaskRequest):
    response = project_task_data_class.add(project_id, task_data)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, 'Object': response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.put('/boardTask/{project_id}/{task_id}')
def board_task(project_id: int, task_id: int, task_data: BoardTaskRequest):
    response = project_task_data_class.update(project_id, task_id, task_data)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, 'Object': response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.delete('/boardTask/{project_id}/{task_id}/{board_section}')
def board_task(project_id: int, task_id: int, board_section: str):
    response = project_task_data_class.delete(project_id, task_id, board_section)
    return {'Status_code': response}