from src.backend.data.note.sticky_note_manager import StickyNoteManager
from src.backend.presentation.request_bodies.note_requests import PostStickyNoteRequest, PutStickyNoteRequest
from src.backend.domain.sticky_note import StickyNote 
from src.backend.data.exceptions.exceptions import *
from src.backend.data.file.json_manager import JsonManager
from src.backend.util.paths import STICKY_NOTES_PATH

class StickyNoteService:
    def __init__(self, manager: StickyNoteManager, json_manager: JsonManager) -> None:
        self.manager = manager
        self.json_manager = json_manager


    def add_sticky_note(self, request: PostStickyNoteRequest) -> StickyNote:    
        object_id = self.json_manager.generate_id('sticky-note')
        sticky_note = StickyNote(object_id, request.name, request.content)

        sticky_notes = self.json_manager.load(STICKY_NOTES_PATH)
        try:
            sticky_note = self.manager.add(sticky_notes, sticky_note)
            self.json_manager.update(STICKY_NOTES_PATH, sticky_notes)
            return sticky_note
        except AdditionException as e:
            raise e


    def get_sticky_notes(self) -> list[object]:
        try:
            return self.json_manager.load(STICKY_NOTES_PATH)
        except Exception as e:
            raise NotFoundException('There were no sticky notes found.', errors=str(e))


    def update_sticky_note(self, request: PutStickyNoteRequest) -> object:
        sticky_notes = self.json_manager.load(STICKY_NOTES_PATH)

        try:
            updated_sticky_note = self.manager.update(sticky_notes, request)
            self.json_manager.update(STICKY_NOTES_PATH, sticky_notes)
            return updated_sticky_note
        except NotFoundException as e:
            raise e 


    def delete_sticky_note(self, id: str) -> None:
        sticky_notes = self.json_manager.load(STICKY_NOTES_PATH)
        
        try:
            self.manager.delete(sticky_notes, id)
            self.json_manager.update(STICKY_NOTES_PATH, sticky_notes)
        except NotFoundException as e:
            raise e 