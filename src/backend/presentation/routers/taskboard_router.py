from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.backend.data.database import Database
from src.backend.application.services.taskboard_service import TaskboardService
from src.backend.data.managers.taskboard_manager import TaskboardManager
from src.backend.presentation.request_bodies.taskboard_requests import PostTaskboardRequest, PutTaskboardRequest
from src.backend.presentation.http_status import HttpStatus
from src.backend.data.exceptions.exception_handler import handle_exceptions



class TaskboardRouter:
    def __init__(self):
        self.route = APIRouter()
        self.service = TaskboardService(TaskboardManager())

        self.route.add_api_route('/taskboard', self.add_taskboard, methods=['POST'])
        self.route.add_api_route('/taskboards', self.get_taskboards, methods=['GET'])
        self.route.add_api_route('/taskboard/{id}', self.get_taskboard_by_id, methods=['GET'])
        self.route.add_api_route('/taskboard', self.update_taskboard, methods=['PUT'])
        self.route.add_api_route('/taskboard/{id}', self.delete_taskboard, methods=['DELETE'])
        

    @handle_exceptions
    def add_taskboard(self, request: PostTaskboardRequest, db: Session = Depends(Database.get_db)):
        return {'status': HttpStatus.OK, 'taskboard': self.service.add_taskboard(request.name, request.description, db)}
       

    @handle_exceptions
    def get_taskboards(self, db: Session = Depends(Database.get_db)):
        return {'status': HttpStatus.OK, 'taskboards': self.service.get_taskboards(db)}
       

    @handle_exceptions
    def get_taskboard_by_id(self, id: int, db: Session = Depends(Database.get_db)):
        return {'status': HttpStatus.OK, 'taskboard': self.service.get_taskboard_by_id(id, db)}


    @handle_exceptions
    def update_taskboard(self, request: PutTaskboardRequest, db: Session = Depends(Database.get_db)):
        self.service.update_taskboard(request.id, request.name, request.description, db)
        return {'status': HttpStatus.OK}
    

    @handle_exceptions
    def delete_taskboard(self, id: int, db: Session = Depends(Database.get_db)):
        return {'status': HttpStatus.OK, 'taskboard': self.service.delete_taskboard(id, db)}