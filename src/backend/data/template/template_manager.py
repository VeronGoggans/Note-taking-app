from src.backend.domain.factory import Factory
from src.backend.domain.template import Template
from src.backend.presentation.dtos.template_dtos import *
from src.backend.data.exceptions.exceptions import *
from src.backend.util.calendar import Calendar


class TemplateManager:

    def add(self, templates: list, new_template: Template):
        try:
            templates.append(new_template.__dict__)
            return new_template
        except Exception as e:
            raise AdditionException('An error occured while adding the template', errors=str(e))


    def get_all(self, templates: list):
        try:
            recent, other = self.__get_top_5_most_recent_templates(templates)
            recent_templates = Factory.create_template_list(recent)
            other_templates = Factory.create_template_list(other)
            total_uses_count = self.__get_total_uses(recent_templates, other_templates)
            most_used_template_name = self.__get_most_used_template(templates) 
            return recent_templates, other_templates, total_uses_count, most_used_template_name
        except DeserializationException as e:
            raise e 
        

    def get_by_id(self, templates: list, id: str, update_use_count: bool) -> Template:
        for template in templates:
            if template['id'] == id:
                template_object = Template.from_json(template)
                template_object.set_content_text()

                if update_use_count:
                    template_object.increment_uses_by_one()
                    template['uses'] = template_object.uses
                return template_object
        raise NotFoundException(f'Template with id: {id}, could not be found')
    

    def get_all_names(self, templates: list):
        template_objects = []

        for template in templates:
            template_objects.append({
                'id': template['id'],
                'name': template['name']
            })
        return template_objects


    def update(self, templates: list, request_dto: PutTemplateDto):
        for template in templates:
            if template['id'] == request_dto.template_id:
                updated_template = self.__update_entity(template, request_dto)
                return updated_template
        raise NotFoundException(f'Template with id: {id}, could not be found')
    

    def delete(self,templates: list, template_id: str):
        for template in templates:
            if template['id'] == template_id:
                templates.remove(template)
                self.__delete_txt_file(template)
                return template
        raise NotFoundException(f'Template with id: {id}, could not be found')
    

    def __update_entity(self, old_template: dict, request_dto: PutTemplateDto):
        current_time = Calendar.datetime()

        template = Template.from_json(old_template)
        template.update_content(template.content, request_dto.content)
        template.name = request_dto.name
        template.content = request_dto.content
        template.last_edit = current_time

        old_template['name'] = request_dto.name
        old_template['last_edit'] = current_time
        return template
    

    def __delete_txt_file(self, json_template: dict):
        """This method will delete the txt file linked to the template object."""
        template = Template.from_json(json_template)
        template.delete_template_file(template.content)


    def __get_top_5_most_recent_templates(self, templates: list) -> list[list[dict], list[dict]]:
        # Sort the Template objects based on last_edit in descending order
        sorted_templates = sorted(templates, key=lambda template: template['last_edit'], reverse=True)

        # Get the 5 most recently edited templates
        recent_templates = sorted_templates[:5]

        # Get the rest of the templates
        other_templates = sorted_templates[5:]

        return recent_templates, other_templates
    

    def __get_total_uses(self, recent_templates: list[Template], other_templates: list[Template]) -> int:
        total_uses_count = 0
        for template in recent_templates:
            total_uses_count += template.uses
        
        for template in other_templates:
            total_uses_count += template.uses
        
        return total_uses_count
    

    def __get_most_used_template(self, templates: list) -> str:
        most_used = 0
        name = ''
        for template in templates:
            if template['uses'] > most_used:
                most_used = template['uses']
                name = template['name']
        if most_used == 0:
            return 'Not available'
        return name
