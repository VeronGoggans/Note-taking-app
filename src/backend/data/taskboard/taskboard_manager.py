from src.backend.domain.taskboad import Taskboard
from src.backend.presentation.request_bodies.taskboard_requests import *
from src.backend.data.exceptions.exceptions import AdditionException, NotFoundException


class TaskboardManager:    

    def add(self, taskboards: list, taskboard: Taskboard) -> (Taskboard | AdditionException):
        try:
            taskboards.append(taskboard.__dict__)
            return taskboard
        except Exception as e:
            raise AdditionException('An error occurred while adding the taskboard', errors={'exception': str(e)})


    def get(self, taskboards: list) -> list[dict]:
        return [
            {"id": taskboard['id'], 
             "name": taskboard['name'],
             "description": taskboard['description']
             } for taskboard in taskboards
        ]
    

    def get_by_id(self, taskboards: list, id: str) -> dict:
        for taskboard in taskboards:
            if taskboard['id'] == id:
                return taskboard
        raise NotFoundException(f'Taskboard with id: {id}, could not be found.')


    def update(self, taskboards: list, request: PutTaskboardRequest) -> (dict | NotFoundException):
        for taskboard in taskboards:
           if taskboard['id'] == request.id:
                self.__update_entity(taskboard, request)
        raise NotFoundException(f'Taskboard with id: {request.id}, could not be found.')
    

    def delete(self, taskboards: list, id: str) -> (dict | NotFoundException):
        for taskboard in taskboards:
            if taskboard['id'] == id:
                taskboards.remove(taskboard)
                return taskboard
        raise NotFoundException(f'Taskboard with id: {id}, could not be found.')    

    
    def __update_entity(self, current_taskboard: dict, updated_taskboard: PutTaskboardRequest) -> dict:
        current_taskboard['name'] = updated_taskboard.name
        current_taskboard['description'] = updated_taskboard.description
