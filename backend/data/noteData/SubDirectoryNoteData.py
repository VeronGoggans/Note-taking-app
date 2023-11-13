from backend.domain.Note import Note
from backend.domain.enums.responseMessages import RespMsg
from backend.domain.enums.noteTypes import NoteTypes
from backend.service.fileOperations.JsonOperations import Json
from backend.requestClasses.NoteRequest import NoteRequest
from backend.service.generators.IdGenerator import IdGenerator
import os

class SubDirectoryNoteData:
    def __init__(self):
        self.notes_relative_path = os.getcwd() + '/storage/json/notes.json'
    

    def add_note(self, dir_id: int, note_data: NoteRequest):
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
        note = self.__construct_note_object(note_data)
        note.set_content_path()
    
        for dir in data['categories']:
            for sub_dir in dir['subcategories']:
                if sub_dir["id"] == dir_id:
                    sub_dir['notes'].append(note.__dict__)
                    Json.update_json_file(self.notes_relative_path, data)
                    return RespMsg.OK
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
                    return self.__filter_notes_list(sub_dir["notes"], note_type)
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
                for note in sub_dir:
                    if note['id'] == note_id:
                        note_object = self.__create_note_object(note)
                        note_object.set_content_text()
                        return note_object
        return RespMsg.NOT_FOUND

    
    def update_note(self, note_id: int, updated_data: NoteRequest):
        data = Json.load_json_file(self.notes_relative_path)
        note: Note = Note(note_id, )
        
        for dir in data['categories']:
            for sub_dir in dir['subcategories']:
                for note in sub_dir['notes']:
                    if note["id"] == note_id:
                        updated_note = self.__update_note(note, self.__create_note_object())
                        Json.update_json_file(self.notes_relative_path, data)
                        return updated_note
        return RespMsg.NOT_FOUND
    

    def update_note_category(self, note_id: int, category_id: int, parent: bool):
        note_dict = self.get_note_by_id(parent, note_id)
        note = Note(note_dict['id'], note_dict['title'], note_dict['content'], note_dict['bookmark'], note_dict['password_protected'])
        self.delete_note(note_id, parent)
        self.add_note(category_id, parent, note) 
        return RespMsg.OK   
        
        
    # note_id is used to find the note that is requested to be deleted
    # child_of_parent tells the function if the note is inside of a category or subcategory
    # if child_of_parent is true the function will only search threw the categories
    # if child_of_parent is false the function will search threw all subcategories  
    def delete_note(self, note_id: int):
        data = Json.load_json_file(self.notes_relative_path)

        for dir in data['categories']:
            for sub_dir in dir['subcategories']:
                for note in sub_dir['notes']:
                    if note['id'] == note_id:
                        self.__create_note_object(note).delete_note_file()
                        sub_dir['notes'].remove(note)
                        Json.update_json_file(self.notes_relative_path, data)
                        return RespMsg.OK
        return RespMsg.NOT_FOUND       
        

    # This function filters the given list of note objects by the note type that has been given.
    # This function returns a list of note objects which are of z type.
    def __filter_notes_list(self, notes: list, note_type: enumerate):
        filtered_list = []
        note_objects = self.__create_note_object_list(notes)

        if note_type == NoteTypes.STANDARD.value:
            for note in note_objects:
                if note.bookmark == False and note.password_protected == False:
                    filtered_list.append(note)
            return filtered_list
        
        if note_type == NoteTypes.BOOKMARKED.value:
            for note in note_objects:
                if note.bookmark == True:
                    filtered_list.append(note)
            return filtered_list
        
        if note_type == NoteTypes.PROTECTED.value:
            for note in note_objects:
                if note.password_protected == True:
                    filtered_list.append(note)
            return filtered_list
        
        if note_type == NoteTypes.ALL.value:
            return note_objects
        

    # This method is used to create a list of Note objects 
    # Paramter 1 - notes is a list of note objects converted in json data. 
    # And this method takes that data, and creates a list of Note objects
    # So that the methods from the Note class can be applied to them.
    def __create_note_object_list(self, notes: list):
        note_objects = []
        for note_data in notes:
            note_object = self.__create_note_object(note_data)
            note_object.set_content_text()
            note_objects.append(note_object)
        return note_objects
        
    # This method is used to make a Note object.
    # Parameter 1 - note_data is a Note object represented in a json object.
    # note_data will be converted from a json object into a Note object.
    def __create_note_object(self, note_data: Note):
        return Note(
            note_data['id'], 
            note_data['title'], 
            note_data['content'], 
            note_data['bookmark'], 
            note_data['password_protected']
            )
        

    # This method is only used in the creation of a new note requested by the clientside code.
    def __construct_note_object(self, note_data: NoteRequest):
        note_id = IdGenerator.ID("note")
        return Note(
            note_id, 
            note_data.title, 
            note_data.content, 
            note_data.bookmark, 
            note_data.password_protected
            )

    
    def __get_note_path(self, note_id: int):
        data = Json.load_json_file(self.notes_relative_path)
                    
        for dir in data["categories"]:
            for sub_dir in dir['subcategories']:
                for note in sub_dir:
                    if note['id'] == note_id:
                        return note['content']
        return RespMsg.NOT_FOUND

    
    def __update_note(self, current_note: dict, updated_note: Note):
        current_note['title'] = updated_note.name
        updated_note.update_content(self.__get_note_path(False, updated_note.id), updated_note.content)
        current_note['bookmark'] = updated_note.bookmark
        current_note['password_protected'] = updated_note.password_protected
        return current_note
