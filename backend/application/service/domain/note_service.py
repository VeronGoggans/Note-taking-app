from backend.data.note.note_manager import NoteManager
from backend.presentation.request_bodies.note.post_note_request import PostNoteRequest
from backend.presentation.request_bodies.note.put_note_request import PutNoteRequest
from backend.presentation.request_bodies.note.del_note_request import DeleteNoteRequest
from backend.domain.note import Note
from backend.domain.enums.responseMessages import Status
from backend.data.file.json_manager import JsonManager
import os 

class NoteService:
    def __init__(self, note_manager: NoteManager, json_manager: JsonManager):
        self.note_manager = note_manager
        self.json_manager = json_manager
        self.BASE_URL = os.getcwd()
        self.folders_path = f'{self.BASE_URL}/storage/json/notes.json'
        self.id_path = f'{self.BASE_URL}/storage/json/id.json'


    def get_cache(self):
        try:
            content = self.json_manager.load(self.folders_path)
            return content
        except OSError as e:
            return Status.INTERAL_SERVER_ERROR
        

    def get_search_options(self):
        folder_structure = self.json_manager.load(self.folders_path)
        folders = folder_structure['folders']
        notes = self.note_manager.get_note_name_id(folders)

        if notes:
            self.note_manager.clear_search_options_list()
            return notes
        return Status.INTERAL_SERVER_ERROR



    def get_notes(self, folder_id: int):
        """
        Retrieves notes of a specific type within the specified folder.
        Note types are standard, protected, bookmark or all.

        Args:
            folder_id (int): The ID of the folder from which to retrieve notes.

        Returns:
            list(dict) or Status.NOT_FOUND: 
            - If the folder with the specified ID is found and contains notes of the specified type,
              returns a list of notes.
            - If the folder is not found or does not contain notes of the specified type,
              returns Status.NOT_FOUND.
        """
        folder_structure = self.json_manager.load(self.folders_path)
        folders = folder_structure['folders']
        notes = self.note_manager.get_notes(folders, folder_id)

        if notes is not None:
            return notes
        return Status.NOT_FOUND



    def get_note_by_id(self, note_id: int):
        """
        Retrieves a note with the specified ID.

        Args:
            note_id (int): The ID of the note to retrieve.

        Returns:
            dict or Status.NOT_FOUND: 
            - If a note with the specified ID is found, returns the note as a dictionary.
            - If the note is not found, returns Status.NOT_FOUND.
        """
        folders = self.json_manager.load(self.folders_path)['folders']
        note = self.note_manager.get_note_by_id(folders, note_id)
        if note:
            return note
        return Status.NOT_FOUND
    


    def add_note(self, post_request: PostNoteRequest):
        """
        Adds a new note to the specified folder.

        Args:
            post_request (PostNoteRequest): 
            Object containing the folder_id, title, content and bookmark fields for a new note.
            - folder_id (str): The ID of the folder to which the note will be added to.
            - title (str): The title of the note.
            - content (str): The content of the note.
            - bookmark (bool): A boolean indicating if the note is boomarked or not.

        Returns:
            dict or Status.NOT_FOUND: 
            - If the folder with the specified ID is found and the note is successfully added,
              returns a dictionary representing the new note.
            - If the folder is not found, returns Status.NOT_FOUND.
        """
        note = self.__construct_note_object(post_request)
        note.set_content_path()
        folder_structure = self.json_manager.load(self.folders_path)
        folders = folder_structure['folders']
        new_note = self.note_manager.add_note(folders, post_request.folder_id, note)
        
        if new_note:
            self.json_manager.update(self.folders_path, folder_structure)
            return new_note
        return Status.NOT_FOUND
    
    

    def update_note(self, put_request: PutNoteRequest):
        """
        Updates an existing note with the specified details.

        Args:
            put_request (PutNoteRequest): 
            Object containing the note_id, title, content and bookmark fields for a new note.
            - note_id (str): The ID of the note that will be updated.
            - title (str): The title of the note.
            - content (str): The content of the note.
            - bookmrk (bool): A boolean indicating if the note is boomarked or not.

        Returns:
            dict or Status.NOT_FOUND: 
            - If a note with the specified ID is found and successfully updated,
              returns a dictionary representing the updated note.
            - If the note is not found, returns Status.NOT_FOUND.
        """
        folder_structure = self.json_manager.load(self.folders_path)
        folders = folder_structure['folders']
        note = self.note_manager.update_note(folders, put_request.note_id, put_request)[1]

        if note:
            self.json_manager.update(self.folders_path, folder_structure)
            return note 
        return Status.NOT_FOUND
    


    def delete_note(self, delete_request: DeleteNoteRequest):
        """
        Delete an existing note within a specified folder.

        Args:
            delete_request (DeleteNoteRequest): 
            Object containing the folder_id and note_id.
            - folder_id (str): The ID of the folder the note is in.
            - note_id (str): The ID of the note whished to be deleted.

        Returns:
            Status: 
            - If the note is successfully deleted, it returns 'OK'.
            - If the specified folder or note is not found, it returns 'NOT_FOUND'.
        """
        folder_structure = self.json_manager.load(self.folders_path)
        folders = folder_structure['folders']
        deleted_note = self.note_manager.delete_note(folders, delete_request.note_id)

        if deleted_note:
            self.json_manager.update(self.folders_path, folder_structure)
            return deleted_note
        return Status.NOT_FOUND



    def __construct_note_object(self, post_request: PostNoteRequest):
        note_id = self.json_manager.generateID(self.id_path, "note")
        return Note(
            note_id, 
            post_request.title, 
            post_request.content, 
            post_request.bookmark, 
            )