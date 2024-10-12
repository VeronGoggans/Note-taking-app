from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.backend.data.database import Database
from src.backend.application.services.sticky_note_service import StickyNoteService
from src.backend.data.managers.sticky_note_manager import StickyNoteManager
from src.backend.presentation.request_bodies.note_requests import PostStickyNoteRequest, PutStickyNoteRequest
from src.backend.presentation.http_status import HttpStatus
from src.backend.data.exceptions.exception_handler import handle_exceptions



class StickyNoteRouter:
    def __init__(self):
        self.route = APIRouter()
        self.service = StickyNoteService(StickyNoteManager())

        self.route.add_api_route('/stickyNote', self.add_sticky_note, methods=['POST'])
        self.route.add_api_route('/stickyNotes', self.get_sticky_notes, methods=['GET'])
        self.route.add_api_route('/stickyNote', self.update_sticky_note, methods=['PUT'])
        self.route.add_api_route('/stickyNote/{id}', self.delete_sticky_note, methods=['DELETE'])

        self.route.add_api_route('/stickyWall', self.add_sticky_wall, methods=['POST'])
        self.route.add_api_route('/stickyWalls', self.get_sticky_walls, methods=['GET'])
        self.route.add_api_route('/stickyWall', self.update_sticky_wall, methods=['PUT'])
        self.route.add_api_route('/stickyWall/{id}', self.delete_sticky_wall, methods=['DELETE'])
        

    @handle_exceptions
    def add_sticky_note(self, request: PostStickyNoteRequest, db: Session = Depends(Database.get_db)):
        return {'status': HttpStatus.OK, 'Object': self.service.add_sticky_note(request, db)}
       

    @handle_exceptions
    def get_sticky_notes(self, db: Session = Depends(Database.get_db)):
        return {'status': HttpStatus.OK, 'Object': self.service.get_sticky_notes(db)}
       

    @handle_exceptions
    def update_sticky_note(self, request: PutStickyNoteRequest, db: Session = Depends(Database.get_db)):
        return {'status': HttpStatus.OK, 'Object': self.service.update_sticky_note(request, db)}
    

    @handle_exceptions
    def delete_sticky_note(self, id: str, db: Session = Depends(Database.get_db)):
        self.service.delete_sticky_note(id, db)
        return {'status': HttpStatus.OK}


    @handle_exceptions
    def add_sticky_wall(self, request: PostStickyNoteRequest, db: Session = Depends(Database.get_db)):
        return {'status': HttpStatus.OK, 'Object': self.service.add_sticky_wall(request, db)}
       

    @handle_exceptions
    def get_sticky_walls(self, db: Session = Depends(Database.get_db)):
        return {'status': HttpStatus.OK, 'Object': self.service.get_sticky_walls(db)}
       

    @handle_exceptions
    def update_sticky_wall(self, request: PutStickyNoteRequest, db: Session = Depends(Database.get_db)):
        return {'status': HttpStatus.OK, 'Object': self.service.update_sticky_wall(request, db)}
    

    @handle_exceptions
    def delete_sticky_wall(self, id: str, db: Session = Depends(Database.get_db)):
        self.service.delete_sticky_wall(id, db)
        return {'status': HttpStatus.OK}