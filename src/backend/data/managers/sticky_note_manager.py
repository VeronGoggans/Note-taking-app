from src.backend.domain.sticky_note import StickyNote
from src.backend.presentation.request_bodies.note_requests import PutStickyNoteRequest
from src.backend.data.exceptions.exceptions import AdditionException, NotFoundException


class StickyNoteManager:    

    def add(self, sticky_note: StickyNote) -> (StickyNote | AdditionException):
        pass


    def get(self):
        pass


    def update(self, request: PutStickyNoteRequest) -> (dict | NotFoundException):
        pass


    def delete(self, id: str) -> (dict | NotFoundException):
        pass    
