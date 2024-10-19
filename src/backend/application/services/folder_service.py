from src.backend.data.managers.folder_manager import FolderManager
from sqlalchemy.orm import Session
from src.backend.presentation.request_bodies.folder_requests import *
from src.backend.data.exceptions.exceptions import *
from src.backend.data.models import Folder


class FolderService:
    def __init__(self, manager: FolderManager):
        self.manager = manager


    def add_folder(self, schema: FolderRequest, db: Session) -> Folder:
        new_folder = Folder(
            name = schema.name, 
            color = schema.color, 
            parent_id = schema.parent_id
            )
        return self.manager.add(schema.parent_id, new_folder, db)


    def get_folders(self, parent_id: int, db: Session) -> list[Folder]:
        return self.manager.get(parent_id, db)
    

    def get_recent_folders(self, db: Session) -> list[Folder]:
        return self.manager.get_recent(db)
        

    def get_search_items(self, db: Session) -> list[object]:
        return self.manager.get_search_items(db) 
    

    def get_folder_by_id(self, folder_id: int, db: Session) -> list[Folder]:
        return self.manager.get_by_id(folder_id, db)
        

    def update_folder(self, request: PutFolderRequest, db: Session) -> Folder:
        return self.manager.update(request.folder_id, request.name, request.color, db)
        
        
    def update_visit(self, folder_id: int, db: Session) -> None:
        self.manager.update_visit_date(folder_id, db)
        

    def move_folder(self, request: MoveFolderRequest, db: Session) -> Folder:
        return self.manager.move(request.parent_id, request.folder_id, db)
    

    def delete_folder(self, folder_id: int, db: Session) -> Folder:
        return self.manager.delete(folder_id, db)