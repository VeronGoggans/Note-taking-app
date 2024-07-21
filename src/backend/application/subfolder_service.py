from src.backend.data.subfolder.subfolder_manager import SubfolderManager
from src.backend.presentation.request_bodies.subfolder.post_subfolder_request import PostSubfolderRequest
from src.backend.presentation.request_bodies.subfolder.put_subfolder_request import PutSubfolderRequest
from src.backend.presentation.request_bodies.subfolder.del_subfolder_request import DeleteSubfolderRequest
from src.backend.domain.subfolder import Subfolder
from src.backend.data.file.json_manager import JsonManager
from src.backend.presentation.http_status import HttpStatus
from src.backend.data.exceptions.exceptions import AdditionException, NotFoundException

from os import getcwd

class SubfolderService:
    def __init__(self, subfolder_manager: SubfolderManager, json_manager: JsonManager):
        self.manager = subfolder_manager
        self.json_manager = json_manager
        self.folders_path = getcwd() + '/storage/json/notes.json'
        self.id_path = getcwd() + "/storage/json/id.json"


    def add_subfolder(self, post_request: PostSubfolderRequest):
        """
        Adds a new subfolder to the specified parent folder within the folder structure.

        Args:
            post_request (PostSubfolderRequest): 
            Object containing the folder_id and the name for the new subfolder.
            - folder_id (str) The ID of the folder to which the subfolder will be added to. 
            - name (str) The name for the new subfolder.

        Returns:
            dict or HttpStatus.NOT_FOUND: 
            - If the parent folder with the specified ID is found and the subfolder is
              successfully added, returns a dictionary representing the new subfolder.
            - If the parent folder is not found, returns HttpStatus.NOT_FOUND.
        """
        folders = self.json_manager.load(self.folders_path)
        id = self.json_manager.generate_id(self.id_path, 'subfolder')
        subfolder_obj = Subfolder(id, post_request.name, post_request.color)

        try:
            subfolder = self.manager.add(folders, post_request.folder_id, subfolder_obj)
            self.json_manager.update(self.folders_path, folders)
            return subfolder
        except (AdditionException, NotFoundException) as e:
            raise e

    
    def get_subfolders(self, folder_id: int):
        """
        Get information about subfolders within a specified folder/subfolder.

        Args:
            folder_id (int): The ID of the folder to retrieve subfolders.

        Returns:
            Union[list, HttpStatus]: 
            - If subfolders are found, it returns a list containing information about the subfolders.
            - If no subfolders are found or the specified folder does not exist, it returns a message indicating 'NOT_FOUND'.
        """
        folders = self.json_manager.load(self.folders_path)
        try:
            return self.manager.get_all(folders, folder_id)
        except NotFoundException as e:
            raise e


    def update_subfolder(self, put_request: PutSubfolderRequest):
        """
        Updates a subfolder's name within the folder structure.

        Args:
            put_request (PutSubfolderRequest): 
            Object containing the subfolder_id and name.
            - subfolder_id (str) The ID of the subfolder that will be updated.
            - name (str) The new name for the subfolder.
            

        Returns:
            dict or HttpStatus.NOT_FOUND: 
            - If the subfolder with the specified ID is found and updated successfully,
              returns a dictionary representing the updated subfolder.
            - If the subfolder is not found, returns HttpStatus.NOT_FOUND.
        """
        folders = self.json_manager.load(self.folders_path)
        try:
            subfolder = self.manager.update(folders, put_request.subfolder_id, put_request.name, put_request.color)
            self.json_manager.update(self.folders_path, folders)
            return subfolder
        except NotFoundException as e:
            raise e
            
    
    def delete_subfolder(self, delete_request: DeleteSubfolderRequest):
        """
        Delete a subfolder with the specified ID from a parent folder.

        Args:
            delete_request (DeleteSubfolderRequest): 
            Object containing the folder_id and subfolder_id.
            - folder_id (str): The ID of the parent folder.
            - subfolder_id (str) Te ID of the folder whished to be deleted.

        Returns:
            HttpStatus: 
            - If the subfolder is successfully deleted, it returns 'OK'.
            - If the specified subfolder or parent folder is not found, it returns 'NOT_FOUND'.
        """
        folders = self.json_manager.load(self.folders_path)
        try:
            subfolder = self.manager.delete(folders, delete_request.folder_id, delete_request.subfolder_id)
            self.json_manager.update(self.folders_path, folders)
            return subfolder
        except NotFoundException as e:
            raise e