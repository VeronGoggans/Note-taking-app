from sqlalchemy.orm import Session
from src.backend.data.models import StickyNote, StickyWall
from src.backend.data.exceptions.exceptions import InsertException, NotFoundException


class StickyNoteManager:

    def add_sticky(self, sticky_note: StickyNote, db: Session) -> (StickyNote | InsertException):
        db.add(sticky_note)
        db.commit()
        db.refresh(sticky_note)
        return sticky_note


    def get_stickies(self, db: Session):
        return db.query(StickyNote).all()


    def update_sticky(self, id: int, name: str, content: str, db: Session) -> (StickyNote | NotFoundException):
        sticky_note = self.__find_sticky_note(id, db)
        sticky_note.name = name
        sticky_note.content = content
        db.commit()
        db.refresh(sticky_note)
        return sticky_note


    def delete_sticky(self, id: int, db: Session) -> (None | NotFoundException):
        sticky_note = self.__find_sticky_note(id, db)
        db.delete(sticky_note)
        db.commit()

    
    def add_sticky_wall(self, sticky_wall: StickyWall, db: Session) -> StickyWall:
        db.add(sticky_wall)
        db.commit()
        db.refresh(sticky_wall)
        return sticky_wall


    def get_sticky_walls(self, db: Session) -> list[StickyWall]:
        return db.query(StickyWall).all()
    

    def update_sticky_wall(self, id: int, name: str, description: str, db: Session) -> StickyWall:
        sticky_wall = self.__find_sticky_wall(id, db)
        sticky_wall.name = name
        sticky_wall.description = description
        db.commit()
        db.refresh(sticky_wall)
        return sticky_wall


    def delete_sticky_wall(self, id: int, db: Session) -> None:
        sticky_wall = self.__find_sticky_wall(id, db)
        db.delete(sticky_wall)
        db.commit()




    def __find_sticky_wall(self, id: int, db: Session) -> ( StickyWall | NotFoundException ):
        sticky_wall = db.query(StickyWall).filter(StickyWall.id == id).first()

        if sticky_wall is None:
            raise NotFoundException(f'Sticky wall with id {id} not found.')
        return sticky_wall


    def __find_sticky_note(self, id: int, db: Session) -> ( StickyNote | NotFoundException ):
        sticky_note = db.query(StickyNote).filter(StickyNote.id == id).first()

        if sticky_note is None:
            raise NotFoundException(f'Sticky note with id {id} not found.')
        return sticky_note
