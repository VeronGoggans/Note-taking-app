from src.backend.data.models import NoteBook, NotebookItem
from sqlalchemy.orm import Session
from src.backend.data.helpers import find_entity


class NotebookManager:


    def add_notebook(self, notebook: NoteBook, db: Session) -> NoteBook:
        db.add(notebook)
        db.commit()
        db.refresh(notebook)
        return notebook


    def get_notebooks(self, db: Session) -> list[NoteBook]:
        return db.query(NoteBook).all()

    
    def update_notebook(self, ) -> NoteBook:
        pass


    def delete_notebook(self, id: int, db: Session) -> None:
        notebook = find_entity(id, NoteBook, db)
        db.delete(notebook)
        db.commit()

    
    def add_notebook_item(self, parent_id: int, notebook_item: NotebookItem, db: Session) -> NotebookItem:
        find_entity(parent_id, NoteBook, db)
        db.add(notebook_item)
        db.commit()
        db.refresh(notebook_item)
        return notebook_item


    def get_notebook_items(self, db: Session) -> list[NotebookItem]:
        pass

    
    def update_notebook_item(self, ) -> NotebookItem:
        pass


    def delete_notebook_item(self, id: int, db: Session) -> None:
        pass