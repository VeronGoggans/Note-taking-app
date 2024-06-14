from src.backend.util.calendar import Calendar
from src.backend.data.file.html_manager import HTMLManager


class Template:
    def __init__(self, id: str, name: str, content: str, 
                last_edit = Calendar.datetime(), creation = Calendar.date()):
        self.id = id
        self.name = name
        self.content = content
        self.last_edit = last_edit
        self.creation = creation


    def set_content_text(self):
        """
        This method takes the content attribute (which is the path to the note content) from the note and gives it to 
        the HTMLOperations class that will read the path and return the html content that's inside the file.
        """
        self.content = HTMLManager.get(self.content)

    @classmethod
    def from_json(self, json_template):
        return Template(
            json_template['id'], 
            json_template['name'], 
            json_template['content'], 
            json_template['last_edit'],
            json_template['creation']
        )