from backend.data.note.note_manager import NoteManager
from backend.presentation.request_bodies.note.post_note_request import PostNoteRequest
from backend.presentation.request_bodies.note.put_note_request import PutNoteRequest
from backend.presentation.request_bodies.note.del_note_request import DeleteNoteRequest
from backend.application.generators.Id_generator import IDGenerator
from backend.domain.note import Note
from backend.data.file.json_manager import Json
from backend.domain.enums.responseMessages import RespMsg
import os 

class NoteService:
    def __init__(self, note_manager: NoteManager):
        self.note_manager = note_manager
        self.folders_path = os.getcwd() + '/storage/json/notes.json'



    def get_notes(self, folder_id: int, note_type: str):
        folder_structure = Json.load(self.folders_path)
        folders = folder_structure['folders']
        notes = self.note_manager.get_notes(folders, folder_id, note_type)

        if notes is not None:
            return notes
        return RespMsg.NOT_FOUND



    def get_note_by_id(self, note_id: int):
        folders = Json.load(self.folders_path)['folders']
        note = self.note_manager.get_note_by_id(folders, note_id)
        if note:
            return note
        return RespMsg.NOT_FOUND
    


    def add_note(self, post_request: PostNoteRequest):
        note : Note = self.__construct_note_object(post_request)
        note.set_content_path()
        folder_structure = Json.load(self.folders_path)
        folders = folder_structure['folders']
        new_note = self.note_manager.add_note(folders, post_request.folder_id, note)

        if new_note:
            Json.update(self.folders_path, folder_structure)
            return new_note
        return RespMsg.NOT_FOUND
    
    

    def update_note(self, put_request: PutNoteRequest):
        folder_structure = Json.load(self.folders_path)
        folders = folder_structure['folders']
        note = self.note_manager.update_note(folders, put_request.note_id, put_request)

        if note:
            Json.update(self.folders_path, folder_structure)
            return note 
        return RespMsg.NOT_FOUND
    


    def delete_note(self, delete_request: DeleteNoteRequest):
        folder_structure = Json.load(self.folders_path)
        folders = folder_structure['folders']
        deleted_note = self.note_manager.delete_note(folders,delete_request.folder_id, delete_request.note_id)

        if deleted_note:
            Json.update(self.folders_path, folder_structure)
            return RespMsg.OK
        return RespMsg.NOT_FOUND



    def __construct_note_object(self, post_request: PostNoteRequest):
        note_id = IDGenerator.ID("note")
        return Note(
            note_id, 
            post_request.title, 
            post_request.content, 
            post_request.bookmark, 
            post_request.password_protected
            )