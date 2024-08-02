from src.backend.util.calendar import Calendar
from src.backend.data.file.text_manager import TextManager


class Template:
    def __init__(self, id: str, name: str, content: str, 
                last_edit = Calendar.datetime(), creation = Calendar.date(), uses = 0):
        self.id = id
        self.name = name
        self.content = content
        self.last_edit = last_edit
        self.creation = creation
        self.uses = uses


    def set_content_text(self):
        """
        This method takes the content attribute (which is the path to the note content) from the note and gives it to 
        the HTMLOperations class that will read the path and return the html content that's inside the file.
        """
        self.content = TextManager.get(self.content)


    def set_content_path(self):
        """
        This method takes the html content and id from the template and gives it to 
        the TextManager class that will create a txt file and return it's path.
        The path returned from the TextManager class will be set as the template content.
        """
        self.content = TextManager.save(self.content, self.id)


    def update_content(self, template_path: str, updated_html_content: str):
        """This method will update the content of a template's html file."""
        TextManager.update(template_path, updated_html_content)


    def delete_template_file(self, template_path: str):
        """This method uses the template path do delete the file."""
        TextManager.delete(template_path)


    def increment_uses_by_one(self):
        self.uses += 1


    @classmethod
    def from_json(self, json_template):
        return Template(
            json_template['id'], 
            json_template['name'], 
            json_template['content'], 
            json_template['last_edit'],
            json_template['creation'],
            json_template['uses']
        )