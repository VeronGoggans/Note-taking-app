from src.backend.data.subfolder.subfolder_manager import SubfolderManager
from src.backend.presentation.request_bodies.subfolder.post_subfolder_request import PostSubfolderRequest
from src.backend.presentation.request_bodies.subfolder.put_subfolder_request import PutSubfolderRequest
from src.backend.presentation.request_bodies.subfolder.del_subfolder_request import DeleteSubfolderRequest
from src.backend.domain.subfolder import Subfolder
from src.backend.data.file.json_manager import JsonManager
from src.backend.domain.enums.responseMessages import Status
import os 

class SubfolderService:
    def __init__(self, subfolder_manager: SubfolderManager, json_manager: JsonManager):
        self.subfolder_manager = subfolder_manager
        self.json_manager = json_manager
        self.folders_path = os.getcwd() + '/storage/json/notes.json'
        self.id_path = os.getcwd() + "/storage/json/id.json"

    
    def get_subfolders(self, folder_id: int):
        """
        Get information about subfolders within a specified folder/subfolder.

        Args:
            folder_id (int): The ID of the folder to retrieve subfolders.

        Returns:
            Union[list, Status]: 
            - If subfolders are found, it returns a list containing information about the subfolders.
            - If no subfolders are found or the specified folder does not exist, it returns a message indicating 'NOT_FOUND'.
        """
        folder_structure = self.json_manager.load(self.folders_path)
        folders = folder_structure['folders']
        manager_response = self.subfolder_manager.get_subfolders(folders, folder_id)

        if manager_response is not None:
            return manager_response
        return Status.NOT_FOUND
    
    
    def add_subfolder(self, post_request: PostSubfolderRequest):
        """
        Adds a new subfolder to the specified parent folder within the folder structure.

        Args:
            post_request (PostSubfolderRequest): 
            Object containing the folder_id and the name for the new subfolder.
            - folder_id (str) The ID of the folder to which the subfolder will be added to. 
            - name (str) The name for the new subfolder.

        Returns:
            dict or Status.NOT_FOUND: 
            - If the parent folder with the specified ID is found and the subfolder is
              successfully added, returns a dictionary representing the new subfolder.
            - If the parent folder is not found, returns Status.NOT_FOUND.
        """
        folder_structure = self.json_manager.load(self.folders_path)
        folders = folder_structure['folders']
        id = self.json_manager.generateID(self.id_path, 'subfolder')
        subfolder: Subfolder = Subfolder(id, post_request.name, post_request.color)

        manager_response = self.subfolder_manager.add_subfolder(folders, post_request.folder_id, subfolder)

        if manager_response:
            self.json_manager.update(self.folders_path, folder_structure)
            return manager_response
        return Status.NOT_FOUND
    

    def update_subfolder(self, put_request: PutSubfolderRequest):
        """
        Updates a subfolder's name within the folder structure.

        Args:
            put_request (PutSubfolderRequest): 
            Object containing the subfolder_id and name.
            - subfolder_id (str) The ID of the subfolder that will be updated.
            - name (str) The new name for the subfolder.
            

        Returns:
            dict or Status.NOT_FOUND: 
            - If the subfolder with the specified ID is found and updated successfully,
              returns a dictionary representing the updated subfolder.
            - If the subfolder is not found, returns Status.NOT_FOUND.
        """
        folder_structure = self.json_manager.load(self.folders_path)
        folders = folder_structure['folders']
        manager_response = self.subfolder_manager.update_subfolder(folders, put_request.subfolder_id, put_request.name, put_request.color)

        if manager_response is not None:
            self.json_manager.update(self.folders_path, folder_structure)
            return manager_response
        return Status.NOT_FOUND
    
    
    def delete_subfolder(self, delete_request: DeleteSubfolderRequest):
        """
        Delete a subfolder with the specified ID from a parent folder.

        Args:
            delete_request (DeleteSubfolderRequest): 
            Object containing the folder_id and subfolder_id.
            - folder_id (str): The ID of the parent folder.
            - subfolder_id (str) Te ID of the folder whished to be deleted.

        Returns:
            Status: 
            - If the subfolder is successfully deleted, it returns 'OK'.
            - If the specified subfolder or parent folder is not found, it returns 'NOT_FOUND'.
        """
        folder_structure = self.json_manager.load(self.folders_path)
        folders = folder_structure['folders']
        manager_response = self.subfolder_manager.delete_subfolder(folders, delete_request.folder_id, delete_request.subfolder_id)

        if manager_response is not None:
            self.json_manager.update(self.folders_path, folder_structure)
            return manager_response
        return Status.NOT_FOUND