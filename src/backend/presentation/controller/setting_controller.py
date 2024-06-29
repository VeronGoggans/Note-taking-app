from fastapi import APIRouter
from src.backend.domain.enums.responseMessages import Status
from src.backend.application.setting_service import SettingService

class SettingRouter:
    def __init__(self, json_manager):
        self.route = APIRouter()
        self.setting_service = SettingService(json_manager)

        self.route.add_api_route('/settings/theme', self.theme, methods=['GET'])
        self.route.add_api_route('/settings/theme/{theme}', self.update_theme, methods=['PUT'])
        
    
    def theme(self):
        response = self.setting_service.get_theme()
        return {"Status_code": Status.OK, "theme": response}
    

    def update_theme(self, theme: str):
        response = self.setting_service.update_theme(theme)
        return {'Status_code': Status.OK, "theme": response}