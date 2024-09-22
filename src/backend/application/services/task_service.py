from sqlalchemy.orm import Session
from src.backend.data.managers.task_manager import TaskManager
from src.backend.data.models import Task
from src.backend.data.exceptions.exceptions import *


class TaskService:
    def __init__(self, manager: TaskManager) -> None:
        self.manager = manager


    def add_task(
            self, 
            parent_id: int,
            name: str, 
            description: str, 
            due_date: str,
            db: Session) -> ( Task | NotFoundException ):
        
        task = Task(
            name = name, 
            description = description,
            due_date = due_date,
            taskboard_id = parent_id
            )
        return self.manager.add(parent_id, task, db)
    

    def get_tasks(self, parent_id: int, db: Session) -> ( list[Task] | NotFoundException ):
        return self.manager.get(parent_id, db)
    

    def get_task_by_id(self, id: str, db: Session) -> ( Task | NotFoundException ):
        return self.manager.get_by_id(id, db)
        

    def update_task(
            self, 
            id: int, 
            name: str, 
            description: str,
            due_date: str,
            section: str, 
            db: Session) -> ( Task | NotFoundException ):
        return self.manager.update(id, name, description, section, due_date, db)


    def delete_task(self, id: int, db: Session) -> ( Task | NotFoundException ):
        return self.manager.delete(id, db)