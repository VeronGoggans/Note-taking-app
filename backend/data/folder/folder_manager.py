from backend.domain.folder import Folder
from backend.domain.enums.responseMessages import RespMsg
from backend.data.file.json_manager import Json
import os

class FolderManager:
    def __init__(self):
        self.notes_relative_path = os.getcwd() + '/storage/json/notes.json'


    def get_folders(self, folders) -> list:
        """
        Retrieve a list of information (id, name) of folders/subfolders from the notes structure.

        Args:
            folders (Any) The json dictionary representing the notes structure.
        
        Returns:
            List[Dict[str, Union[int, str]]]: A list of dictionaries containing directory information.
            - Each dictionary includes 'id' and 'name' keys representing the directory's unique identifier and name.
        """
        folder_list = []
        for folder in folders:
            folder_list.append({'id': folder['id'], 'name': folder['name']})
        return folder_list


    def add_folder(self, folders, folder: Folder) -> RespMsg:
        """
        Add a new folder to the notes structure.

        Args:
            folder (Folder): a folder object that will be added to the notes structure.

        Returns:
            RespMsg: A response message indicating the outcome of the directory addition.
            - If successful, it returns RespMsg.OK.
        """
        folders.append(folder.__dict__)
        return folder

    
    def update_folder(self, folders, folder_id: int, folder_name: str) -> RespMsg:
        """
        Update the name of a folder in the notes structure.

        Args:
            folder_id (int): The unique identifier of the folder to update.
            folder_name (str): The new name for the folder.

        Returns:
            RespMsg: A response message indicating the outcome of the folder update.
            - If successful, it returns RespMsg.OK.
            - If the folder is not found, it returns RespMsg.NOT_FOUND.
        """        
        for folder in folders:
            if folder.get('id') == folder_id:
                folder['name'] = folder_name
                return folder
        return None
        
    
    def delete_folder(self, folders, folder_id: int) -> RespMsg:
        """
        Delete a folder from the notes structure.

        Args:
            folder_id (int): The unique identifier of the folder to delete.

        Returns:
            RespMsg: A response message indicating the outcome of the folder deletion.
            - If successful, it returns RespMsg.OK.
            - If the folder is not found, it returns RespMsg.NOT_FOUND.
        """
        for folder in folders:
            if folder.get('id') == folder_id:
                folders.remove(folder)
                return folder 
        return None