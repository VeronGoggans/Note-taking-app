from src.backend.domain.template import Template
from src.backend.presentation.request_bodies.template_requests import *
from src.backend.data.exceptions.exceptions import *
from src.backend.util.calendar import Calendar


class TemplateManager:

    def add(self, template: Template) -> (Template | AdditionException):
        pass


    def get_all(self) -> (tuple):
        pass
        

    def get_by_id(self, id: str, update_use_count: bool) -> (Template | NotFoundException):
        pass
    

    def get_all_names(self, templates: list) -> list[object]:
        pass


    def update(self, request: PutTemplateRequest) -> (Template | NotFoundException):
        pass

    def delete(self, template_id: str) -> (object | NotFoundException):
        pass


    def __get_top_5_most_recent_templates(self, templates: list) -> list[list[dict], list[dict]]:
        # Sort the Template objects based on last_edit in descending order
        sorted_templates = sorted(templates, key=lambda template: template['last_edit'], reverse=True)

        # Get the 5 most recently edited templates
        recent_templates = sorted_templates[:5]

        # Get the rest of the templates
        other_templates = sorted_templates[5:]

        return recent_templates, other_templates
    

    def __get_total_uses(self) -> int:
        pass
    

    def __get_most_used_template(self) -> str:
        pass
