from backend.data.subfolder.subfolder_manager import SubfolderManager
from backend.presentation.request_bodies.subfolder_request import SubfolderRequest
from backend.domain.subfolder import Subfolder
from backend.data.file.json_manager import Json
from backend.domain.enums.responseMessages import RespMsg
from backend.application.generators.Id_generator import IDGenerator
import os 

class SubDirectoryService:
    def __init__(self, subfolder_manager: SubfolderManager):
        self.subfolder_manager = subfolder_manager
        self.folders_path = os.getcwd() + '/storage/json/notes.json'

    
    def get_subfolders(self, folder_id: int):
        """
        Get information about subfolders within a specified folder/subfolder.

        Args:
            folder_id (int): The ID of the folder to retrieve subfolders.

        Returns:
            Union[list, RespMsg]: 
            - If subfolders are found, it returns a list containing information about the subfolders.
            - If no subfolders are found or the specified folder does not exist, it returns a message indicating 'NOT_FOUND'.
        """
        folder_structure = Json.load_json_file(self.folders_path)
        folders = folder_structure['folders']
        subfolder_info = self.subfolder_manager.get_subfolders(folders, folder_id)

        if subfolder_info is not None:
            return subfolder_info
        return RespMsg.NOT_FOUND
    
    
    def add_subfolder(self, folder_id: int, subfolder: SubfolderRequest):
        folder_structure = Json.load_json_file(self.folders_path)
        folders = folder_structure['folders']
        id = IDGenerator.ID('subfolder')
        subfolder: Subfolder = Subfolder(id, subfolder.name)

        new_subfolder = self.subfolder_manager.add_subfolder(folders, folder_id, subfolder)

        if new_subfolder:
            Json.update(self.folders_path, folder_structure)
            return new_subfolder
        return RespMsg.NOT_FOUND
    

    def update_subfolder(self, sub_dir_id: int, sub_dir: SubfolderRequest):
        return self.subfolder_manager.update(sub_dir_id, sub_dir.name)
    
    
    def delete_subfolder(self, subfolder_id: int):
        return self.subfolder_manager.delete(subfolder_id)

    