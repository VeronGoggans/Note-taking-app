from src.backend.data.template.template_manager import TemplateManager
from src.backend.data.file.json_manager import JsonManager
from src.backend.domain.template import Template
from src.backend.domain.enums.responseMessages import Status
from src.backend.presentation.request_bodies.template.template_request import TemplateRequest
from os import getcwd

class TemplateService:
    def __init__(self, template_manager: TemplateManager, json_manager: JsonManager):
        self.manager = template_manager
        self.json_manager = json_manager
        self.BASE_URL = getcwd()
        self.templates_path = f'{self.BASE_URL}/storage/json/templates.json'
        self.id_path = f'{self.BASE_URL}/storage/json/id.json'


    def get_templates(self) -> list[Template]:
        template_structure = self.json_manager.load(self.templates_path)
        templates = self.manager.get_all(template_structure)
        return templates
    

    def get_template_by_id(self, id: str) -> Template:
        template_structure = self.json_manager.load(self.templates_path)
        template = self.manager.get_by_id(template_structure, id)
        if template:
            return template
        return Status.NOT_FOUND
    

    def get_template_names(self):
        template_structure = self.json_manager.load(self.templates_path)
        templates = self.manager.get_all_names(template_structure)
        return templates
    

    def add_template(self, template_data: TemplateRequest):
        template_id = self.json_manager.generateID(self.id_path, 'template')
        template_structure = self.json_manager.load(self.templates_path)

        template = Template(template_id, template_data.name, template_data.content)
        template.set_content_path()
        new_template = self.manager.add(template_structure, template)
        
        if new_template:
            self.json_manager.update(self.templates_path, template_structure)
            return new_template
        return Status.INTERAL_SERVER_ERROR


    def update_template(self, id: str, template_data: TemplateRequest):
        template_structure = self.json_manager.load(self.templates_path)
        updated_template = self.manager.update(id, template_structure, template_data)

        if updated_template:
            self.json_manager.update(self.templates_path, template_structure)
            return updated_template
        return Status.NOT_FOUND


    def delete_template(self, template_id: str):
        template_structure = self.json_manager.load(self.templates_path)
        deleted_template = self.manager.delete(template_structure, template_id)

        if deleted_template:
            self.json_manager.update(self.templates_path, template_structure)
            return deleted_template
        return Status.NOT_FOUND
    