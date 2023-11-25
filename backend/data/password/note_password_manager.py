import os
from backend.data.file.json_manager import Json
from backend.domain.enums.responseMessages import RespMsg

class NotePasswordManager:
    def __init__(self) -> None:
        self.notes_relative_path = os.getcwd() + '/storage/json/notes.json'
        

    def add_password(self, folder_id: int, note_id: int, psw_hash: str):
        data = Json.load_json_file(self.notes_relative_path)

        for folder in data['categories']:
            if folder['id'] == folder_id:
                for note in folder['notes']:
                    if note['id'] == note_id:
                        note['password'] = psw_hash
                        note['password_protected'] = True
                        Json.update_json_file(self.notes_relative_path, data)
                        return RespMsg.OK
        return RespMsg.NOT_FOUND


    def get_password_by_id(self, folder_id: int, note_id: int):
        pass

    def update_password(self, entity_id: int, entity: str, new_psw_hash):
        pass

    def delete_password(self, entity_id: int, entity: str):
        pass


