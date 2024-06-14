from src.backend.data.template.template_manager import TemplateManager
from src.backend.data.file.json_manager import JsonManager
from os import getcwd

class TemplateService:
    def __init__(self, template_manager: TemplateManager, json_manager: JsonManager):
        self.template_manager = template_manager
        self.json_manager = json_manager
        self.BASE_URL = getcwd()
        self.templates_path = f'{self.BASE_URL}/storage/json/templates.json'
        self.id_path = f'{self.BASE_URL}/storage/json/id.json'


    def get_templates(self):
        template_structure = self.json_manager.load(self.templates_path)['templates']
        templates = self.template_manager.get_templates(template_structure)
        return templates
    

    def create_template(self):
        pass

    def update_template(self):
        pass

    def delete_template(self):
        pass
    