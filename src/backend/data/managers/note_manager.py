from src.backend.data.models import Note
from src.backend.data.helpers import find_folder, find_note
from src.backend.presentation.request_bodies.note_requests import *
from src.backend.util.calendar import Calendar
from src.backend.data.exceptions.exceptions import *
from sqlalchemy.orm import Session


class NoteManager:    

    def add(self, folder_id: int, note: Note, db: Session) -> (Note | NotFoundException):
        find_folder(folder_id, db)
        db.add(note)
        db.commit()
        db.refresh(note)
        return note

    
    def get(self, folder_id: int, db: Session) -> (list[Note] | NotFoundException):
        find_folder(folder_id, db)
        return db.query(Note).filter(Note.folder_id == folder_id).all()


    def get_by_id(self, id: int, db: Session) -> (Note | NotFoundException):
        return find_note(id, db)
    

    def get_recent(self, db: Session) -> list[Note]:
        recent_notes = (
            db.query(Note)
            .order_by(Note.last_edit.desc()) 
            .limit(6)
            .all() 
        )
        return recent_notes


    def get_name_id(self, db: Session) -> list[dict]:
        search_items = (db.query(Note.id, Note.name).all())
        return [{"id": item.id, "name": item.name} for item in search_items]
    

    def get_bookmarks(self, db: Session) -> list[Note]:
        return db.query(Note).filter(Note.bookmark == True).all()
               

    def update(self, id: int, name: str, content: str, bookmark: bool, db: Session) -> (Note | NotFoundException):
        note = find_note(id, db)

        # Updating the note 
        note.name = name
        note.content = content
        note.bookmark = bookmark
        note.last_edit = Calendar.datetime()

        # Commiting the changes to the database
        db.commit()
        db.refresh(note)
        return note


    def move(self, parent_id: int, note_id: int, db: Session) -> None:
        find_folder(parent_id, db)
        note = find_note(note_id, db)
        note.folder_id = parent_id
        db.commit()


    def delete(self, id: int, db: Session) -> Note:
        note = find_note(id, db)
        db.delete(note)
        db.commit()
        return note