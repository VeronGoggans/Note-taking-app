from src.backend.data.file.text_manager import TextManager
from src.backend.util.calendar import Calendar

class Note:
    def __init__(self, id: int, name: str, content: str, bookmark = False, favorite = False, 
                last_edit = Calendar.datetime(), creation = Calendar.date()):
        self.id = id
        self.name = name
        self.content = content
        self.bookmark = bookmark
        self.favorite = favorite
        self.last_edit = last_edit
        self.creation = creation

    
    def set_content_path(self):
        """
        This method takes the html content and id from the note and gives it to 
        the TextManager class that will create a txt file and return it's path.
        The path returned from the TextManager class will be set as the note content.
        """
        self.content = TextManager.save(self.content, self.id)

    
    def set_content_text(self):
        """
        This method takes the content attribute (which is the path to the note content) from the note and gives it to 
        the HTMLOperations class that will read the path and return the html content that's inside the file.
        """
        self.content = TextManager.get(self.content)


    def update_content(self, note_path: str, updated_html_content: str):
        """This method will update the content of a note's html file."""
        TextManager.update(note_path, updated_html_content)


    def delete_note_file(self, note_path: str):
        """This method uses the note path do delete the file."""
        TextManager.delete(note_path)


    @classmethod
    def from_json(self, json_note):
        return Note(
            json_note['id'], 
            json_note['name'], 
            json_note['content'], 
            json_note['bookmark'], 
            json_note['favorite'],
            json_note['last_edit'],
            json_note['creation']
        )