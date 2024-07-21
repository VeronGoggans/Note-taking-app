from src.backend.data.note.note_manager import NoteManager
from src.backend.presentation.request_bodies.note.post_note_request import PostNoteRequest
from src.backend.presentation.request_bodies.note.put_note_request import PutNoteRequest
from src.backend.presentation.request_bodies.note.move_note_request import MoveNoteRequest
from src.backend.domain.note import Note
from src.backend.data.exceptions.exceptions import NotFoundException, AdditionException
from src.backend.data.file.json_manager import JsonManager
from os import getcwd 


class NoteService:
    def __init__(self, note_manager: NoteManager, json_manager: JsonManager):
        self.note_manager = note_manager
        self.json_manager = json_manager
        self.BASE_URL = getcwd()
        self.folders_path = f'{self.BASE_URL}/storage/json/notes.json'
        self.id_path = f'{self.BASE_URL}/storage/json/id.json'


    def add_note(self, post_request: PostNoteRequest):
        """
        Adds a new note to the specified folder.

        Args:
            post_request (PostNoteRequest): 
            Object containing the folder_id, name and content fields for a new note.

        Returns:
            dict or HttpStatus.NOT_FOUND: 
            - If the folder with the specified ID is found and the note is successfully added,
              returns a dictionary representing the new note.
            - If the folder is not found, returns HttpStatus.NOT_FOUND.
        """
        note_id = self.json_manager.generate_id(self.id_path, 'note')
        note = Note(note_id, post_request.name, post_request.content)
        note.set_content_path()

        folders = self.json_manager.load(self.folders_path)
        try:
            note = self.note_manager.add_note(folders, post_request.folder_id, note)
            self.json_manager.update(self.folders_path, folders)
            return note
        except AdditionException as e:
            raise e


    def get_notes(self, folder_id: str):
        """
        Retrieves notes from the specified folder.

        Args:
            folder_id (int): The id of the folder from which to retrieve notes.

        Returns:
            list(dict) or HttpStatus.NOT_FOUND: 
            - A list of notes if the folder with the specified id is found 
            - HttpStatus.NOT_FOUND if the folder is not found returns .
        """
        folders = self.json_manager.load(self.folders_path)
        notes = None
        try:
            if folder_id == 'f-2':
                notes = self.note_manager.get_favorites(folders)
                self.note_manager.clear_favorites_list()
            else:
                notes = self.note_manager.get_notes(folders, folder_id)
            return notes
        except NotFoundException as e:
            raise e


    def get_note_by_id(self, note_id: str):
        """
        Retrieves a note with the specified id.

        Args:
            note_id (int): The id of the note to retrieve.

        Returns:
            dict or HttpStatus.NOT_FOUND: 
            - If a note with the specified id is found, returns the note as a dictionary.
            - If the note is not found, returns HttpStatus.NOT_FOUND.
        """
        folders = self.json_manager.load(self.folders_path)
        try:
            note = self.note_manager.get_note_by_id(folders, note_id)
            return note
        except NotFoundException as e:
            raise e


    def update_note(self, put_request: PutNoteRequest):
        """
        Updates an existing note with the specified details.

        Args:
            put_request (PutNoteRequest): 
            Object containing the note_id, name, content, bookmark, 
            favorite and color fields of a note.

        Returns:
            dict or HttpStatus.NOT_FOUND: 
            - If a note with the specified ID is found and successfully updated,
              returns a dictionary representing the updated note.
            - If the note is not found, returns HttpStatus.NOT_FOUND.
        """
        folders = self.json_manager.load(self.folders_path)
        try:
            note = self.note_manager.update_note(folders, put_request)
            self.json_manager.update(self.folders_path, folders)
            return note 
        except NotFoundException as e:
            raise e


    def delete_note(self, note_id: str):
        """
        Delete an existing note within a specified folder.

        Args:
            - note_id (str): The ID of the note whished to be deleted.

        Returns:
            - If the note is successfully deleted, it returns the note.
            - If the specified folder or note is not found, it returns 'NOT_FOUND'.
        """
        folders = self.json_manager.load(self.folders_path)
        try:
            note = self.note_manager.delete_note(folders, note_id)
            self.json_manager.update(self.folders_path, folders)
            return note
        except NotFoundException as e:
            raise e


    def move_note(self, move_request: MoveNoteRequest):
        """
        Moves a note from it's current folder into 
        another folder specified with it's ID.

        Args:
            move_request (MoveNoteRequest): 
            - folder_id (str): The ID of the folder to which the note will be added to.
            - name (str): The name of the note.

        Returns:
            dict or HttpStatus.NOT_FOUND: 
            - If a note with the specified ID is found, returns the note as a dictionary.
            - If the note is not found, returns HttpStatus.NOT_FOUND.
        """
        folders = self.json_manager.load(self.folders_path)
        try:
            deleted_note = self.note_manager.delete_note(folders, move_request.note_id, delete_txt_file=False)
            deleted_note_object = Note.from_json(deleted_note)

            new_note = self.note_manager.add_note(folders, move_request.folder_id, deleted_note_object)
            self.json_manager.update(self.folders_path, folders)
            return new_note
        except (NotFoundException, AdditionException) as e:
            raise e
    

    def get_cache(self):
        try:
            content = self.json_manager.load(self.folders_path)
            return content
        except OSError as e:
            raise e

    def get_search_options(self):
        folders = self.json_manager.load(self.folders_path)
        notes = self.note_manager.get_note_name_id(folders)

        if len(notes) > 0:
            self.note_manager.clear_search_options_list()
            return notes
        return None 