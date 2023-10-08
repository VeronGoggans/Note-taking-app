import os

class HTMLOperations:
    def __init__(self) -> None:
        pass

    # This method is used to create an html file and write the content from the note into it.
    # This method returns the path to the just created html file.
    @staticmethod
    def save(html_content: str, note_id: int):
        notes_folder = os.getcwd() + '/storage/notes'
        file_name = f'note-{note_id}.html'
        file_path = f'{notes_folder}/{file_name}'

        with open(file_path, 'w') as file:
            file.write(html_content)
        return file_path
    
    
    # This method is used to read the content of a notes file path
    # This method returns the html content thats inside the note.html file
    @staticmethod
    def load(file_path: str):
        html_content = ''
        with open(file_path, 'r') as file:
            html_content = file.read()
        return html_content
    

    @staticmethod
    def update(file_path: str, updated_html_content: str):
        with open(file_path, 'w') as file:
            file.write(updated_html_content)
        