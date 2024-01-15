from backend.data.folder.folder_manager import FolderManager
from backend.presentation.request_bodies.folder.del_folder_request import DeleteFolderRequest
from backend.presentation.request_bodies.folder.post_folder_request import PostFolderRequest
from backend.presentation.request_bodies.folder.put_folder_request import PutFolderRequest
from backend.domain.folder import Folder
from backend.data.file.json_manager import JsonManager
from backend.domain.enums.responseMessages import Status
import os

class FolderService:
    def __init__(self, folder_manager: FolderManager, json_manager: JsonManager):
        self.folder_manager = folder_manager
        self.json_manager = json_manager
        self.folders_path = os.getcwd() + '/storage/json/notes.json'
        self.id_path = os.getcwd() + "/storage/json/id.json"


    def get_folders(self):
        """
        Get information about folders in the folder structure.

        Returns:
            list or Status: 
            - A list containing information (name, id) about the folders.
        """
        folder_structure = self.json_manager.load(self.folders_path)
        folders = folder_structure['folders']
        folder_info = self.folder_manager.get_folders(folders)
        return folder_info
    
    
    def add_folder(self, post_request: PostFolderRequest):
        """
        Add a new folder with the specified name.

        Args:
            post_request (PostFolderRequest): 
            Object containing a name for the new folder.
            - name (str): The name for the new folder.

        Returns:
            Union[Folder, Status]: 
            - If the folder is successfully added, it returns the new folder object.
            - If there is an internal server error during the process, it returns 'INTERNAL_SERVER_ERROR'.
        """
        folder_structure = self.json_manager.load(self.folders_path)
        folders = folder_structure['folders']
        id = self.json_manager.generateID(self.id_path, 'folder')
        folder: Folder = Folder(id, post_request.name)

        new_folder = self.folder_manager.add_folder(folders, folder)
        if new_folder:
            self.json_manager.update(self.folders_path, folder_structure)
            return new_folder
        return Status.INTERAL_SERVER_ERROR
    

    def update_folder(self, put_request: PutFolderRequest):
        """
        Update the name of an existing folder with the specified ID.

        Args:
            folder (PutFolderRequest): 
            Object containing the folder_id and the new name for the folder.
            - folder_id (str): The ID of the folder wished to be updated.
            - new_name (str): The new name of the folder.

        Returns:
            dict or Status: 
            - If the folder is successfully updated, it returns the updated folder.
            - If the specified folder is not found, it returns 'NOT_FOUND'.
        """
        folder_structure = self.json_manager.load(self.folders_path)
        folders = folder_structure['folders']
        updated_folder = self.folder_manager.update_folder(folders, put_request.folder_id, put_request.new_name)
        
        if updated_folder is not None:
            self.json_manager.update(self.folders_path, folder_structure)
            return updated_folder
        return Status.NOT_FOUND
    
    
    def delete_folder(self, delete_folder_request: DeleteFolderRequest):
        """
        Delete an existing folder with the specified ID.

        Args:
            delete_request (DeleteFolderRequest): 
            Object containing the folder_id.
            - folder_id (str): The ID of the folder whished to be deleted. 

        Returns:
            Status: 
            - If the folder is successfully deleted, it returns 'OK'.
            - If the specified folder is not found, it returns 'NOT_FOUND'.
        """
        folder_structure = self.json_manager.load(self.folders_path)
        folders = folder_structure['folders']
        deleted_folder = self.folder_manager.delete_folder(folders, delete_folder_request.folder_id)

        if deleted_folder is not None:
            self.json_manager.update(self.folders_path, folder_structure)
            return deleted_folder
        return Status.NOT_FOUND