from src.backend.data.template.template_manager import TemplateManager
from src.backend.data.file.json_manager import JsonManager
from src.backend.domain.template import Template
from src.backend.presentation.request_bodies.template_requests import *
from src.backend.data.exceptions.exceptions import *
from src.backend.util.paths import TEMPLATES_PATH

class TemplateService:
    def __init__(self, template_manager: TemplateManager, json_manager: JsonManager):
        self.manager = template_manager
        self.json_manager = json_manager

    
    def add_template(self, request: PostTemplateRequest) -> Template:
        template_id = self.json_manager.generate_id('template')
        template_structure = self.json_manager.load(TEMPLATES_PATH)

        template = Template(template_id, request.name, request.content)
        template.set_content_path()
        try:
            new_template = self.manager.add(template_structure, template)
            self.json_manager.update(TEMPLATES_PATH, template_structure)
            return new_template
        except AdditionException as e:
            raise e


    def get_templates(self) -> list[list[Template], list[Template]]:
        try:
            template_structure = self.json_manager.load(TEMPLATES_PATH)
            templates = self.manager.get_all(template_structure)
            return templates
        except DeserializationException as e:
            raise e
        

    def get_template_by_id(self, id: str, update_use_count: bool) -> Template:
        template_structure = self.json_manager.load(TEMPLATES_PATH)
        try:
            template = self.manager.get_by_id(template_structure, id, update_use_count)
            if update_use_count:
                self.json_manager.update(TEMPLATES_PATH, template_structure)
            return template    
        except NotFoundException as e:
            raise e
    

    def get_template_names(self) -> list:
        template_structure = self.json_manager.load(TEMPLATES_PATH)
        templates = self.manager.get_all_names(template_structure)
        return templates


    def update_template(self, request: PutTemplateRequest):
        template_structure = self.json_manager.load(TEMPLATES_PATH)
        try:
            updated_template = self.manager.update(template_structure, request)
            self.json_manager.update(TEMPLATES_PATH, template_structure)
            return updated_template
        except NotFoundException as e:
            raise e


    def delete_template(self, template_id: str):
        template_structure = self.json_manager.load(TEMPLATES_PATH)
        try:
            deleted_template = self.manager.delete(template_structure, template_id)
            self.json_manager.update(TEMPLATES_PATH, template_structure)
            return deleted_template
        except NotFoundException as e:
            raise e
        