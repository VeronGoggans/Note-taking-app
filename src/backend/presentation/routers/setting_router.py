from fastapi import APIRouter
from src.backend.presentation.http_status import HttpStatus
from src.backend.application.services.setting_service import SettingService

class SettingRouter:
    def __init__(self):
        self.route = APIRouter()
        self.service = SettingService()

        self.route.add_api_route('/settings/theme', self.get_theme, methods=['GET'])
        self.route.add_api_route('/settings/theme/{theme}', self.update_theme, methods=['PUT'])
        
    
    def get_theme(self):
        return {"status": HttpStatus.OK, "theme": self.service.get_theme()}
    

    def update_theme(self, theme: str):
        return {'status': HttpStatus.OK, "theme": self.service.update_theme(theme)}