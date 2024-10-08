from fastapi import APIRouter
from src.backend.presentation.http_status import HttpStatus
from src.backend.application.services.setting_service import SettingService

class SettingRouter:
    def __init__(self):
        self.route = APIRouter()
        self.service = SettingService()
        
        self.route.add_api_route('/settings', self.get_settings, methods=['GET'])
        self.route.add_api_route('/settings/theme/{theme}', self.update_theme, methods=['PUT'])
        self.route.add_api_route('/settings/sidebarColor/{color}', self.update_sidebar_color, methods=['PUT'])
        

    def get_settings(self):
        return {'status': HttpStatus.OK, 'settings': self.service.get_settings()}
    

    def update_sidebar_color(self, color: str):
        return {'status': HttpStatus.OK, 'color': self.service.update_sidebar_color(color)}


    def update_theme(self, theme: str):
        return {'status': HttpStatus.OK, "theme": self.service.update_theme(theme)}
