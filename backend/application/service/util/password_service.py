from backend.data.password.note_password_manager import NotePasswordManager
from backend.data.password.folder_password_manager import FolderPasswordManager
from backend.data.password.subfolder_password_manager import SubfolderPasswordManager
from backend.application.security.hash import Hash
from backend.domain.enums.entities import Entities
from backend.domain.enums.responseMessages import RespMsg


class PasswordService():
    def __init__(self, note_password_manager: NotePasswordManager,
                 folder_password_manager: FolderPasswordManager,
                 subfolder_password_manager: SubfolderPasswordManager):
        self.note_password_manager = note_password_manager
        self.folder_password_manager = folder_password_manager
        self.subfolder_password_manager = subfolder_password_manager
        self.note = Entities.NOTE.value
        self.folder = Entities.FOLDER.value
        self.subfolder = Entities.SUBFOLDER.value

    
    def add_password(self, primary_id: int, password: str, entity: str, secondary_id = -1):
        password_hash = Hash.hashify(password)

        if entity == self.note:
            return self.note_password_manager.add_password(primary_id, secondary_id, password_hash)
        elif entity == self.folder:
            return self.folder_password_manager.add_password(primary_id, password_hash)
        elif entity == self.subfolder:
            return self.subfolder_password_manager.add_password(primary_id, secondary_id, password_hash)
        

    def get_password(self, folder_id: int, entity: str):
        return self.password_data.get_password_by_id(folder_id, entity)

    
    def update_password(self, folder_id: int):
        pass

    
    def delete_password(self, folder_id: int, entity: str):
        return self.password_data.delete_password(folder_id, entity)


