from src.backend.util.paths import SETTINGS_PATH


class SettingService():

    def get_theme(self) -> str:
        theme_object = self.json_manager.load(SETTINGS_PATH)
        current_theme = theme_object['theme']
        return current_theme
    

    def update_theme(self, theme: str) -> str:
        theme_object = self.json_manager.load(SETTINGS_PATH)
        theme_object['theme'] = theme
        self.json_manager.update(SETTINGS_PATH, theme_object)
        return theme