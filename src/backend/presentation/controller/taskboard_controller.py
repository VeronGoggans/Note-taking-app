from fastapi import APIRouter
from src.backend.application.taskboard_service import TaskboardService
from src.backend.data.taskboard.taskboard_manager import TaskboardManager
from src.backend.presentation.dtos.taskboard_dtos import PutTaskboardDto
from src.backend.presentation.request_bodies.taskboard_requests import PostTaskboardRequest, PutTaskboardRequest
from src.backend.presentation.http_status import HttpStatus
from src.backend.presentation.decorators.controller_decorators import exception_handler



class TaskboardRouter:
    def __init__(self, json_manager):
        self.route = APIRouter()
        self.service = TaskboardService(TaskboardManager(), json_manager)

        self.route.add_api_route('/taskboard', self.add_taskboard, methods=['POST'])
        self.route.add_api_route('/taskboards', self.get_taskboards, methods=['GET'])
        self.route.add_api_route('/taskboard/{id}', self.get_taskboard_by_id, methods=['GET'])
        self.route.add_api_route('/taskboard', self.update_taskboard, methods=['PUT'])
        self.route.add_api_route('/taskboard/{id}', self.delete_taskboard, methods=['DELETE'])
        

    @exception_handler
    def add_taskboard(self, request: PostTaskboardRequest):
        taskboard = self.service.add_taskboard(request.name, request.description)
        return {'status': HttpStatus.OK, 'taskboard': taskboard}
       

    @exception_handler
    def get_taskboards(self):
        taskboards = self.service.get_taskboards()
        return {'status': HttpStatus.OK, 'taskboards': taskboards}
       

    @exception_handler
    def get_taskboard_by_id(self, id: str):
        taskboard = self.service.get_taskboard_by_id(id)
        return {'status': HttpStatus.OK, 'taskboard': taskboard}


    @exception_handler
    def update_taskboard(self, request: PutTaskboardRequest):
        request_dto = PutTaskboardDto(request.id, request.name, request.description)
        self.service.update_taskboard(request_dto)
        return {'status': HttpStatus.OK}
    

    @exception_handler
    def delete_taskboard(self, id: str ):
        taskboard = self.service.delete_taskboard(id)
        return {'status': HttpStatus.OK, 'taskboard': taskboard}