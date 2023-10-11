from backend.src.service.fileOperations.HTMLOperations import HTMLOperations

class Note:
    def __init__(self, id: int, title: str, content: str, bookmark: bool, password_protected: bool):
        self.id = id
        self.title = title
        self.content = content
        self.bookmark = bookmark
        self.password_protected = password_protected

    # This method takes the html content and id from the note and gives it to 
    # the HTMLOperations class that will create a html file and return its path.
    # The path returned from the HTMLOperations class will be set as the note content
    def set_content_path(self):
        self.content = HTMLOperations.save(self.content, self.id)

    # This method takes the content field (which should be a path to the note content) from the note and gives it to 
    # the HTMLOperations class that will read the path and return the html content thats inside the file.
    def set_content_text(self):
        self.content = HTMLOperations.load(self.content)

    # This method will update the content of a note's html file 
    def update_content(self, note_path: str, updated_html_content: str):
        HTMLOperations.update(note_path, updated_html_content)

    # This method uses the note path do delete the file.
    def delete_note_file(self, note_path: str):
        HTMLOperations.delete(note_path)