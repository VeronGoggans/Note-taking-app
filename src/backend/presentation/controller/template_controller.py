from fastapi import APIRouter
from src.backend.application.template_service import TemplateService
from src.backend.data.template.template_manager import TemplateManager
from src.backend.domain.enums.responseMessages import Status
from src.backend.presentation.request_bodies.template.template_request import TemplateRequest

class TemplateRouter:
    def __init__(self, json_manager):
        self.route = APIRouter()
        self.service = TemplateService(TemplateManager(), json_manager)

        self.route.add_api_route('/templates', self.get_templates, methods=['GET'])
        self.route.add_api_route('/template/{id}', self.get_template_by_id, methods=['GET'])
        self.route.add_api_route('/templateNames', self.get_template_names, methods=['GET'])

        self.route.add_api_route('/template', self.add_template, methods=['POST'])
        self.route.add_api_route('/template/{id}', self.update_template, methods=['PUT'])
        self.route.add_api_route('/template/{template_id}', self.delete_template, methods=['DELETE'])


    def get_templates(self):
        response = self.service.get_templates()
        return {"Status_code": Status.OK, "Templates": response}
    

    def get_template_by_id(self, id: str):
        response = self.service.get_template_by_id(id)
        if response != Status.NOT_FOUND:
            return {"Status_code": Status.OK, "Template": response}
        return {"Status_code": Status.NOT_FOUND, "Template": None}
    

    def get_template_names(self):
        response = self.service.get_template_names()
        return {"Status_code": Status.OK, "Templates": response}
    

    def add_template(self, template: TemplateRequest):
        response = self.service.add_template(template)

        if response != Status.INTERAL_SERVER_ERROR:
            return {'Status_code': Status.OK, "Template": response}
        return {'Status_code': Status.INTERAL_SERVER_ERROR}
    

    def update_template(self, id: str, template: TemplateRequest):
        response = self.service.update_template(id, template)

        if response != Status.NOT_FOUND:
            return {'Status_code': Status.OK, "Template": response}
        return {'Status_code': Status.NOT_FOUND}
    

    def delete_template(self, template_id: str):
        response = self.service.delete_template(template_id)

        if response != Status.NOT_FOUND:
            return {'Status_code': Status.OK, "Template": response}
        return {'Status_code': Status.NOT_FOUND}