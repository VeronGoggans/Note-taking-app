import os
from backend.data.file.json_manager import Json
from backend.domain.enums.responseMessages import RespMsg


class FolderPasswordManager:
    def __init__(self):
        self.notes_relative_path = os.getcwd() + '/storage/json/notes.json'

    def add_password(self, folder_id: int, psw_hash: str):
        data = Json.load_json_file(self.notes_relative_path)

        for folder in data['categories']:
            if folder['id'] == folder_id:
                folder['password_protected'] = True
                folder['password'] = psw_hash
                Json.update_json_file(self.notes_relative_path, data)
                return RespMsg.OK
        return RespMsg.NOT_FOUND
    

    def get_password_by_id(self, folder_id: int):
        data = Json.load_json_file(self.notes_relative_path)

        for folder in data['categories']:
            if folder['id'] == folder_id:
                return folder['password']
        return RespMsg.NOT_FOUND


    def update_password(self, folder_id: int, new_psw_hash):
        data = Json.load_json_file(self.notes_relative_path)

        for folder in data['categories']:
            if folder['id'] == folder_id:
                folder['password']



    def delete_password(self, entity_id: int, entity: str):
        pass

