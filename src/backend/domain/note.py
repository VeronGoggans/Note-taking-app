from src.backend.data.file.html_manager import HTMLManager
from src.backend.util.calendar import Calendar

class Note:
    def __init__(self, id: int, title: str, content: str, bookmark = False, favorite = False, color = 'white', 
                last_edit = Calendar.datetime(), creation = Calendar.date()):
        self.id = id
        self.title = title
        self.content = content
        self.bookmark = bookmark
        self.favorite = favorite
        self.color = color
        self.last_edit = last_edit
        self.creation = creation

    
    def set_content_path(self):
        """
        This method takes the html content and id from the note and gives it to 
        the HTMLOperations class that will create a html file and return its path.
        The path returned from the HTMLOperations class will be set as the note content.
        """
        self.content = HTMLManager.save(self.content, self.id)

    
    def set_content_text(self):
        """
        This method takes the content attribute (which is the path to the note content) from the note and gives it to 
        the HTMLOperations class that will read the path and return the html content that's inside the file.
        """
        self.content = HTMLManager.get(self.content)


    def update_content(self, note_path: str, updated_html_content: str):
        """This method will update the content of a note's html file."""
        HTMLManager.update(note_path, updated_html_content)


    def delete_note_file(self, note_path: str):
        """This method uses the note path do delete the file."""
        HTMLManager.delete(note_path)