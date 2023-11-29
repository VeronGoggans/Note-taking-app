from backend.domain.subfolder import Subfolder
from backend.domain.enums.responseMessages import RespMsg
from backend.data.file.json_manager import Json
import os

class SubfolderManager:
    def __init__(self):
        self.notes_relative_path = os.getcwd() + '/storage/json/notes.json'


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
        target_folder = self.__find_folder_by_id(folders, folder_id)
    
        if target_folder:
            subfolders = target_folder.get("subfolders", [])
            subfolder_info = [{"id": subfolder["id"], "name": subfolder["name"]} for subfolder in subfolders]
            return subfolder_info
        return None


    def add_subfolder(self, folders, folder_id: int, subfolder: Subfolder):
        """
        Add a new subfolder to an existing folder in the notes structure.

        Args:
            folder_id (int): The unique identifier of the parent folder.
            subfolder (Subfolder): Data containing information to create the new subdirectory.

        Returns:
            RespMsg: A response message indicating the outcome of the subfolder addition.
            - If successful, it returns RespMsg.OK.
            - If the parent folder is not found, it returns RespMsg.NOT_FOUND.
        """
        parent_folder = self.__find_folder_by_id(folders, folder_id)
        if parent_folder:
            parent_folder['subfolders'].append(subfolder.__dict__)
            return subfolder
        return None


    def update(self, subfolder_id: int, new_name: str):
        """
        Update the name of a subfolder in the notes structure.

        Args:
            subfolder_id (int): The unique identifier of the subfolder to update.
            new_name (str): The new name for the subfolder.

        Returns:
            RespMsg: A response message indicating the outcome of the subfolder update.
            - If successful, it returns RespMsg.OK.
            - If the subfolder is not found, it returns RespMsg.NOT_FOUND.
        """
        data = Json.load_json_file(self.notes_relative_path)

        for folder in data['categories']:
            for subfolder in folder['subcategories']:
                if subfolder['id'] == subfolder_id:
                    subfolder['name'] = new_name
                    Json.update_json_file(self.notes_relative_path, data)
                    return RespMsg.OK
        return RespMsg.NOT_FOUND    
        

    def delete_subfolder(self, folders, parent_id: int, folder_id: int) -> RespMsg:
        """
        Delete a folder from the notes structure.

        Args:
            folder_id (int): The unique identifier of the folder to delete.

        Returns:
            RespMsg: A response message indicating the outcome of the folder deletion.
            - If successful, it returns RespMsg.OK.
            - If the folder is not found, it returns RespMsg.NOT_FOUND.
        """
        parent_folder = self.__find_folder_by_id(folders, parent_id)
        if parent_folder:
            for subfolder in parent_folder['subfolders']:
                if subfolder.get('id') == folder_id:
                    parent_folder['subfolders'].remove(subfolder)
                    return subfolder
            return None
        return None 
    

    def __find_folder_by_id(self, folders, target_id):
        for folder in folders:
            if folder.get("id") == target_id:
                return folder
            
            subfolder = self.__find_folder_by_id(folder["subfolders"], target_id)
            if subfolder:
                return subfolder
        return None