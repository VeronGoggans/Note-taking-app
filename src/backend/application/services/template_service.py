from sqlalchemy.orm import Session
from src.backend.data.managers.template_manager import TemplateManager
from src.backend.data.models import Template
from src.backend.presentation.request_bodies.template_requests import *
from src.backend.data.exceptions.exceptions import *


class TemplateService:
    def __init__(self, template_manager: TemplateManager):
        self.manager = template_manager

    
    def add_template(self, request: PostTemplateRequest, db: Session) -> Template:
        template = Template(
            name = request.name, 
            content = request.content
            )
        return self.manager.add(template, db)


    def get_templates(self, db: Session) -> list[list[Template], list[Template]]:
        return self.manager.get_all(db)
        
        
    def get_template_by_id(self, id: int, update_use_count: bool, db: Session) -> ( Template | NotFoundException ):
        return self.manager.get_by_id(id, update_use_count, db)


    def get_template_names(self, db: Session) -> list[dict]:
        return self.manager.get_all_names(db)


    def update_template(self, request: PutTemplateRequest, db: Session) -> ( Template | NotFoundException ):
        return self.manager.update(request.id, request.name, request.content, db)
        

    def delete_template(self, template_id: str, db: Session) -> ( Template | NotFoundException ):
        return self.manager.delete(template_id, db)
        
        