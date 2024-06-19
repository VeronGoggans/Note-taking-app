from src.backend.domain.factory import Factory
from src.backend.domain.template import Template
from src.backend.presentation.request_bodies.template.template_request import TemplateRequest
from src.backend.util.calendar import Calendar


class TemplateManager:
    def __init__(self) -> None:
        pass        

    def get_all(self, templates: list):
        return Factory.create_template_list(templates)
    

    def get_by_id(self, templates: list, id: str):
        for template in templates:
            if template['id'] == id:
                template_object = Template.from_json(template)
                template_object.set_content_text()
                return template_object
        return None
    

    def add(self, templates: list, new_template: Template):
        templates.append(new_template.__dict__)
        return new_template
    

    def update(self, id: str, templates: list, new_template_data: TemplateRequest):
        for template in templates:
            if template['id'] == id:
                updated_template = self.__update_entity(template, new_template_data)
                return updated_template
        return None
    

    def delete(self,templates: list, template_id: str):
        for template in templates:
            if template['id'] == template_id:
                templates.remove(template)
                self.__delete_txt_file(template)
                return template
        return None
    

    def __update_entity(self, old_template: dict, new_template_data: TemplateRequest):
        current_time = Calendar.datetime()

        template = Template.from_json(old_template)
        template.update_content(template.content, new_template_data.content)
        template.last_edit = current_time

        old_template['name'] = new_template_data.name
        old_template['last_edit'] = current_time

        return template
    

    def __delete_txt_file(self, json_template: dict):
        """This method will delete the txt file linked to the template object."""
        template = Template.from_json(json_template)
        template.delete_template_file(template.content)
        