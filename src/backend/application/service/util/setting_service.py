from src.backend.data.file.json_manager import JsonManager
from src.backend.presentation.request_bodies.settings.put_theme_request import PutThemeRequest
from src.backend.presentation.request_bodies.settings.put_editor_page_style_request import PutEditorPageStyleRequest
import os 


class SettingService():
    def __init__(self, json_manager: JsonManager) -> None:
        self.json_manager = json_manager
        self.settings_path = os.getcwd() + '/storage/json/settings.json'

    def get_theme(self):
        theme_object = self.json_manager.load(self.settings_path)
        current_theme = theme_object['theme']
        return current_theme
    
    def update_theme(self, new_theme: PutThemeRequest):
        new_theme = new_theme.theme
        theme_object = self.json_manager.load(self.settings_path)
        theme_object['theme'] = new_theme
        self.json_manager.update(self.settings_path, theme_object)
        return new_theme
    
    def get_editor_page_style(self):
        settings_object = self.json_manager.load(self.settings_path)
        current_style = settings_object['editor-page-style']
        return current_style
    
    def update_editor_page_style(self, new_style: PutEditorPageStyleRequest):
        new_style = new_style.style
        settings_object = self.json_manager.load(self.settings_path)
        settings_object['editor-page-style'] = new_style
        self.json_manager.update(self.settings_path, settings_object)
        return new_style