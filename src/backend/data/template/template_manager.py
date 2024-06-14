from src.backend.domain.factory import Factory

class TemplateManager:
    def __init__(self) -> None:
        pass


    def get_templates(self, template_structure: str):
        return Factory.create_template_list(template_structure)
