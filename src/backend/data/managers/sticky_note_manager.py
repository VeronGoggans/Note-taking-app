from sqlalchemy.orm import Session
from src.backend.data.models import StickyNote
from src.backend.data.exceptions.exceptions import InsertException, NotFoundException, NoContentException


class StickyNoteManager:    

    def add(self, sticky_note: StickyNote, db: Session) -> (StickyNote | InsertException):
        db.add(sticky_note)
        db.commit()
        db.refresh(sticky_note)
        return sticky_note


    def get(self, db: Session):
        sticky_notes = db.query(StickyNote).all()

        if not sticky_notes:
            raise NoContentException('There are no sticky notes yet.')
        return sticky_notes


    def update(self, id: int, name: str, content: str, db: Session) -> (StickyNote | NotFoundException):
        sticky_note = self.__find_sticky_note(id, db)
        sticky_note.name = name
        sticky_note.content = content

        db.commit()
        db.refresh(sticky_note)
        return sticky_note


    def delete(self, id: int, db: Session) -> (None | NotFoundException):
        sticky_note = self.__find_sticky_note(id, db)

        db.delete(sticky_note)
        db.commit()


    def __find_sticky_note(self, id: int, db: Session) -> ( StickyNote | NotFoundException ):
        sticky_note = db.query(StickyNote).filter(StickyNote.id == id).first()

        if sticky_note is None:
            raise NotFoundException(f'Sticky note with id {id} not found.')
        return sticky_note
