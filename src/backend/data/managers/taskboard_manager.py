from sqlalchemy.orm import Session
from src.backend.data.models import Taskboard
from src.backend.presentation.request_bodies.taskboard_requests import *
from src.backend.data.exceptions.exceptions import NotFoundException


class TaskboardManager:    

    def add(self, taskboard: Taskboard, db: Session) -> Taskboard:
        db.add(taskboard)
        db.commit()
        db.refresh(taskboard)
        return taskboard


    def get(self, db: Session) -> list[Taskboard]:
        return db.query(Taskboard).all()
    

    def get_by_id(self, id: int, db: Session) -> ( Taskboard | NotFoundException ):
        return self.__find_taskboard(id, db)


    def update(self, id: int, name: str, description: str, db: Session) -> ( None | NotFoundException ):
        taskboard = self.__find_taskboard(id, db)
        taskboard.name = name
        taskboard.description = description

        db.commit()
        db.refresh(taskboard)
    

    def delete(self, id: int, db: Session) -> ( Taskboard | NotFoundException ):
        taskboard = self.__find_taskboard(id, db)
        db.delete(taskboard)
        db.commit()
        return taskboard


    def __find_taskboard(self, id: int, db: Session) -> ( Taskboard | NotFoundException ):
        taskboard = db.query(Taskboard).filter(Taskboard.id == id).first()

        if taskboard is None:
            raise NotFoundException(f"Taskboard with id {id} not found.")
        return taskboard