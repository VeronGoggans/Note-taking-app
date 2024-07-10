from src.backend.data.note.note_manager import NoteManager
from src.backend.presentation.request_bodies.note.post_note_request import PostNoteRequest
from src.backend.presentation.request_bodies.note.put_note_request import PutNoteRequest
from src.backend.presentation.request_bodies.note.move_note_request import MoveNoteRequest
from src.backend.domain.note import Note
from src.backend.domain.enums.responseMessages import Status
from src.backend.data.file.json_manager import JsonManager
from os import getcwd 
import copy

class NoteService:
    def __init__(self, note_manager: NoteManager, json_manager: JsonManager):
        self.note_manager = note_manager
        self.json_manager = json_manager
        self.BASE_URL = getcwd()
        self.folders_path = f'{self.BASE_URL}/storage/json/notes.json'
        self.id_path = f'{self.BASE_URL}/storage/json/id.json'


    def get_notes(self, folder_id: str):
        """
        Retrieves notes from the specified folder.

        Args:
            folder_id (int): The id of the folder from which to retrieve notes.

        Returns:
            list(dict) or Status.NOT_FOUND: 
            - A list of notes if the folder with the specified id is found 
            - Status.NOT_FOUND if the folder is not found returns .
        """
        folders = self.json_manager.load(self.folders_path)['folders']
        notes = None

        if folder_id == 'f-2':
            notes = self.note_manager.get_favorites(folders)
            self.note_manager.clear_favorites_list()
        else:
            notes = self.note_manager.get_notes(folders, folder_id)

        if notes is not None:
            return notes
        return Status.NOT_FOUND


    def get_note_by_id(self, note_id: str):
        """
        Retrieves a note with the specified id.

        Args:
            note_id (int): The id of the note to retrieve.

        Returns:
            dict or Status.NOT_FOUND: 
            - If a note with the specified id is found, returns the note as a dictionary.
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
            Object containing the folder_id, name and content fields for a new note.

        Returns:
            dict or Status.NOT_FOUND: 
            - If the folder with the specified ID is found and the note is successfully added,
              returns a dictionary representing the new note.
            - If the folder is not found, returns Status.NOT_FOUND.
        """
        note_id = self.json_manager.generateID(self.id_path, 'note')
        note = Note(note_id, post_request.name, post_request.content)
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
            Object containing the note_id, name, content, bookmark, 
            favorite and color fields of a note.

        Returns:
            dict or Status.NOT_FOUND: 
            - If a note with the specified ID is found and successfully updated,
              returns a dictionary representing the updated note.
            - If the note is not found, returns Status.NOT_FOUND.
        """
        folder_structure = self.json_manager.load(self.folders_path)
        folders = folder_structure['folders']
        note = self.note_manager.update_note(folders, put_request)

        if note:
            self.json_manager.update(self.folders_path, folder_structure)
            return note 
        return Status.NOT_FOUND


    def delete_note(self, note_id: str):
        """
        Delete an existing note within a specified folder.

        Args:
            - note_id (str): The ID of the note whished to be deleted.

        Returns:
            - If the note is successfully deleted, it returns the note.
            - If the specified folder or note is not found, it returns 'NOT_FOUND'.
        """
        folder_structure = self.json_manager.load(self.folders_path)
        folders = folder_structure['folders']
        deleted_note = self.note_manager.delete_note(folders, note_id)

        if deleted_note:
            self.json_manager.update(self.folders_path, folder_structure)
            return deleted_note
        return Status.NOT_FOUND


    def move_note(self, move_request: MoveNoteRequest):
        """
        Moves a note from it's current folder into 
        another folder specified with it's ID.

        Args:
            move_request (MoveNoteRequest): 
            - folder_id (str): The ID of the folder to which the note will be added to.
            - name (str): The name of the note.

        Returns:
            dict or Status.NOT_FOUND: 
            - If a note with the specified ID is found, returns the note as a dictionary.
            - If the note is not found, returns Status.NOT_FOUND.
        """
        folder_structure = self.json_manager.load(self.folders_path)
        folders = folder_structure['folders']
        folders_copy = copy.deepcopy(folder_structure)

        try:
            deleted_note = self.note_manager.delete_note(folders, move_request.note_id, delete_txt_file=False)
            deleted_note_object = Note.from_json(deleted_note)
        except Exception as e:
            return Status.NOT_FOUND
        
        new_note = self.note_manager.add_note(folders, move_request.folder_id, deleted_note_object)

        if new_note:
            self.json_manager.update(self.folders_path, folder_structure)
            return new_note
        self.json_manager.update(self.folders_path, folders_copy)
        return Status.NOT_FOUND
    

    def get_cache(self):
        try:
            content = self.json_manager.load(self.folders_path)
            return content
        except OSError as e:
            return Status.INTERAL_SERVER_ERROR


    def get_search_options(self):
        folders = self.json_manager.load(self.folders_path)['folders']
        notes = self.note_manager.get_note_name_id(folders)

        if len(notes) > 0:
            self.note_manager.clear_search_options_list()
            return notes
        return Status.INTERAL_SERVER_ERROR