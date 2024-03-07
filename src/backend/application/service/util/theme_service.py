from src.backend.data.file.json_manager import JsonManager
from src.backend.presentation.request_bodies.theme.put_theme_request import PutThemeRequest
import os 


class ThemeService():
    def __init__(self, json_manager: JsonManager) -> None:
        self.json_manager = json_manager
        self.theme_path = os.getcwd() + '/storage/json/theme.json'

    def get_theme(self):
        theme_object = self.json_manager.load(self.theme_path)
        current_theme = theme_object['theme']
        return current_theme
    
    def update_theme(self, new_theme: PutThemeRequest):
        new_theme = new_theme.theme
        theme_object = self.json_manager.load(self.theme_path)
        theme_object['theme'] = new_theme
        self.json_manager.update(self.theme_path, theme_object)
        return new_theme
