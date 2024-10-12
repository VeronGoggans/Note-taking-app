from src.backend.data.managers.focus_session_manager import FocusSessionManager
from src.backend.presentation.request_bodies.focus_session_requests import *
from src.backend.data.models import FocusSession
from sqlalchemy.orm import Session

class FocusSessionService:
    def __init__(self, manager: FocusSessionManager) -> None:
        self.manager = manager


    def add_focus_session(self, request: PostFocusSessionRequest, db: Session) -> FocusSession:
        focus_session = FocusSession(
            name = request.name,
            work_time = request.work_time,
            rest_time = request.rest_time,
            iterations = request.iterations
        )
        return self.manager.add(focus_session, db)
    

    def get_focus_sessions(self, db: Session) -> list[FocusSession]:
        return self.manager.get(db)
    

    def update_focus_sessions(self, request: PutFocusSessionRequest, db: Session) -> FocusSession:
        return self.manager.update(
            request.name, request.work_time, 
            request.rest_time, request.iterations, db
            )
    

    def delete_focus_sessions(self, id: int, db: Session) -> None:
        self.manager.delete(id, db)
