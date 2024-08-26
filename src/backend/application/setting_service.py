from src.backend.data.file.json_manager import JsonManager
from src.backend.util.paths import SETTINGS_PATH


class SettingService():
    def __init__(self, json_manager: JsonManager) -> None:
        self.json_manager = json_manager


    def get_theme(self) -> str:
        theme_object = self.json_manager.load(SETTINGS_PATH)
        current_theme = theme_object['theme']
        return current_theme
    

    def update_theme(self, theme: str) -> str:
        theme_object = self.json_manager.load(SETTINGS_PATH)
        theme_object['theme'] = theme
        self.json_manager.update(SETTINGS_PATH, theme_object)
        return theme