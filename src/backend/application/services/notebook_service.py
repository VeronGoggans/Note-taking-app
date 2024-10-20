from src.backend.data.managers.notebook_manager import NotebookManager
from src.backend.presentation.request_bodies.notebook_requests import *
from src.backend.data.models import NoteBook, NotebookItem
from sqlalchemy.orm import Session



class NotebookService:
    def __init__(self, manager: NotebookManager) -> None:
        self.manager = manager

    def add_notebook(self, request: PostNotebookRequest, db: Session) -> NoteBook:
        notebook = NoteBook(
            name = request.name,
            description = request.description
        )
        return self.manager.add_notebook(notebook, db)
    

    def get_notebooks(self, db: Session) -> list[NoteBook]:
        return self.manager.get_notebooks(db)
    

    def update_notebooks(self, request: PutNotebookRequest, db: Session) -> NoteBook:
        return self.manager.update_notebook(request.id, request.name, request.description, db)
    

    def delete_notebook(self, id: int, db: Session) -> None:
        self.manager.delete_notebook(id, db)
    

    def add_notebook_item(self, request: PostNotebookItemRequest, db: Session) -> NotebookItem:
        parent_id = request.parent_id
        notebook_item = NotebookItem(
            linked_entity_id = request.linked_entity_id,
            linked_entity_type = request.linked_entity_type,
            linked_entity_name = request.linked_entity_name,
            notebook_id = parent_id
        )
        self.manager.add_notebook_item(parent_id, notebook_item, db)


    def get_notebook_items(self, parent_id: int, db: Session) -> list[NotebookItem]:
        return self.manager.get_notebook_items(parent_id, db)
    

    def delete_notebook_item(self, id: int, db: Session) -> None:
        self.manager.delete_notebook_item(id, db)
