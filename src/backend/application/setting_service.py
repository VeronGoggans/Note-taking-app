from src.backend.data.file.json_manager import JsonManager
import os 


class SettingService():
    def __init__(self, json_manager: JsonManager) -> None:
        self.json_manager = json_manager
        self.settings_path = os.getcwd() + '/storage/json/settings.json'

    def get_theme(self):
        theme_object = self.json_manager.load(self.settings_path)
        current_theme = theme_object['theme']
        return current_theme
    

    def update_theme(self, theme: str):
        theme_object = self.json_manager.load(self.settings_path)
        theme_object['theme'] = theme
        self.json_manager.update(self.settings_path, theme_object)
        return theme
    

    def get_editor_page_style(self):
        settings_object = self.json_manager.load(self.settings_path)
        current_style = settings_object['editor-page-style']
        return current_style
    
    
    def update_editor_page_style(self, style: str):
        settings_object = self.json_manager.load(self.settings_path)
        settings_object['editor-page-style'] = style
        self.json_manager.update(self.settings_path, settings_object)
        return style