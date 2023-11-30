from backend.data.subfolder.subfolder_manager import SubfolderManager
from backend.presentation.request_bodies.subfolder.post_subfolder_request import PostSubfolderRequest
from backend.presentation.request_bodies.subfolder.put_subfolder_request import PutSubfolderRequest
from backend.presentation.request_bodies.subfolder.del_subfolder_request import DeleteSubfolderRequest
from backend.domain.subfolder import Subfolder
from backend.data.file.json_manager import Json
from backend.domain.enums.responseMessages import RespMsg
from backend.application.generators.Id_generator import IDGenerator
import os 

class SubfolderService:
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
        folder_structure = Json.load(self.folders_path)
        folders = folder_structure['folders']
        manager_response = self.subfolder_manager.get_subfolders(folders, folder_id)

        if manager_response is not None:
            return manager_response
        return RespMsg.NOT_FOUND
    
    
    def add_subfolder(self, post_request: PostSubfolderRequest):
        """
        Adds a new subfolder to the specified parent folder within the folder structure.

        Args:
            post_request (PostSubfolderRequest): Object containing the folder_id and the name for the new subfolder.
                                                The folder_id is the ID of the folder to which the subfolder will be added to. 
                                                The name is the name for the new subfolder.

        Returns:
            dict or RespMsg.NOT_FOUND: 
            - If the parent folder with the specified ID is found and the subfolder is
              successfully added, returns a dictionary representing the new subfolder.
            - If the parent folder is not found, returns RespMsg.NOT_FOUND.
        """
        folder_structure = Json.load(self.folders_path)
        folders = folder_structure['folders']
        id = IDGenerator.ID('subfolder')
        subfolder: Subfolder = Subfolder(id, post_request.name)

        manager_response = self.subfolder_manager.add_subfolder(folders, post_request.folder_id, subfolder)

        if manager_response:
            Json.update(self.folders_path, folder_structure)
            return manager_response
        return RespMsg.NOT_FOUND
    

    def update_subfolder(self, update_request: PutSubfolderRequest):
        """
        Updates a subfolder's name within the folder structure.

        Args:
            update_request (PutSubfolderRequest): Object containing the subfolder_id and name.
                                                  The subfolder_id is the ID of the subfolder that will be updated.
                                                  The name is the new name for the subfolder.
            

        Returns:
            dict or RespMsg.NOT_FOUND: 
            - If the subfolder with the specified ID is found and updated successfully,
              returns a dictionary representing the updated subfolder.
            - If the subfolder is not found, returns RespMsg.NOT_FOUND.
        """
        folder_structure = Json.load(self.folders_path)
        folders = folder_structure['folders']
        manager_response = self.subfolder_manager.update_subfolder(folders, update_request.subfolder_id, update_request.name)

        if manager_response is not None:
            Json.update(self.folders_path, folder_structure)
            return manager_response
        return RespMsg.NOT_FOUND
    
    
    def delete_subfolder(self, delete_request: DeleteSubfolderRequest):
        """
        Delete a subfolder with the specified ID from a parent folder.

        Args:
            delete_request (DeleteSubfolderRequest): Object containing the folder_id and subfolder_id.
                                                     The folder_id is the ID of the parent folder.
                                                     The subfolder_is is the ID of the folder whished to be deleted.

        Returns:
            RespMsg: 
            - If the subfolder is successfully deleted, it returns 'OK'.
            - If the specified subfolder or parent folder is not found, it returns 'NOT_FOUND'.
        """
        folder_structure = Json.load(self.folders_path)
        folders = folder_structure['folders']
        manager_response = self.subfolder_manager.delete_subfolder(folders, delete_request.folder_id, delete_request.subfolder_id)

        if manager_response is not None:
            Json.update(self.folders_path, folder_structure)
            return RespMsg.OK
        return RespMsg.NOT_FOUND

    