from src.backend.domain.taskboad import Taskboard
from src.backend.presentation.request_bodies.taskboard_requests import *
from src.backend.data.exceptions.exceptions import AdditionException, NotFoundException


class TaskboardManager:    

    def add(self, taskboard: Taskboard) -> (Taskboard | AdditionException):
        pass


    def get(self) -> list[dict]:
        pass
    

    def get_by_id(self, id: str) -> dict:
        pass

    def update(self, request: PutTaskboardRequest) -> (dict | NotFoundException):
        pass
    

    def delete(self, id: str) -> (dict | NotFoundException):
        pass    