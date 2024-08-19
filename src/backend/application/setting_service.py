from src.backend.data.file.json_manager import JsonManager
from os import getcwd


class SettingService():
    def __init__(self, json_manager: JsonManager) -> None:
        self.json_manager = json_manager
        self.settings_path = getcwd() + '/storage/json/settings.json'


    def get_theme(self) -> str:
        theme_object = self.json_manager.load(self.settings_path)
        current_theme = theme_object['theme']
        return current_theme
    

    def update_theme(self, theme: str) -> str:
        theme_object = self.json_manager.load(self.settings_path)
        theme_object['theme'] = theme
        self.json_manager.update(self.settings_path, theme_object)
        return theme