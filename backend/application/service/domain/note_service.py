from backend.data.note.folder_note_manager import FolderNoteManager
from backend.data.note.subfolder_note_manager import SubFolderNoteManager
from backend.presentation.request_bodies.note_request import NoteRequest
from backend.application.generators.Id_generator import IDGenerator
from backend.domain.note import Note

class NoteService:
    def __init__(self, folder_note_manager: FolderNoteManager, subfolder_note_manager: SubFolderNoteManager):
        self.folder_note_manager = folder_note_manager
        self.subfolder_note_manager = subfolder_note_manager



    def get_notes(self, dir_id: int, note_type: str, directory=True):
        if directory:
            return self.folder_note_manager.get_notes(dir_id, note_type)
        return self.subfolder_note_manager.get_notes(dir_id, note_type)
    


    def get_note_by_id(self, note_id: int, directory = True):
        if directory:
            return self.folder_note_manager.get_note_by_id(note_id)
        return self.subfolder_note_manager.get_note_by_id(note_id)
    


    def add_note(self, folder_id: int, note_data: NoteRequest, folder = True):
        note : Note = self.__construct_note_object(note_data)
        note.set_content_path()
        if folder:
            return self.folder_note_manager.add_note(folder_id, note)
        return self.subfolder_note_manager.add_note(folder_id, note)

    

    def update_note(self, note_id: int, updated_note: NoteRequest, directory = True):
        if directory:
            return self.folder_note_manager.update_note(note_id, updated_note)
        return self.subfolder_note_manager.update_note(note_id, updated_note)
    


    def delete_note(self, note_id: int, directory = True):
        if directory:
            return self.folder_note_manager.delete_note(note_id)
        return self.subfolder_note_manager.delete_note(note_id)
    


    def __construct_note_object(self, note_data: NoteRequest):
        note_id = IDGenerator.ID("note")
        return Note(
            note_id, 
            note_data.title, 
            note_data.content, 
            note_data.bookmark, 
            note_data.password_protected
            )