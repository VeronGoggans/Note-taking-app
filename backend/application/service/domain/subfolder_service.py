from backend.data.subfolder.subfolder_manager import SubfolderManager
from backend.presentation.request_bodies.subfolder_request import SubfolderRequest
from backend.domain.subfolder import Subfolder
from backend.application.generators.Id_generator import IDGenerator

class SubDirectoryService:
    def __init__(self, subfolder_manager: SubfolderManager):
        self.subfolder_manager = subfolder_manager

    
    def get_subdirectories(self, dir_id: int):
        return self.subfolder_manager.get(dir_id)
    
    
    def add_subdirectory(self, dir_id: int, sub_dir: SubfolderRequest):
        id = IDGenerator.ID('subdirectory')
        subfolder: Subfolder = Subfolder(id, sub_dir.name)
        return self.subfolder_manager.add(dir_id, subfolder)
    

    def update_subdirectory(self, sub_dir_id: int, sub_dir: SubfolderRequest):
        return self.subfolder_manager.update(sub_dir_id, sub_dir.name)
    
    
    def delete_subdirectory(self, sub_dir_id: int):
        return self.subfolder_manager.delete(sub_dir_id)

    