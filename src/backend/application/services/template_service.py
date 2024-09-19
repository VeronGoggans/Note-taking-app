from src.backend.data.managers.template_manager import TemplateManager
from src.backend.domain.template import Template
from src.backend.presentation.request_bodies.template_requests import *
from src.backend.data.exceptions.exceptions import *
from src.backend.application.decorators.exceptions import check_for_null 


class TemplateService:
    def __init__(self, template_manager: TemplateManager):
        self.manager = template_manager

    
    def add_template(self, request: PostTemplateRequest) -> Template:
        template = Template(1, request.name, request.content)
        try:
            return self.manager.add(template)
        except AdditionException as e:
            raise e


    @check_for_null
    def get_templates(self) -> list[list[Template], list[Template]]:
        return self.manager.get_all()
        
        
    @check_for_null
    def get_template_by_id(self, id: str, update_use_count: bool) -> Template:
        return self.manager.get_by_id(id, update_use_count)


    @check_for_null
    def get_template_names(self) -> list:
        return self.manager.get_all_names()


    @check_for_null
    def update_template(self, request: PutTemplateRequest):
        return self.manager.update(request)
        

    @check_for_null
    def delete_template(self, template_id: str):
        return self.manager.delete(template_id)
        
        