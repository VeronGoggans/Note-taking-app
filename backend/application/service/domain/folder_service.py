from backend.data.folder.folder_manager import FolderManager
from backend.presentation.request_bodies.folder_request import FolderRequest
from backend.domain.folder import Folder
from backend.data.file.json_manager import Json
from backend.domain.enums.responseMessages import RespMsg
from backend.application.generators.Id_generator import IDGenerator
import os

class FolderService:
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
        folder_structure = Json.load(self.folders_path)
        folders = folder_structure['folders']
        folder_info = self.folder_manager.get_folders(folders)
        return folder_info
    
    
    def add_folder(self, folder: FolderRequest):
        """
        Add a new folder with the specified name.

        Args:
            folder (FolderRequest): Object containing the name for the new folder.

        Returns:
            Union[Folder, RespMsg]: 
            - If the folder is successfully added, it returns the new folder object.
            - If there is an internal server error during the process, it returns 'INTERNAL_SERVER_ERROR'.
        """
        folder_structure = Json.load(self.folders_path)
        folders = folder_structure['folders']
        id = IDGenerator.ID('folder')
        folder: Folder = Folder(id, folder.name)

        new_folder = self.folder_manager.add_folder(folders, folder)
        if new_folder:
            Json.update(self.folders_path, folder_structure)
            return new_folder
        return RespMsg.INTERAL_SERVER_ERROR
    

    def update_folder(self, folder_id: int, folder: FolderRequest):
        """
        Update the name of an existing folder with the specified ID.

        Args:
            folder_id (int): The ID of the folder to be updated.
            folder (FolderRequest): Object containing the new name for the folder.

        Returns:
            Union[Folder, RespMsg]: 
            - If the folder is successfully updated, it returns the updated folder object.
            - If the specified folder is not found, it returns 'NOT_FOUND'.
        """
        folder_structure = Json.load(self.folders_path)
        folders = folder_structure['folders']
        updated_folder = self.folder_manager.update_folder(folders, folder_id, folder.name)
        
        if updated_folder is not None:
            Json.update(self.folders_path, folder_structure)
            return updated_folder
        return RespMsg.NOT_FOUND
    
    
    def delete_folder(self, folder_id: int):
        """
        Delete an existing folder with the specified ID.

        Args:
            folder_id (int): The ID of the folder to be deleted.

        Returns:
            RespMsg: 
            - If the folder is successfully deleted, it returns 'OK'.
            - If the specified folder is not found, it returns 'NOT_FOUND'.
        """
        folder_structure = Json.load(self.folders_path)
        folders = folder_structure['folders']
        deleted_folder = self.folder_manager.delete_folder(folders, folder_id)

        if deleted_folder is not None:
            Json.update(self.folders_path, folder_structure)
            return RespMsg.OK
        return RespMsg.NOT_FOUND