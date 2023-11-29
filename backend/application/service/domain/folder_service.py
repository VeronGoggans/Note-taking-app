from backend.data.folder.folder_manager import FolderManager
from backend.presentation.request_bodies.folder_request import FolderRequest
from backend.domain.folder import Folder
from backend.data.file.json_manager import Json
from backend.domain.enums.responseMessages import RespMsg
from backend.application.generators.Id_generator import IDGenerator
import os

class DirectoryService:
    def __init__(self, folder_manager: FolderManager):
        self.folder_manager = folder_manager
        self.folders_path = os.getcwd() + '/storage/json/notes.json'


    def get_folders(self):
        """
        Get information about folders in the folder structure.

        Returns:
            Union[list, RespMsg]: 
            - A list containing information (name, id) about the folders.
        """
        folder_structure = Json.load_json_file(self.folders_path)
        folders = folder_structure['folders']
        folder_info = self.folder_manager.get_folders(folders)

        return folder_info
    
    
    def add_folder(self, folder: FolderRequest):
        folder_structure = Json.load_json_file(self.folders_path)
        folders = folder_structure['folders']
        id = IDGenerator.ID('folder')
        folder: Folder = Folder(id, folder.name)

        new_folder = self.folder_manager.add_folder(folders, folder)
        if new_folder:
            Json.update_json_file(self.folders_path, folder_structure)
            return new_folder
        return RespMsg.INTERAL_SERVER_ERROR
    

    def update_directory(self, dir_id: int, dir: FolderRequest):
        return self.folder_manager.update(dir_id, dir.name)
    
    
    def delete_folder(self, folder_id: int):
        folder_structure = Json.load_json_file(self.folders_path)
        folders = folder_structure['folders']
        deleted_folder = self.folder_manager.delete_folder(folders, folder_id)

        if deleted_folder is not None:
            Json.update_json_file(self.folders_path, folder_structure)
            return RespMsg.OK
        return RespMsg.NOT_FOUND

    