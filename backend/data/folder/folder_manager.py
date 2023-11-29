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
    

    def get_subfolders(self, folders, folder_id: int):
        """
        Retrieve a list of subfolder names belonging to a specific folder.

        Args:
            folder_id (int): The unique identifier of the parent folder.

        Returns:
            Union[List[str], RespMsg]: 
            - If successful, it returns a list of subfolders names.
            - If the parent folder is not found, it returns RespMsg.NOT_FOUND.
        """
        target_folder = self.find_folder_by_id(folders, folder_id)
    
        if target_folder:
            subfolders = target_folder.get("subfolders", [])
            subfolder_info = [{"id": subfolder["id"], "name": subfolder["name"]} for subfolder in subfolders]
            return subfolder_info
        return None


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

    
    def update(self, folder_id: int, folder_name: str) -> RespMsg:
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
        data = Json.load_json_file(self.notes_relative_path)

        for folder in data['categories']:
            if folder['id'] == folder_id:
                folder['name'] = folder_name
                Json.update_json_file(self.notes_relative_path, data)
                return folder
        return RespMsg.NOT_FOUND
        
    
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
        folder = self.find_folder_by_id(folders, folder_id)
        if folder:
            folders.remove(folder)
            return folder 
        return None
    

    def find_folder_by_id(self, folders, target_id):
        for folder in folders:
            if folder.get("id") == target_id:
                return folder
            
            subfolder = self.find_folder_by_id(folder["subfolders"], target_id)
            if subfolder:
                return subfolder
        return None