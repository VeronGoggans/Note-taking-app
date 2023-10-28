from fastapi import APIRouter
from backend.src.requestClasses.UserStoryRequest import UserStoryRequest
from backend.src.service.dataClasses.UserStoryData import UserStoryData
from backend.src.service.enums.responseMessages import RespMsg

route = APIRouter()
user_story_data = UserStoryData()

@route.get('/userStories/{project_id}')
def user_story(project_id: int):
    response = user_story_data.get(project_id)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Objects": response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.get('/userStoryById/{project_id}/{user_story_id}')
def user_story(project_id: int, user_story_id: int):
    response = user_story_data.get_by_id(project_id, user_story_id)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.post('/userStory/{project_id}')
def user_story(project_id: int, data: UserStoryRequest):
    response = user_story_data.add(project_id, data)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.put('/userStory/{project_id}/{user_story_id}')
def user_story(project_id: int, user_story_id: int, data: UserStoryRequest):
    response = user_story_data.update(project_id, user_story_id, data)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Object": response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.delete('/userStory/{project_id}/{user_story_id}')
def user_story(project_id: int, user_story_id: int):
    response = user_story_data.delete(project_id, user_story_id)
    return {'Status_code': response}