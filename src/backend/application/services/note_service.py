from src.backend.data.note.note_manager import NoteManager
from src.backend.presentation.request_bodies.note_requests import PostNoteRequest, PutNoteRequest
from src.backend.domain.note import Note
from src.backend.data.exceptions.exceptions import *
from src.backend.application.decorators.exceptions import check_for_null 



class NoteService:
    def __init__(self, note_manager: NoteManager):
        self.note_manager = note_manager


    @check_for_null
    def add_note(self, request: PostNoteRequest) -> Note:
        note = Note(1, request.name, request.content)

        try:
            return self.note_manager.add_note(request.folder_id, note)
        except AdditionException as e:
            raise e


    @check_for_null
    def get_notes(self, folder_id: str) -> list[Note]:
        if folder_id == 'bookmarks':
            return self.note_manager.get_bookmarks(bookmarks = [])
        return self.note_manager.get_notes(folder_id)


    @check_for_null
    def get_note_by_id(self, note_id: str) -> Note:
        return self.note_manager.get_note_by_id(note_id)
        
    
    @check_for_null
    def get_recent_notes(self) -> list[Note]:
        return self.note_manager.get_top_6_most_recent_notes()
    

    @check_for_null
    def update_note(self, request: PutNoteRequest) -> Note:
        return self.note_manager.update_note(request)


    @check_for_null
    def delete_note(self, note_id: str) -> Note:
        return self.note_manager.delete_note(note_id)



    @check_for_null
    def move_note(self, folder_id: str, note_id: str) -> Note:
        try:
            pass
        except AdditionException as e:
            raise e


    @check_for_null
    def get_search_options(self) -> list[object]:
        return self.note_manager.get_note_name_id()
