import os
from backend.data.file.json_manager import Json
from backend.domain.enums.responseMessages import RespMsg


class SubfolderPasswordManager:
    def __init__(self):
        self.notes_relative_path = os.getcwd() + '/storage/json/notes.json'

    def add_password(self, folder_id: int, subfolder_id: int, psw_hash: str):
        data = Json.load_json_file(self.notes_relative_path)

        for folder in data['categories']:
            if folder['id'] == folder_id:
                for subfolder in folder['subcategories']:
                    if subfolder['id'] == subfolder_id:
                        subfolder['password_protected'] = True
                        subfolder['password'] = psw_hash
                        Json.update_json_file(self.notes_relative_path, data)
                        return RespMsg.OK
        return RespMsg.NOT_FOUND
    
    
    def get_password_by_id(self, folder_id: int, subfolder_id: int):
        pass

    def update_password(self, folder_id: int, subfolder_id: int, new_psw_hash: str):
        pass

    def delete_password(self, folder_id: int, subfolder_id: int):
        pass
