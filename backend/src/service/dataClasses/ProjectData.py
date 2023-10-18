import os 
from backend.src.service.enums.responseMessages import RespMsg
from backend.src.service.fileOperations.JsonOperations import Json
from backend.src.service.idGenerators.idGenerator import IdGenerator
from backend.src.domains.projectDomain.project import Project



class ProjectData():
    def __init__(self):
        self.projects_relative_path = os.getcwd() + '/storage/json/projects.json'

    def add_project(self, project_name: str):
        data = Json.load_json_file(self.projects_relative_path)
        project = self.__construct_project_object(project_name)

        try:
            data['projects'].append(project.to_dict())
            Json.update_json_file(self.projects_relative_path, data)
            return RespMsg.OK
        except Exception as e:
            return RespMsg.INTERAL_SERVER_ERROR

    def get_projects():
        pass

    def get_project_by_id():
        pass

    def update_project():
        pass

    def delete_project():
        pass

    def __construct_project_object(self, project_name: str):
        project_id = IdGenerator.ID("project")
        return Project(project_id, project_name)