from backend.domain.note import Note
from backend.domain.enums.responseMessages import RespMsg
from backend.presentation.request_bodies.note_request import NoteRequest
from backend.application.service.util.date_service import DateService
from backend.application.filters.NoteFilter import NoteFilter
import os

class NoteManager:
    def __init__(self):
        self.notes_relative_path = os.getcwd() + '/storage/json/notes.json'
        self.filter = NoteFilter()
    

    def add_note(self, folders, folder_id: int, note: Note):
        """
        Add a note to a specified folder in the notes structure.

        Args:
            folder_id (int): The identifier of the folder to which the note will be added.
            note_data (NoteRequest): Data containing information to create the note.

        Returns:
            RespMsg: A response message indicating the outcome of the note addition.
            - If successful, it returns RespMsg.OK.
            - If the sub directory is not found, it returns RespMsg.NOT_FOUND.
        """
        parent_folder = self.__find_folder_by_id(folders, folder_id)
        if parent_folder:
            parent_folder['notes'].append(note.__dict__)
            return note
        return None

        

    
    def get_notes(self, folders, folder_id: int, note_type: str):
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
        parent_folder = self.__find_folder_by_id(folders, folder_id)
        if parent_folder:
            return self.filter.filter_by_type(parent_folder['notes'], note_type)
        return None


    def get_note_by_id(self, folders, note_id: int):
        """
        Retrieve a specific note from the notes structure by its unique identifier.

        Args:
            note_id (int): The unique identifier of the note to retrieve.

        Returns:
            Union[Note, RespMsg]: The requested Note object if successful, or a RespMsg indicating the outcome.
            - If successful, it returns the specific Note object.
            - If the note is not found, it returns RespMsg.NOT_FOUND.
        """
        for folder in folders:
            for note in folder["notes"]:
                if note.get("id") == note_id:
                    note_object = self.__create_note_object(note)
                    note_object.set_content_text()
                    return note_object
        
                note_in_subfolder = self.get_note_by_id(folder["subfolders"], note_id)
                if note_in_subfolder:
                    return note_in_subfolder
        return None
                        

    def update_note(self, folders, note_id: int, note_data: NoteRequest):
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

        current_note = self.__find_note(folders, note_id)
        if current_note:
            updated_note = self.__update_note(current_note, note_data)
            return updated_note
        return RespMsg.NOT_FOUND
    
    
    
    def delete_note(self, folders, note_id: int):
        """
        Delete a specific note from the notes structure by its unique identifier.

        Args:
            note_id (int): The unique identifier of the note to delete.

        Returns:
            RespMsg: A response message indicating the outcome of the note deletion.
            - If successful, it returns RespMsg.OK.
            - If the note is not found, it returns RespMsg.NOT_FOUND.
        """
        for folder in folders:
            for note in folder.get('notes'):         
                if note.get('id') == note_id:
                    folder['notes'].remove(note)
                    self.__delete_note_html_file(note)
                    return note
            return self.delete_note(folder.get('subfolders'), note_id)
        return None
    


    def __find_note(self, folders, note_id: int):
        for folder in folders:
            for note in folder["notes"]:
                if note.get("id") == note_id:
                    return note
        
                note_in_subfolder = self.get_note_by_id(folder["subfolders"], note_id)
                if note_in_subfolder:
                    return note_in_subfolder
        return None
    

    def __find_folder_by_id(self, folders, target_id):
        for folder in folders:
            if folder.get("id") == target_id:
                return folder
            
            subfolder = self.__find_folder_by_id(folder["subfolders"], target_id)
            if subfolder:
                return subfolder
        return None
        
    
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

    
    def __update_note(self, current_note: dict, updated_note: NoteRequest):
        note: Note = self.__create_note_object(current_note)
        note.update_content(note.content, updated_note.content)

        current_note['title'] = updated_note.title
        current_note['bookmark'] = updated_note.bookmark
        current_note['password_protected'] = updated_note.password_protected
        current_note['last_edit'] = DateService.datetime()
        return current_note