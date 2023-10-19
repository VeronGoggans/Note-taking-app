import os 
from backend.src.service.enums.responseMessages import RespMsg
from backend.src.service.fileOperations.JsonOperations import Json
from backend.src.service.idGenerators.idGenerator import IdGenerator
from backend.src.domains.projectDomain.boardTask import BoardTask
from backend.src.requestClasses.BoardTaskRequest import BoardTaskRequest

class ProjectTaskData():
    def __init__(self) -> None:
        self.projects_path = os.getcwd() + '/storage/json/projects.json'

    def add_task(self, project_id: int, task_data: BoardTaskRequest):
        data = Json.load_json_file(self.projects_path)
        task: BoardTask = self.__create_task_object(task_data)
        for project in data['projects']:
            if project['id'] == project_id:
                project[task.get_board_section()].append(task.__dict__)
                Json.update_json_file(self.projects_path, data)
                return RespMsg.OK
        return RespMsg.NOT_FOUND


    def get_tasks(self):
        pass

    def update_task(self):
        pass

    def delete_task(self, project_id: int, task_id: int, board_section: str):
        data = Json.load_json_file(self.projects_path)
        for project in data['projects']:
            if project['id'] == project_id:
                for task in project[board_section]:
                    if task['id'] == task_id:
                        project[board_section].remove(task)
                        Json.update_json_file(self.projects_path, data)
                        return RespMsg.OK
                return RespMsg.NOT_FOUND
        return RespMsg.NOT_FOUND   
                



    def __create_task_object(self, task_data: BoardTaskRequest):
        id = IdGenerator.ID('boardTask')
        return BoardTask(
            id, task_data.name, 
            task_data.description,
            task_data.estimated_time,
            task_data.due_date,
            task_data.priority,
            task_data.board_section
            )
