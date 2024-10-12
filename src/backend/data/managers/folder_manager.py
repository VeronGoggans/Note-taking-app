from sqlalchemy.orm import Session
from src.backend.data.models import Folder
from src.backend.data.helpers import find_folder, get_folder_hierarchy
from src.backend.data.exceptions.exceptions import NotFoundException, InsertException
from datetime import datetime

class FolderManager:

    def add(self, parent_id: int, folder: Folder, db: Session) -> (Folder | NotFoundException | InsertException):
        find_folder(parent_id, db)
        db.add(folder)
        db.commit()
        db.refresh(folder)
        return folder
    

    def get(self, parent_id: int, db: Session) -> (list[Folder] | NotFoundException):
        find_folder(parent_id, db)
        return db.query(Folder).filter(Folder.parent_id == parent_id).all()
        

    def get_recent(self, db: Session) -> list:
        recent_folders = (
            db.query(Folder)
            .order_by(Folder.last_visit.desc()) 
            .limit(4) 
            .all()  
        )
        return recent_folders
    

    def get_search_items(self, db: Session) -> list:
        search_items = (db.query(Folder.id, Folder.name).all() )
        return [{"id": item.id, "name": item.name} for item in search_items]


    def get_by_id(self, folder_id: int, db: Session) -> (Folder | NotFoundException):
        folder = find_folder(folder_id, db)
        hierarchy = get_folder_hierarchy(folder_id, db)
        return folder, hierarchy
    

    def update(self, folder_id: int, folder_name: str, folder_color: str, db: Session) -> (Folder | NotFoundException):
        folder = find_folder(folder_id, db)
        folder.name = folder_name
        folder.color = folder_color

        db.commit()
        db.refresh(folder)
        return folder
    

    def move(self, parent_id: int, folder_id: int, db: Session) -> ( Folder | NotFoundException ):
        # Check if the new parent even exists
        find_folder(parent_id, db)

        folder = find_folder(folder_id, db)
        folder.parent_id = parent_id

        db.commit()
        db.refresh(folder)
        return folder
    

    def update_visit_date(self, folder_id: int, db: Session) -> (None | NotFoundException):
        folder = find_folder(folder_id, db)
        folder.last_visit = datetime.now()
        db.commit()
        

    def delete(self, folder_id: int, db: Session) -> (Folder | NotFoundException):
        folder = find_folder(folder_id, db)
        db.delete(folder)
        db.commit()
        return folder
    