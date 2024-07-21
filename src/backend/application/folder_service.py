from src.backend.data.folder.folder_manager import FolderManager
from src.backend.presentation.request_bodies.folder.post_folder_request import PostFolderRequest
from src.backend.presentation.request_bodies.folder.put_folder_request import PutFolderRequest
from src.backend.data.exceptions.exceptions import NotFoundException, AdditionException
from src.backend.domain.folder import Folder
from src.backend.data.file.json_manager import JsonManager
from os import getcwd


class FolderService:
    def __init__(self, folder_manager: FolderManager, json_manager: JsonManager):
        self.folder_manager = folder_manager
        self.json_manager = json_manager
        self.folders_path = getcwd() + '/storage/json/notes.json'
        self.id_path = getcwd() + '/storage/json/id.json'


    def add_folder(self, post_request: PostFolderRequest):
        """
        Add a new folder with the specified name.

        Args:
            post_request (PostFolderRequest): 
            Object containing a name for the new folder.
            - name (str): The name for the new folder.

        Returns:
            Union[Folder, HttpStatus]: 
            - If the folder is successfully added, it returns the new folder object.
            - If there is an internal server error during the process, it returns 'INTERNAL_SERVER_ERROR'.
        """
        folders = self.json_manager.load(self.folders_path)
        id = self.json_manager.generate_id(self.id_path, 'folder')
        folder = Folder(id, post_request.name, post_request.color)

        try:
            new_folder = self.folder_manager.add_folder(folder, folder)
            self.json_manager.update(self.folders_path, folders)
            return new_folder
        except AdditionException as e:
            raise e

    def get_folders(self):
        """
        Get information about folders in the folder structure.

        Returns:
            list or HttpStatus: 
            - A list containing information (name, id) about the folders.
        """
        json_folders = self.json_manager.load(self.folders_path)
        return self.folder_manager.get_folders(json_folders)
       

    def update_folder(self, put_request: PutFolderRequest):
        """
        Update the name of an existing folder with the specified ID.

        Args:
            folder (PutFolderRequest): 
            Object containing the folder_id and the new name for the folder.
            - folder_id (str): The ID of the folder wished to be updated.
            - new_name (str): The new name of the folder.

        Returns:
            dict or HttpStatus: 
            - If the folder is successfully updated, it returns the updated folder.
            - If the specified folder is not found, it returns 'NOT_FOUND'.
        """
        folders = self.json_manager.load(self.folders_path)
        try:
            folder = self.folder_manager.update_folder(folders, put_request.folder_id, put_request.name, put_request.color)
            self.json_manager.update(self.folders_path, folders)
            return folder
        except NotFoundException as e:
            raise e
    
    
    def delete_folder(self, folder_id: str):
        """
        Delete an existing folder with the specified ID.

        Args:
            - folder_id (str): The ID of the folder wished to be deleted.

        Returns:
            HttpStatus: 
            - If the folder is successfully deleted, it returns 'OK'.
            - If the specified folder is not found, it returns 'NOT_FOUND'.
        """
        folders = self.json_manager.load(self.folders_path)
        try:
            folder = self.folder_manager.delete_folder(folders, folder_id)
            self.json_manager.update(self.folders_path, folders)
            return folder
        except NotFoundException as e:
            raise e