from sqlalchemy.orm import Session
from src.backend.data.managers.taskboard_manager import TaskboardManager
from src.backend.data.models import Taskboard
from src.backend.presentation.request_bodies.taskboard_requests import *
from src.backend.data.exceptions.exceptions import *


class TaskboardService:
    def __init__(self, manager: TaskboardManager) -> None:
        self.manager = manager


    def add_taskboard(self, name: str, description: str, db: Session) -> Taskboard:
        taskboard = Taskboard(
            name = name, 
            description = description
            )
        return self.manager.add(taskboard, db)
    

    def get_taskboards(self, db: Session) -> list[Taskboard]:
        return self.manager.get(db)
    

    def get_taskboard_by_id(self, id: str, db: Session) -> Taskboard:
        return self.manager.get_by_id(id, db)
        

    def update_taskboard(self, id: int, name: str, description: str, db: Session) -> None:
        self.manager.update(id, name, description, db)


    def delete_taskboard(self, id: int, db: Session) -> Taskboard:
        return self.manager.delete(id, db)