from backend.data.folder.folder_manager import FolderManager
from backend.presentation.request_bodies.folder_request import FolderRequest
from backend.domain.folder import Folder
from backend.application.generators.Id_generator import IDGenerator

class DirectoryService:
    def __init__(self, folder_manager: FolderManager):
        self.folder_manager = folder_manager


    def get_directories(self):
        return self.folder_manager.get()
    
    
    def add_directory(self, folder: FolderRequest):
        id = IDGenerator.ID('directory')
        folder: Folder = Folder(id, folder.name)
        return self.folder_manager.add(folder)
    

    def update_directory(self, dir_id: int, dir: FolderRequest):
        return self.folder_manager.update(dir_id, dir.name)
    
    
    def delete_directory(self, dir_id: int):
        return self.folder_manager.delete(dir_id)

    