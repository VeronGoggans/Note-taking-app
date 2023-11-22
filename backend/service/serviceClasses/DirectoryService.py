from backend.data.folder.folder_manager import FolderManager
from backend.presentation.requestBodies.DirectoryRequest import DirectoryRequest
from backend.domain.folder import Folder
from backend.service.generators.IdGenerator import IdGenerator

class DirectoryService:
    def __init__(self, folder_manager: FolderManager):
        self.folder_manager = folder_manager


    def get_directories(self):
        return self.folder_manager.get()
    
    
    def add_directory(self, folder: DirectoryRequest):
        id = IdGenerator.ID('directory')
        folder: Folder = Folder(id, folder.name)
        return self.folder_manager.add(folder)
    

    def update_directory(self, dir_id: int, dir: DirectoryRequest):
        return self.folder_manager.update(dir_id, dir.name)
    
    
    def delete_directory(self, dir_id: int):
        return self.folder_manager.delete(dir_id)

    