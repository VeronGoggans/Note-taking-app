from sqlalchemy.orm import Session
from src.backend.data.managers.sticky_note_manager import StickyNoteManager
from src.backend.presentation.request_bodies.note_requests import PostStickyNoteRequest, PostStickyWallRequest, PutStickyNoteRequest, PutStickyWallRequest
from src.backend.data.models import StickyNote, StickyWall
from src.backend.data.exceptions.exceptions import *


class StickyNoteService:
    def __init__(self, manager: StickyNoteManager) -> None:
        self.manager = manager


    def add_sticky_note(self, request: PostStickyNoteRequest, db: Session) -> StickyNote:    
        sticky_note = StickyNote(
            name = request.name, 
            content = request.content,
            sticky_wall_id = request.parent_id
            )
        return self.manager.add_sticky(sticky_note, db) 


    def get_sticky_notes(self, sticky_wall_id: int, db: Session) -> list[StickyNote]:
        return self.manager.get_stickies(sticky_wall_id, db)


    def update_sticky_note(self, request: PutStickyNoteRequest, db: Session) -> StickyNote:
        return self.manager.update_sticky(request.id, request.name, request.content, db)


    def delete_sticky_note(self, id: str, db: Session) -> None:
        self.manager.delete_sticky(id, db)



    def add_sticky_wall(self, request: PostStickyWallRequest, db: Session) -> StickyWall:    
        sticky_note = StickyWall(
            name = request.name, 
            description = request.description
            )
        return self.manager.add_sticky_wall(sticky_note, db) 


    def get_sticky_walls(self, db: Session) -> list[StickyWall]:
        return self.manager.get_sticky_walls(db)


    def update_sticky_wall(self, request: PutStickyWallRequest, db: Session) -> StickyWall:
        return self.manager.update_sticky_wall(request.id, request.name, request.description, db)


    def delete_sticky_wall(self, id: str, db: Session) -> None:
        self.manager.delete_sticky_wall(id, db)