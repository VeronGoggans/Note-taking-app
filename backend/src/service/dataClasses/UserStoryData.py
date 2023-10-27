import os
from backend.src.service.fileOperations.JsonOperations import Json
from backend.src.requestClasses.UserStoryRequest import UserStoryRequest
from backend.src.domains.projectDomain.UserStory import UserStory
from backend.src.service.idGenerators.idGenerator import IdGenerator
from backend.src.service.enums.responseMessages import RespMsg

class UserStoryData():
    def __init__(self):
        self.projects_path = os.getcwd() + '/storage/json/projects.json'


    def add(self, project_id: int, user_story_data: UserStoryRequest) -> [UserStory, RespMsg]:
        data = Json.load_json_file(self.projects_path)
        user_story: UserStory = self.__construct_user_story_object(user_story_data)

        for project in data['projects']:
            if project['id'] == project_id:
                project['user_stories'].append(user_story.__dict__)
                Json.update_json_file(self.projects_path, data)
                return user_story
        return RespMsg.NOT_FOUND
        

    def get(self):
        data = Json.load_json_file(self.projects_path)
        pass

    def get_by_id(self):
        data = Json.load_json_file(self.projects_path)
        pass

    def update(self):
        data = Json.load_json_file(self.projects_path)
        pass

    def delete(self):
        data = Json.load_json_file(self.projects_path)
        pass


    def __construct_user_story_object(self, user_story_data: UserStoryRequest):
        id = IdGenerator.ID('userStory')
        return UserStory(
            id, 
            user_story_data.name,
            user_story_data.priority,
            user_story_data.estimated_time,
            user_story_data.as_a_description,
            user_story_data.i_want_description,
            user_story_data.so_that_description)