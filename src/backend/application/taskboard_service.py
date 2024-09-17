from src.backend.data.taskboard.taskboard_manager import TaskboardManager
from src.backend.data.file.json_manager import JsonManager
from src.backend.domain.taskboad import Taskboard
from src.backend.presentation.request_bodies.taskboard_requests import *
from src.backend.data.exceptions.exceptions import *
from src.backend.util.paths import TASKBOARD_PATH, FOR_TASKBOARD

class TaskboardService:
    def __init__(self, manager: TaskboardManager, json_manager: JsonManager) -> None:
        self.manager = manager
        self.json_manager = json_manager

    def add_taskboard(self, name: str , description: str):
        taskboards = self.json_manager.load(TASKBOARD_PATH)
        new_id = self.json_manager.generate_id(FOR_TASKBOARD)
        taskboard_obj = Taskboard(new_id, name, description)

        try:
            taskboard = self.manager.add(taskboards, taskboard_obj)
            self.json_manager.update(TASKBOARD_PATH, taskboards)
            return taskboard
        except AdditionException as e:
            raise e 


    def get_taskboards(self) -> list[dict]:
        taskboards = self.json_manager.load(TASKBOARD_PATH)
        return self.manager.get(taskboards)
    

    def get_taskboard_by_id(self, id: str):
        taskboards = self.json_manager.load(TASKBOARD_PATH)
        return self.manager.get_by_id(taskboards, id)
    

    def update_taskboard(self, request: PutTaskboardRequest):
        taskboards = self.json_manager.load(TASKBOARD_PATH)

        try:
            self.manager.update(taskboards, request)
            self.json_manager.update(TASKBOARD_PATH, taskboards)
        except NotFoundException as e:
            raise e


    def delete_taskboard(self, taskboard_id: str):
        taskboards = self.json_manager.load(TASKBOARD_PATH)

        try:
            taskboard = self.manager.delete(taskboards, taskboard_id)
            self.json_manager.update(TASKBOARD_PATH, taskboards)
            return taskboard
        except NotFoundException as e:
            raise e
        
