from src.backend.data.taskboard.taskboard_manager import TaskboardManager
from src.backend.domain.taskboad import Taskboard
from src.backend.presentation.request_bodies.taskboard_requests import *
from src.backend.data.exceptions.exceptions import *
from src.backend.application.decorators.exceptions import check_for_null 


class TaskboardService:
    def __init__(self, manager: TaskboardManager) -> None:
        self.manager = manager

    def add_taskboard(self, name: str , description: str):
        taskboard = Taskboard(1, name, description)

        try:
            return self.manager.add(taskboard)
        except AdditionException as e:
            raise e 


    @check_for_null
    def get_taskboards(self) -> list[dict]:
        return self.manager.get()
    

    @check_for_null
    def get_taskboard_by_id(self, id: str):
        return self.manager.get_by_id(id)
        

    @check_for_null
    def update_taskboard(self, request: PutTaskboardRequest):
        self.manager.update(request)


    @check_for_null
    def delete_taskboard(self, taskboard_id: str):
        return self.manager.delete(taskboard_id)