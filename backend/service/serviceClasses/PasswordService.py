from backend.data.password.PasswordData import PasswordData
from backend.service.security.hash import Hash
from backend.domain.enums.AppEntities import AppEntities
from backend.domain.enums.responseMessages import RespMsg


class PasswordService():
    def __init__(self, psw_data: PasswordData):
        self.password_data = psw_data

    
    def add_password(self, password: str, entity_id: int, entity: str):
        if self.__valid_entity(entity):
            password_hash = Hash.hashify(password)
            return self.password_data.add_password(entity_id, password_hash, entity)
        return RespMsg.BAD_REQUEST
        

    def get_password(self, entity_id: int, entity: str):
        if self.__valid_entity(entity):
            return self.password_data.get_password_by_id(entity_id, entity)
        return RespMsg.BAD_REQUEST

    
    def update_password(self, entity_id: int):
        pass

    
    def delete_password(self, entity_id: int, entity: str):
        if self.__valid_entity(entity):
            return self.password_data.delete_password(entity_id, entity)
        return RespMsg.BAD_REQUEST


    def __valid_entity(self, entity: str):
        return entity == AppEntities.NOTE or entity == AppEntities.FOLDER or entity == AppEntities.SUBFOLDER
