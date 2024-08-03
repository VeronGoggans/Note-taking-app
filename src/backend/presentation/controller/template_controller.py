from fastapi import APIRouter
from src.backend.application.template_service import TemplateService
from src.backend.data.template.template_manager import TemplateManager
from src.backend.presentation.http_status import HttpStatus
from src.backend.presentation.request_bodies.template_requests import *
from src.backend.presentation.dtos.template_dtos import *
from src.backend.data.exceptions.exceptions import *

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


    def get_templates(self):
        try:
            recent, other, total_uses, most_used = self.service.get_templates()
            return {'status': 'succes', 'recent': recent, 'other': other, 'totalUses': total_uses, 'mostUsed': most_used}, HttpStatus.OK
        except DeserializationException as e:
            return {'status': 'error', 'message': str(e)}, HttpStatus.INTERAL_SERVER_ERROR


    def get_template_by_id(self, id: str, update_use_count: bool):
        try:
            template = self.service.get_template_by_id(id, update_use_count)
            return {'status': 'succes', 'template': template}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NOT_FOUND
            

    def get_template_names(self):
        templates = self.service.get_template_names()
        return {'status': 'succes', 'templates': templates}, HttpStatus.OK
    

    def get_search_items(self):
        try:
            templates = self.service.get_template_names()
            return {'status': 'succes', 'templates': templates}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NO_CONTENT
    

    def add_template(self, request: PostTemplateRequest):
        try:
            request_dto = PostTemplateDto(request.name, request.content)
            template = self.service.add_template(request_dto)
            return {'status': 'succes', 'template': template}, HttpStatus.OK
        except AdditionException as e:
            return {'status': 'error', 'message': str(e)}, HttpStatus.INTERAL_SERVER_ERROR
    

    def update_template(self, request: PutTemplateRequest):
        try:
            request_dto = PutTemplateDto(request.id, request.name, request.content)
            template = self.service.update_template(request_dto)
            return {'status': 'succes', 'template': template}, HttpStatus.OK 
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NOT_FOUND


    def delete_template(self, template_id: str):
        try:
            template = self.service.delete_template(template_id)
            return {'status': 'succes', 'template': template}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NOT_FOUND
        