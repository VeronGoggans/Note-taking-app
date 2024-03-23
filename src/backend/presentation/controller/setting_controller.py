from fastapi import APIRouter
from src.backend.presentation.request_bodies.settings.put_theme_request import PutThemeRequest
from src.backend.presentation.request_bodies.settings.put_editor_page_style_request import PutEditorPageStyleRequest
from src.backend.domain.enums.responseMessages import Status
from src.backend.application.service.util.setting_service import SettingService

class SettingRouter:
    def __init__(self, json_manager):
        self.route = APIRouter()
        self.setting_service = SettingService(json_manager)

        self.route.add_api_route('/settings/theme', self.theme, methods=['GET'])
        self.route.add_api_route('/settings/theme', self.update_theme, methods=['PUT'])
        self.route.add_api_route('/settings/editor-page-style', self.editor_page_style, methods=['GET'])
        self.route.add_api_route('/settings/editor-page-style', self.update_editor_page_style, methods=['PUT'])
        
    
    def theme(self):
        response = self.setting_service.get_theme()
        return {"Status_code": Status.OK, "theme": response}
    

    def update_theme(self, theme: PutThemeRequest):
        response = self.setting_service.update_theme(theme)
        return {'Status_code': Status.OK, "theme": response}
        

    def editor_page_style(self):
        response = self.setting_service.get_editor_page_style()
        return {"status_code": Status.OK, "editor_page_style": response}
    

    def update_editor_page_style(self, style: PutEditorPageStyleRequest):
        response = self.setting_service.update_editor_page_style(style)
        return {'status_code': Status.OK, "editor_page_style": response}