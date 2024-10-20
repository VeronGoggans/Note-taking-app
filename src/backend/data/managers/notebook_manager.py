from src.backend.data.models import NoteBook, NotebookItem
from sqlalchemy.orm import Session
from src.backend.data.helpers import find_notebook, find_notebook_item


class NotebookManager:


    def add_notebook(self, notebook: NoteBook, db: Session) -> NoteBook:
        db.add(notebook)
        db.commit()
        db.refresh(notebook)
        return notebook


    def get_notebooks(self, db: Session) -> list[NoteBook]:
        return db.query(NoteBook).all()

    
    def update_notebook(self, id: int, name: str, description: str, db: Session) -> NoteBook:
        notebook = find_notebook(id, db)
        notebook.name = name
        notebook.description = description
        db.commit()
        db.refresh(notebook)
        return notebook


    def delete_notebook(self, id: int, db: Session) -> None:
        notebook = find_notebook(id, db)
        db.delete(notebook)
        db.commit()

    
    def add_notebook_item(self, parent_id: int, notebook_item: NotebookItem, db: Session) -> NotebookItem:
        find_notebook(parent_id, NoteBook, db)
        db.add(notebook_item)
        db.commit()
        db.refresh(notebook_item)
        return notebook_item


    def get_notebook_items(self, parent_id: int, db: Session) -> list[NotebookItem]:
        return db.query(NotebookItem).filter(NotebookItem.id == parent_id).all()


    def delete_notebook_item(self, id: int, db: Session) -> None:
        notebook_item = find_notebook_item(id, db)
        db.delete(notebook_item)
        db.commit()
        