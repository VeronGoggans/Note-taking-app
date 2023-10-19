import os 
from backend.src.service.enums.responseMessages import RespMsg
from backend.src.service.fileOperations.JsonOperations import Json
from backend.src.service.idGenerators.idGenerator import IdGenerator
from backend.src.domains.projectDomain.project import Project
from backend.src.requestClasses.ProjectRequest import ProjectRequest

class ProjectData():
    def __init__(self):
        self.projects_path = os.getcwd() + '/storage/json/projects.json'


    def add_project(self, project_name: str, project_description: str) -> RespMsg:
        """
        Add a new project to the collection of projects.

        Args:
            project_name (str): The name of the new project.
            project_description (str): The description of the new project.

        Returns:
            RespMsg: A response message indicating the outcome of the project creation. 
        """
        data = Json.load_json_file(self.projects_path)
        project = self.__construct_project_object(project_name, project_description)

        data['projects'].append(project.to_dict())
        Json.update_json_file(self.projects_path, data)
        return RespMsg.OK


    def get_projects(self) -> list[Project]:
        """
        Retrieve a list of all projects.

        Returns:
            List[Project]: A list of Project objects representing all available projects.
        """
        data = Json.load_json_file(self.projects_path)
        return data['projects']
    

    def get_project_by_id(self, project_id: int) -> [Project, RespMsg]:
        """
        Retrieve a project by its unique identifier.

        Args:
            project_id (int): The unique identifier of the project to retrieve.

        Returns:
            Union[Project, RespMsg]: The requested Project object if found, or a RespMsg indicating the outcome.
            Possible values for RespMsg include RespMsg.NOT_FOUND if the project is not found.
        """
        data = Json.load_json_file(self.projects_path)
        for project in data['projects']:
            if project['id'] == project_id:
                return project
        return RespMsg.NOT_FOUND
    

    def update_project(self, project_id: int, updated_data: ProjectRequest) -> RespMsg:
        """
        Update the details of an existing project.

        Args:
            id (int): The unique identifier of the project to update.
            updated_data (ProjectRequest): Updated project information.

        Returns:
            RespMsg: A response message indicating the outcome of the project update. Possible values include RespMsg.OK
            if the project is successfully updated or RespMsg.NOT_FOUND if the project is not found.
        """
        data = Json.load_json_file(self.projects_path)
        for project in data['projects']:
            if project['id'] == project_id:
                project['name'] = updated_data.name
                project['description'] = updated_data.description
                Json.update_json_file(self.projects_path, data)
                return RespMsg.OK
        return RespMsg.NOT_FOUND
    

    def delete_project(self, project_id: int) -> RespMsg:
        """
        Delete a project by its unique identifier.

        Args:
            project_id (int): The unique identifier of the project to delete.

        Returns:
            RespMsg: A response message indicating the outcome of the project deletion. Possible values include RespMsg.OK
            if the project is successfully deleted or RespMsg.NOT_FOUND if the project is not found.
        """
        data = Json.load_json_file(self.projects_path)
        for project in data['projects']:
            if project['id'] == project_id:
                data['projects'].remove(project)
                Json.update_json_file(self.projects_path, data)
                return RespMsg.OK
        return RespMsg.NOT_FOUND
        

    def __construct_project_object(self, name: str, description: str) -> Project:
        """
        Construct a Project object with the given name and description.

        Args:
            name (str): The name of the project.
            description (str): The description of the project.

        Returns:
            Project: A newly constructed Project object with the provided name and description.
        """
        id = IdGenerator.ID("project")
        return Project(id, name, description)