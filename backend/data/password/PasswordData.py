import os
from backend.domain.enums.AppEntities import AppEntities

class PasswordData:
    def __init__(self) -> None:
        self.notes_relative_path = os.getcwd() + '/storage/json/notes.json'

    def add_password(self, entity_id: int, psw_hash: str, entity: str):
        if entity == 'note':
            pass
        if entity == 'folder':
            pass
        if entity == 'subfolder':
            pass
        

    def get_password_by_id(self, entity_id: int, entity: str):
        pass

    def update_password(self, entity_id: int, entity: str, new_psw_hash):
        pass

    def delete_password(self, entity_id: int, entity: str):
        pass


