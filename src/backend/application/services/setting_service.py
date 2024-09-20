from src.backend.util.paths import SETTINGS_PATH
from json import load, dump


class SettingService():

    def get_theme(self) -> str:
        config_object = self.__get_config()
        return config_object['theme']
    

    def update_theme(self, theme: str) -> str:
        config_object = self.__get_config()
        config_object['theme'] = theme
        self.__update_config(config_object)
        return theme
    

    def __get_config(self) -> str:
        with open(SETTINGS_PATH, 'r') as config:
            return load(config)  


    def __update_config(self, updated_config) -> None:
        with open(SETTINGS_PATH, 'w') as config:
            dump(updated_config, config, indent=4)