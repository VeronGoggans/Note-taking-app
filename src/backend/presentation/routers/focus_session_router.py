from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.backend.data.database import Database
from src.backend.application.services.focus_session_service import FocusSessionService
from src.backend.data.managers.focus_session_manager import FocusSessionManager
from src.backend.presentation.request_bodies.focus_session_requests import *
from src.backend.presentation.http_status import HttpStatus
from src.backend.data.exceptions.exception_handler import handle_exceptions



class FocusSessionRouter:
    def __init__(self):
        self.route = APIRouter()
        self.service = FocusSessionService(FocusSessionManager())

        self.route.add_api_route('/focusSession', self.add_focus_session, methods=['POST'])
        self.route.add_api_route('/focusSessions', self.get_focus_sessions, methods=['GET'])
        self.route.add_api_route('/focusSession', self.update_focus_session, methods=['PUT'])
        self.route.add_api_route('/focusSession/{id}', self.delete_focus_session, methods=['DELETE'])


    @handle_exceptions
    def add_focus_session(self, request: PostFocusSessionRequest, db: Session = Depends(Database.get_db)):
        return {'status': HttpStatus.OK, 'Object': self.service.add_sticky_note(request, db)}
       

    @handle_exceptions
    def get_focus_sessions(self, db: Session = Depends(Database.get_db)):
        return {'status': HttpStatus.OK, 'Object': self.service.get_sticky_notes(db)}
       

    @handle_exceptions
    def update_focus_session(self, request: PutFocusSessionRequest, db: Session = Depends(Database.get_db)):
        return {'status': HttpStatus.OK, 'Object': self.service.update_sticky_note(request, db)}
    

    @handle_exceptions
    def delete_focus_session(self, id: str, db: Session = Depends(Database.get_db)):
        self.service.delete_sticky_note(id, db)
        return {'status': HttpStatus.OK}