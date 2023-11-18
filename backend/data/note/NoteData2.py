from backend.domain.Note import Note
from backend.domain.enums.responseMessages import RespMsg
from backend.domain.enums.noteTypes import NoteTypes
from backend.data.fileOperations.JsonOperations import Json
from backend.presentation.requestBodies.NoteRequest import NoteRequest
from backend.service.filters.NoteFilter import NoteFilter
from backend.service.dateOperations.MyDate import MyDate
import os

class NoteData2:
    def __init__(self):
        self.notes_relative_path = os.getcwd() + '/storage/json/notes.json'
        self.filter = NoteFilter()


    def add_note(self, sub_dir_id: int, note: Note):
        """
        Add a note to a specified sub directory in the notes structure.

        Args:
            dir_id (int): The identifier of the sub directory to which the note will be added.
            note_data (NoteRequest): Data containing information to create the note.

        Returns:
            RespMsg: A response message indicating the outcome of the note addition.
            - If successful, it returns RespMsg.OK.
            - If the sub directory is not found, it returns RespMsg.NOT_FOUND.
        """
        data = Json.load_json_file(self.notes_relative_path)
    
        for dir in data['categories']:
            for sub_dir in dir['subcategories']:
                if sub_dir["id"] == sub_dir_id:
                    sub_dir['notes'].append(note.__dict__)
                    Json.update_json_file(self.notes_relative_path, data)
                    return note
        return RespMsg.NOT_FOUND



    def get_notes(self, sub_dir_id: str, note_type: str):
        """
        Retrieve a filtered list of notes from a specified sub directory in the notes structure.

        Args:
            sub_dir_id (str): The identifier of the sub directory from which to retrieve notes.
            note_type (str): The type of notes to filter.

        Returns:
            Union[List[dict], RespMsg]: A filtered list of notes as dictionaries if successful, or a RespMsg indicating the outcome.
            - If successful, it returns a list of notes as dictionaries.
            - If the sub directory is not found, it returns RespMsg.NOT_FOUND.
        """
        data = Json.load_json_file(self.notes_relative_path)
                    
        for dir in data["categories"]:
            for sub_dir in dir["subcategories"]:
                if sub_dir["id"] == sub_dir_id:
                    return self.filter.filter_by_type(sub_dir["notes"], note_type)
        return RespMsg.NOT_FOUND

    
    def get_note_by_id(self, note_id: int):
        """
        Retrieve a specific note from the notes structure by its unique identifier.

        Args:
            note_id (int): The unique identifier of the note to retrieve.

        Returns:
            Union[Note, RespMsg]: The requested Note object if successful, or a RespMsg indicating the outcome.
            - If successful, it returns the specific Note object.
            - If the note is not found, it returns RespMsg.NOT_FOUND.
        """
        data = Json.load_json_file(self.notes_relative_path)
                    
        for dir in data["categories"]:
            for sub_dir in dir['subcategories']:
                for note in sub_dir['notes']:
                    if note['id'] == note_id:
                        note_object = self.__create_note_object(note)
                        note_object.set_content_text()
                        return note_object
        return RespMsg.NOT_FOUND

    
    def update_note(self, note_id: int, note_data: NoteRequest):
        """
        Update a note with the provided note data.

        Args:
            note_id (int): The unique identifier of the note to be updated.
            note_data (NoteRequest): The data to update the note.

        Returns:
            Union[dict, RespMsg]: 
            - If successful, it returns the updated note as a dictionary.
            - If the note with the specified ID is not found, it returns a message indicating 'NOT_FOUND'.
        """
        data = Json.load_json_file(self.notes_relative_path)
        
        for dir in data['categories']:
            for sub_dir in dir['subcategories']:
                for note in sub_dir['notes']:
                    if note["id"] == note_id:
                        updated_note = self.__update_note(note, note_data)
                        Json.update_json_file(self.notes_relative_path, data)
                        return updated_note
        return RespMsg.NOT_FOUND
    

    def update_note_category(self, note_id: int, category_id: int, parent: bool):
        note_dict = self.get_note_by_id(parent, note_id)
        note = Note(note_dict['id'], note_dict['title'], note_dict['content'], note_dict['bookmark'], note_dict['password_protected'])
        self.delete_note(note_id, parent)
        self.add_note(category_id, parent, note) 
        return RespMsg.OK   
        
         
    def delete_note(self, note_id: int):
        """
        Delete a specific note from the notes structure by its unique identifier.

        Args:
            note_id (int): The unique identifier of the note to delete.

        Returns:
            RespMsg: A response message indicating the outcome of the note deletion.
            - If successful, it returns RespMsg.OK.
            - If the note is not found, it returns RespMsg.NOT_FOUND.
        """
        data = Json.load_json_file(self.notes_relative_path)

        for dir in data['categories']:
            for sub_dir in dir['subcategories']:
                for note in sub_dir['notes']:
                    if note['id'] == note_id:
                        self.__delete_note_html_file(note)
                        sub_dir['notes'].remove(note)
                        Json.update_json_file(self.notes_relative_path, data)
                        return RespMsg.OK
        return RespMsg.NOT_FOUND       
        

    def __create_note_object(self, note_data: Note):
        return Note(
            note_data['id'], 
            note_data['title'], 
            note_data['content'], 
            note_data['bookmark'], 
            note_data['password_protected'],
            note_data['last_edit'],
            note_data['creation']
            )
    

    def __delete_note_html_file(self, note_data: Note):
        note_object = self.__create_note_object(note_data)
        note_object.delete_note_file(note_object.content)

    
    def __update_note(self, current_note: dict, updated_note: Note):
        note: Note = self.__create_note_object(current_note)
        note.update_content(note.content, updated_note.content)

        current_note['title'] = updated_note.title
        current_note['bookmark'] = updated_note.bookmark
        current_note['password_protected'] = updated_note.password_protected
        current_note['last_edit'] = MyDate.datetime()
        return current_note