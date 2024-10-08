from src.backend.data.note.note_manager import NoteManager
from src.backend.presentation.request_bodies.note_requests import PostNoteRequest, PutNoteRequest
from src.backend.domain.note import Note
from src.backend.data.exceptions.exceptions import *
from src.backend.data.file.json_manager import JsonManager
from src.backend.util.paths import FOLDERS_PATH


class NoteService:
    def __init__(self, note_manager: NoteManager, json_manager: JsonManager):
        self.note_manager = note_manager
        self.json_manager = json_manager


    def add_note(self, request: PostNoteRequest) -> Note:
        note_id = self.json_manager.generate_id('note')
        note = Note(note_id, request.name, request.content)
        note.set_content_path()

        folders = self.json_manager.load(FOLDERS_PATH)
        try:
            note = self.note_manager.add_note(folders, request.folder_id, note)
            self.json_manager.update(FOLDERS_PATH, folders)
            return note
        except AdditionException as e:
            raise e


    def get_notes(self, folder_id: str) -> list[Note]:
        folders = self.json_manager.load(FOLDERS_PATH)
        try:
            if folder_id == 'bookmarks':
                return self.note_manager.get_bookmarks(folders, bookmarks = [])
            return self.note_manager.get_notes(folders, folder_id)
        except NotFoundException as e:
            raise e


    def get_note_by_id(self, note_id: str) -> Note:
        folders = self.json_manager.load(FOLDERS_PATH)
        try:
            return self.note_manager.get_note_by_id(folders, note_id)
        except NotFoundException as e:
            raise e
        
    
    def get_recent_notes(self) -> list[Note]:
        json_folders = self.json_manager.load(FOLDERS_PATH)
        notes = self.note_manager.get_recent_notes(json_folders, notes_list = [])
        return self.note_manager.get_top_6_most_recent_notes(notes)
    

    def update_note(self, request: PutNoteRequest) -> Note:
        folders = self.json_manager.load(FOLDERS_PATH)
        try:
            note = self.note_manager.update_note(folders, request)
            self.json_manager.update(FOLDERS_PATH, folders)
            return note 
        except NotFoundException as e:
            raise e


    def delete_note(self, note_id: str) -> Note:
        folders = self.json_manager.load(FOLDERS_PATH)
        try:
            note = self.note_manager.delete_note(folders, note_id)
            self.json_manager.update(FOLDERS_PATH, folders)
            return note
        except NotFoundException as e:
            raise e


    def move_note(self, folder_id: str, note_id: str) -> Note:
        folders = self.json_manager.load(FOLDERS_PATH)
        try:
            deleted_note = self.note_manager.delete_note(folders, note_id, delete_txt_file=False)
            note_object_to_move = Note.from_json(deleted_note)

            new_note = self.note_manager.add_note(folders, folder_id, note_object_to_move)
            self.json_manager.update(FOLDERS_PATH, folders)
            return new_note
        except (NotFoundException, AdditionException) as e:
            raise e
    

    def get_cache(self) -> dict:
        try:
            content = self.json_manager.load(FOLDERS_PATH)
            return content
        except OSError as e:
            raise e


    def get_search_options(self) -> list[object]:
        folders = self.json_manager.load(FOLDERS_PATH)
        return self.note_manager.get_note_name_id(folders, search_items = [])
