import os 
from backend.src.service.enums.responseMessages import RespMsg
from backend.src.service.fileOperations.JsonOperations import Json
from backend.src.service.idGenerators.idGenerator import IdGenerator
from backend.src.domains.projectDomain.project import Project
from backend.src.requestClasses.ProjectRequest import ProjectRequest

class ProjectData():
    def __init__(self):
        self.projects_path = os.getcwd() + '/storage/json/projects.json'

    def add_project(self, project_name: str, project_description: str):
        data = Json.load_json_file(self.projects_path)
        project = self.__construct_project_object(project_name, project_description)

        try:
            data['projects'].append(project.to_dict())
            Json.update_json_file(self.projects_path, data)
            return RespMsg.OK
        except Exception as e:
            return RespMsg.INTERAL_SERVER_ERROR


    def get_projects(self):
        data = Json.load_json_file(self.projects_path)
        return data['projects']
    

    def get_project_by_id(self, project_id: int):
        data = Json.load_json_file(self.projects_path)
        for project in data['projects']:
            if project['project_id'] == project_id:
                return project
        return RespMsg.PROJECT_404
    

    def update_project(self, id: int, updated_data: ProjectRequest):
        data = Json.load_json_file(self.projects_path)
        for project in data['projects']:
            if project['id'] == id:
                project['name'] = updated_data.name
                project['description'] = updated_data.description
                Json.update_json_file(self.projects_path, data)
                return RespMsg.OK
        return RespMsg.PROJECT_404
    

    def delete_project(self, project_id: int):
        data = Json.load_json_file(self.projects_path)
        for project in data['projects']:
            if project['project_id'] == project_id:
                data['projects'].remove(project)
                Json.update_json_file(self.projects_path, data)
                return RespMsg.OK
        return RespMsg.PROJECT_404
        

    def __construct_project_object(self, name: str, description: str):
        id = IdGenerator.ID("project")
        return Project(id, name, description)