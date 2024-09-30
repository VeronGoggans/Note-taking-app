from sqlalchemy.orm import Session
from src.backend.data.helpers import find_taskboard
from src.backend.data.models import Task
from src.backend.presentation.request_bodies.taskboard_requests import *
from src.backend.data.exceptions.exceptions import NotFoundException


class TaskManager:    

    def add(self, parent_id: int, task: Task, db: Session) -> Task:
        find_taskboard(parent_id, db)
        task.taskboard_id = parent_id
        db.add(task)
        db.commit()
        db.refresh(task)
        return task


    def get(self, parent_id: int, db: Session) -> list[Task]:
        return db.query(Task).filter(Task.taskboard_id == parent_id).all()
    

    def get_by_id(self, id: int, db: Session) -> ( Task | NotFoundException ):
        return self.__find_task(id, db)


    def update(self, id: int, name: str, description: str, section: str, due_date: str, tag: str, db: Session) -> ( Task | NotFoundException ):
        task = self.__find_task(id, db)
        task.name = name
        task.description = description
        task.section = section
        task.due_date = due_date
        task.tag = tag

        db.commit()
        db.refresh(task)
        return task
    

    def delete(self, id: int, db: Session) -> ( Task | NotFoundException ):
        task = self.__find_task(id, db)
        db.delete(task)
        db.commit()
        return task


    def __find_task(self, id: int, db: Session) -> ( Task | NotFoundException ):
        task = db.query(Task).filter(Task.id == id).first()

        if task is None:
            raise NotFoundException(f"Task with id {id} not found.")
        return task