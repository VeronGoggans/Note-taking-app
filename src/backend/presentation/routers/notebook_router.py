from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.backend.data.database import Database
from src.backend.application.services.notebook_service import NotebookService
from src.backend.data.managers.notebook_manager import NotebookManager
from src.backend.presentation.request_bodies.notebook_requests import *
from src.backend.presentation.http_status import HttpStatus
from src.backend.data.exceptions.exception_handler import handle_exceptions



class NotebookRouter:
    def __init__(self):
        self.route = APIRouter()
        self.service = NotebookService(NotebookManager())

        self.route.add_api_route('/notebook', self.add_notebook, methods=['POST'])
        self.route.add_api_route('/notebooks', self.get_notebooks, methods=['GET'])
        self.route.add_api_route('/notebook', self.update_notebook, methods=['PUT'])
        self.route.add_api_route('/notebook/{id}', self.delete_notebook, methods=['DELETE'])

        self.route.add_api_route('/notebookItem', self.add_notebook_item, methods=['POST'])
        self.route.add_api_route('/notebookItems', self.get_notebook_items, methods=['GET'])
        self.route.add_api_route('/notebookItem/{id}', self.delete_noteboook_item, methods=['DELETE'])
        

    @handle_exceptions
    def add_notebook(self, request: PostNotebookRequest, db: Session = Depends(Database.get_db)):
        return {'status': HttpStatus.OK, 'Object': self.service.add_notebook(request, db)}
       

    @handle_exceptions
    def get_notebooks(self, db: Session = Depends(Database.get_db)):
        return {'status': HttpStatus.OK, 'Object': self.service.get_notebooks(db)}
       

    @handle_exceptions
    def update_notebook(self, request: PutNotebookRequest, db: Session = Depends(Database.get_db)):
        return {'status': HttpStatus.OK, 'Object': self.service.update_notebooks(request, db)}
    

    @handle_exceptions
    def delete_notebook(self, id: str, db: Session = Depends(Database.get_db)):
        self.service.delete_notebook(id, db)
        return {'status': HttpStatus.OK}


    @handle_exceptions
    def add_notebook_item(self, request: PostNotebookItemRequest, db: Session = Depends(Database.get_db)):
        return {'status': HttpStatus.OK, 'Object': self.service.add_notebook(request, db)}
       

    @handle_exceptions
    def get_notebook_items(self, db: Session = Depends(Database.get_db)):
        return {'status': HttpStatus.OK, 'Object': self.service.get_notebook_items(db)}
       

    @handle_exceptions
    def delete_noteboook_item(self, id: str, db: Session = Depends(Database.get_db)):
        self.service.delete_notebook_item(id, db)
        return {'status': HttpStatus.OK}