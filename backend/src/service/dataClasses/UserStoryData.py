import os
from backend.src.service.fileOperations.JsonOperations import Json

class UserStoryData():
    def __init__(self):
        self.projects_path = os.getcwd() + '/storage/json/projects.json'

    def add_user_story(self):
        data = Json.load_json_file(self.projects_path)

        pass

    def get_user_stories(self):
        data = Json.load_json_file(self.projects_path)
        pass

    def get_user_story_by_id(self):
        data = Json.load_json_file(self.projects_path)
        pass

    def update_user_story(self):
        data = Json.load_json_file(self.projects_path)
        pass

    def delete_user_story(self):
        data = Json.load_json_file(self.projects_path)
        pass