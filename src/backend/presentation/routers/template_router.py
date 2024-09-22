from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.backend.data.database import Database
from src.backend.application.services.template_service import TemplateService
from src.backend.data.managers.template_manager import TemplateManager
from src.backend.presentation.http_status import HttpStatus
from src.backend.presentation.request_bodies.template_requests import *
from src.backend.data.exceptions.exception_handler import handle_exceptions

class TemplateRouter:
    def __init__(self):
        self.route = APIRouter()
        self.service = TemplateService(TemplateManager())

        self.route.add_api_route('/templates', self.get_templates, methods=['GET'])
        self.route.add_api_route('/templateById/{id}/{update_use_count}', self.get_template_by_id, methods=['GET'])
        self.route.add_api_route('/templateNames', self.get_template_names, methods=['GET'])
        self.route.add_api_route('/templateSearchItems', self.get_search_items, methods=['GET'])

        self.route.add_api_route('/template', self.add_template, methods=['POST'])
        self.route.add_api_route('/template', self.update_template, methods=['PUT'])
        self.route.add_api_route('/template/{template_id}', self.delete_template, methods=['DELETE'])


    @handle_exceptions
    def get_templates(self, db: Session = Depends(Database.get_db)):
        recent, other, uses, most_used = self.service.get_templates(db)
        return {'status': HttpStatus.OK, 'recent': recent, 'other': other, 'totalUses': uses, 'mostUsed': most_used}


    @handle_exceptions
    def get_template_by_id(self, id: str, update_use_count: bool, db: Session = Depends(Database.get_db)):
        return {'status': HttpStatus.OK, 'template': self.service.get_template_by_id(id, update_use_count, db)}
        

    @handle_exceptions
    def get_template_names(self, db: Session = Depends(Database.get_db)):
        return {'status': HttpStatus.OK, 'templates': self.service.get_template_names(db)}
    

    @handle_exceptions
    def get_search_items(self, db: Session = Depends(Database.get_db)):
        return {'status': HttpStatus.OK, 'templates': self.service.get_template_names(db)}
    
    
    @handle_exceptions
    def add_template(self, request: PostTemplateRequest, db: Session = Depends(Database.get_db)):
        return {'status': HttpStatus.OK, 'template': self.service.add_template(request, db)}
    

    @handle_exceptions
    def update_template(self, request: PutTemplateRequest, db: Session = Depends(Database.get_db)):
            return {'status': HttpStatus.OK, 'template': self.service.update_template(request, db)}


    @handle_exceptions
    def delete_template(self, template_id: str, db: Session = Depends(Database.get_db)):
        return {'status': HttpStatus.OK, 'template': self.service.delete_template(template_id, db)}  