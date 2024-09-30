from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.backend.data.database import Database
from src.backend.application.services.task_service import TaskService
from src.backend.data.managers.task_manager import TaskManager
from src.backend.presentation.request_bodies.taskboard_requests import PostTaskRequest, PutTaskRequest
from src.backend.presentation.http_status import HttpStatus
from src.backend.data.exceptions.exception_handler import handle_exceptions


class TaskRouter:
    def __init__(self):
        self.route = APIRouter()
        self.service = TaskService(TaskManager())

        self.route.add_api_route('/task', self.add_task, methods=['POST'])
        self.route.add_api_route('/tasks/{taskboard_id}', self.get_tasks, methods=['GET'])
        self.route.add_api_route('/task/{id}', self.get_task_by_id, methods=['GET'])
        self.route.add_api_route('/task', self.update_task, methods=['PUT'])
        self.route.add_api_route('/task/{id}', self.delete_task, methods=['DELETE'])
        

    @handle_exceptions
    def add_task(self, request: PostTaskRequest, db: Session = Depends(Database.get_db)):
        return {
            'status': HttpStatus.OK, 
            'task': self.service.add_task(
                request.parent_id,
                request.name, 
                request.description, 
                request.due_date,
                request.tag,
                db)}
       

    @handle_exceptions
    def get_tasks(self, taskboard_id: int, db: Session = Depends(Database.get_db)):
        return {'status': HttpStatus.OK, 'tasks': self.service.get_tasks(taskboard_id, db)}
       

    @handle_exceptions
    def get_task_by_id(self, id: int, db: Session = Depends(Database.get_db)):
        return {'status': HttpStatus.OK, 'task': self.service.get_task_by_id(id, db)}


    @handle_exceptions
    def update_task(self, request: PutTaskRequest, db: Session = Depends(Database.get_db)):
        return {
            'status': HttpStatus.OK, 
            'task': self.service.update_task(
            request.id, 
            request.name, 
            request.description,
            request.due_date,
            request.section,
            request.tag,
            db)}
    

    @handle_exceptions
    def delete_task(self, id: int, db: Session = Depends(Database.get_db)):
        return {'status': HttpStatus.OK, 'task': self.service.delete_task(id, db)}