from src.backend.data.note.sticky_note_manager import StickyNoteManager
from src.backend.presentation.request_bodies.note_requests import PostStickyNoteRequest, PutStickyNoteRequest
from src.backend.domain.sticky_note import StickyNote 
from src.backend.data.exceptions.exceptions import *
from src.backend.application.decorators.exceptions import check_for_null 


class StickyNoteService:
    def __init__(self, manager: StickyNoteManager) -> None:
        self.manager = manager


    def add_sticky_note(self, request: PostStickyNoteRequest) -> StickyNote:    
        sticky_note = StickyNote(1, request.name, request.content)

        try:
            return self.manager.add(sticky_note) 
        except AdditionException as e:
            raise e


    @check_for_null
    def get_sticky_notes(self) -> list[object]:
        return self.manager.get()


    @check_for_null
    def update_sticky_note(self, request: PutStickyNoteRequest) -> object:
        return self.manager.update(request)



    @check_for_null
    def delete_sticky_note(self, id: str) -> None:
        self.manager.delete(id)