from backend.domain.note import Note
from backend.presentation.request_bodies.note.put_note_request import PutNoteRequest
from backend.application.service.util.date_service import DateService
from backend.application.filters.NoteFilter import NoteFilter
import os

class NoteManager:
    def __init__(self):
        self.notes_relative_path = os.getcwd() + '/storage/json/notes.json'
        self.filter = NoteFilter()
    

    def add_note(self, folders, folder_id: str, note: Note):
        """
        Add a note to a specified folder in the notes structure.

        Args:
            folders (List[dict]): The list of folders to search within.
            folder_id (str): The identifier of the folder to which the note will be added.
            note (Note): the note object to be added in a folder.

        Returns:
            dict or None: 
            - If successful, it returns the note.
            - If the folder is not found, it returns None.
        """
        parent_folder = self.__find_folder_by_id(folders, folder_id)
        if parent_folder:
            parent_folder['notes'].append(note.__dict__)
            return note
        return None

        

    
    def get_notes(self, folders, folder_id: str, note_type: str):
        """
        Retrieve a filtered list of notes from a specified folder in the notes structure.

        Args:
            folders (List[dict]): The list of folders to search within.
            folder_id (str): The identifier of the folder from which to retrieve notes from.
            note_type (str): The type of notes to filter.

        Returns:
            dict or None: 
            - If successful, it returns a list of notes as dictionaries.
            - If the folder is not found, it returns None.
        """
        parent_folder = self.__find_folder_by_id(folders, folder_id)
        if parent_folder:
            return self.filter.filter_by_type(parent_folder['notes'], note_type)
        return None


    def get_note_by_id(self, folders, note_id: str):
        """
        Retrieve a specific note from the notes structure by its unique identifier.

        Args:
            folders (List[dict]): The list of folders to search within.
            note_id (str): The unique identifier of the note to retrieve.

        Returns:
            dict or None: 
            - If successful, it returns the specific Note object.
            - If the note is not found, it returns None.
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
                        

    def update_note(self, folders, note_id: str, put_request: PutNoteRequest):
        """
        Update a note with the provided note data.

        Args:
            folders (List[dict]): The list of folders to search within.
            note_id (str): The unique identifier of the note to be updated.
            put_request (PutNoteRequest): The data to update the note.

        Returns:
            dict or None: 
            - If successful, it returns the updated note as a dictionary.
            - If the note with the specified ID is not found, it returns None.
        """

        current_note = self.__find_note(folders, note_id)
        if current_note:
            updated_note = self.__update_note(current_note, put_request)
            return updated_note
        return None
    
    
    
    def delete_note(self, folders, folder_id: str, note_id: str):
        """
        Delete a specific note from the notes structure by its unique identifier.

        Args:
            folders (List[dict]): The list of folders to search within.
            note_id (str): The unique identifier of the note to delete.

        Returns:
            dict or None: 
            - If successful, it returns the deleted note.
            - If the note is not found, it returns None.
        """
        folder = self.__find_folder_by_id(folders, folder_id)
        if folder:
            for note in folder['notes']:
                if note.get('id') == note_id:
                    folder['notes'].remove(note)
                    self.__delete_note_html_file(note)
                    return note
            return None
        return None
                
    


    def __find_note(self, folders, note_id: str):
        """
        Recursively search for a note with the specified ID within the folder structure.

        Args:
            folders (List[dict]): The list of folders to search within.
            note_id (str): The ID of the note to be found.

        Returns:
            dict or None: 
            - If the note is found, it returns the note's dictionary.
            - If the specified note is not found, it returns None.
        """
        for folder in folders:
            for note in folder["notes"]:
                if note.get("id") == note_id:
                    return note
        
                note_in_subfolder = self.__find_note(folder["subfolders"], note_id)
                if note_in_subfolder:
                    return note_in_subfolder
        return None
    

    def __find_folder_by_id(self, folders, target_id: str):
        """
        Recursively search for a folder with the specified ID within the folder structure.

        Args:
            folders (List[dict]): The list of folders to search within.
            target_id (str): The ID of the folder to be found.

        Returns:
            dict or None: 
            - If the folder is found, it returns the folder's dictionary.
            - If the specified folder is not found, it returns None.
        """
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
            note_data['last_edit'],
            note_data['creation']
            )
    

    def __delete_note_html_file(self, note_data: Note):
        """This method will delete the htm file linked to the note object."""
        note_object = self.__create_note_object(note_data)
        note_object.delete_note_file(note_object.content)

    
    def __update_note(self, current_note: dict, updated_note: PutNoteRequest):
        note: Note = self.__create_note_object(current_note)
        note.update_content(note.content, updated_note.content)

        current_note['title'] = updated_note.title
        current_note['bookmark'] = updated_note.bookmark
        current_note['last_edit'] = DateService.datetime()
        return current_note