from backend.data.subfolder.subfolder_manager import SubfolderManager
from backend.presentation.requestBodies.SubDirectoryRequest import SubDirectoryRequest
from backend.domain.subfolder import Subfolder
from backend.service.generators.IdGenerator import IdGenerator

class SubDirectoryService:
    def __init__(self, subfolder_manager: SubfolderManager):
        self.subfolder_manager = subfolder_manager

    
    def get_subdirectories(self, dir_id: int):
        return self.subfolder_manager.get(dir_id)
    
    
    def add_subdirectory(self, dir_id: int, sub_dir: SubDirectoryRequest):
        id = IdGenerator.ID('subdirectory')
        subfolder: Subfolder = Subfolder(id, sub_dir.name)
        return self.subfolder_manager.add(dir_id, subfolder)
    

    def update_subdirectory(self, sub_dir_id: int, sub_dir: SubDirectoryRequest):
        return self.subfolder_manager.update(sub_dir_id, sub_dir.name)
    
    
    def delete_subdirectory(self, sub_dir_id: int):
        return self.subfolder_manager.delete(sub_dir_id)

    