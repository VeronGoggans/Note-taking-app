from fastapi import APIRouter
from backend.src.requestClasses.ProjectRequest import ProjectRequest
from backend.src.requestClasses.get.ProjectByIdRequest import ProjectByIdRequest
from backend.src.service.dataClasses.ProjectData import ProjectData
from backend.src.service.enums.responseMessages import RespMsg

route = APIRouter()
project_data_class = ProjectData()

@route.get('/projects')
def project():
    response = project_data_class.get()
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, 'Objects': response}
    return {'Status_code': RespMsg.NOT_FOUND}

# NOTE 
# POST is only used so that I could give a list inside of a request body 
# which contains the relevant data of a project whished to be retrieved.
@route.post('/projectById/{project_id}')
def project_by_id(project_id: int, data: ProjectByIdRequest):
    response = project_data_class.get_by_id(project_id, data.relevant_data)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, 'Object': response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.post('/project')
def project(project_data: ProjectRequest):
    response = project_data_class.add(project_data.name, project_data.description)
    return {'Status_code': response['Status_code'], "Return_object": response['Object']}


@route.put('/project/{project_id}')
def project(project_id: int, project_data: ProjectRequest):
    response = project_data_class.update(project_id, project_data)
    return {'Status_code': response}


@route.delete('/project/{project_id}')
def project(project_id: int):
    response = project_data_class.delete(project_id)
    return {'Status_code': response}