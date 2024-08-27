from fastapi import APIRouter
from src.backend.application.template_service import TemplateService
from src.backend.data.template.template_manager import TemplateManager
from src.backend.presentation.http_status import HttpStatus
from src.backend.presentation.request_bodies.template_requests import *
from src.backend.presentation.dtos.template_dtos import *
from backend.presentation.decorators.controller_decorators import exception_handler

class TemplateRouter:
    def __init__(self, json_manager):
        self.route = APIRouter()
        self.service = TemplateService(TemplateManager(), json_manager)

        self.route.add_api_route('/templates', self.get_templates, methods=['GET'])
        self.route.add_api_route('/templateById/{id}/{update_use_count}', self.get_template_by_id, methods=['GET'])
        self.route.add_api_route('/templateNames', self.get_template_names, methods=['GET'])
        self.route.add_api_route('/templateSearchItems', self.get_search_items, methods=['GET'])

        self.route.add_api_route('/template', self.add_template, methods=['POST'])
        self.route.add_api_route('/template', self.update_template, methods=['PUT'])
        self.route.add_api_route('/template/{template_id}', self.delete_template, methods=['DELETE'])


    @exception_handler
    def get_templates(self):
        recent, other, total_uses, most_used = self.service.get_templates()
        return {'status': 'succes', 'recent': recent, 'other': other, 'totalUses': total_uses, 'mostUsed': most_used}, HttpStatus.OK


    @exception_handler
    def get_template_by_id(self, id: str, update_use_count: bool):
        template = self.service.get_template_by_id(id, update_use_count)
        return {'status': 'succes', 'template': template}, HttpStatus.OK
        

    @exception_handler
    def get_template_names(self):
        templates = self.service.get_template_names()
        return {'status': 'succes', 'templates': templates}, HttpStatus.OK
    

    @exception_handler
    def get_search_items(self):
        templates = self.service.get_template_names()
        return {'status': 'succes', 'templates': templates}, HttpStatus.OK
    
    
    @exception_handler
    def add_template(self, request: PostTemplateRequest):
        request_dto = PostTemplateDto(request.name, request.content)
        template = self.service.add_template(request_dto)
        return {'status': 'succes', 'template': template}, HttpStatus.OK
    

    @exception_handler
    def update_template(self, request: PutTemplateRequest):
            request_dto = PutTemplateDto(request.id, request.name, request.content)
            template = self.service.update_template(request_dto)
            return {'status': 'succes', 'template': template}, HttpStatus.OK 


    @exception_handler
    def delete_template(self, template_id: str):
        template = self.service.delete_template(template_id)
        return {'status': 'succes', 'template': template}, HttpStatus.OK        