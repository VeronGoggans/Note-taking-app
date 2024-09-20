from sqlalchemy.orm import Session
from src.backend.data.managers.sticky_note_manager import StickyNoteManager
from src.backend.presentation.request_bodies.note_requests import PostStickyNoteRequest, PutStickyNoteRequest
from src.backend.data.models import StickyNote
from src.backend.data.exceptions.exceptions import *


class StickyNoteService:
    def __init__(self, manager: StickyNoteManager) -> None:
        self.manager = manager


    def add_sticky_note(self, request: PostStickyNoteRequest, db: Session) -> StickyNote:    
        sticky_note = StickyNote(
            name = request.name, 
            content = request.content
            )
        return self.manager.add(sticky_note, db) 


    def get_sticky_notes(self, db: Session) -> list[StickyNote]:
        return self.manager.get(db)


    def update_sticky_note(self, request: PutStickyNoteRequest, db: Session) -> StickyNote:
        return self.manager.update(request.id, request.name, request.content, db)


    def delete_sticky_note(self, id: str, db: Session) -> None:
        self.manager.delete(id, db)