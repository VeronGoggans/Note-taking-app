from fastapi import APIRouter
from src.backend.presentation.request_bodies.theme.put_theme_request import PutThemeRequest
from src.backend.domain.enums.responseMessages import Status
from src.backend.application.service.util.theme_service import ThemeService

class ThemeRouter:
    def __init__(self, json_manager):
        self.route = APIRouter()
        self.theme_service = ThemeService(json_manager)

        self.route.add_api_route('/theme', self.theme, methods=['GET'])
        self.route.add_api_route('/theme', self.update_theme, methods=['PUT'])

    
    def theme(self):
        response = self.theme_service.get_theme()
        return {"Status_code": Status.OK, "theme": response}
    

    def update_theme(self, theme: PutThemeRequest):
        response = self.theme_service.update_theme(theme)

        if response != Status.NOT_FOUND:
            return {'Status_code': Status.OK, "theme": response}