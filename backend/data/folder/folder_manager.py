from backend.domain.folder import Folder
from backend.domain.enums.responseMessages import RespMsg
from backend.data.file.json_manager import Json
import os

class FolderManager:
    def __init__(self):
        self.notes_relative_path = os.getcwd() + '/storage/json/notes.json'


    def get(self) -> list:
        """
        Retrieve a list of folders from the notes structure.

        Returns:
            List[Dict[str, Union[int, str]]]: A list of dictionaries containing directory information.
            - Each dictionary includes 'id' and 'name' keys representing the directory's unique identifier and name.
        """
        data = Json.load_json_file(self.notes_relative_path)

        folder_list = []
        for folder in data['categories']:
            folder_list.append({'id': folder['id'], 'name': folder['name']})
        return folder_list


    def add(self, folder: Folder) -> RespMsg:
        """
        Add a new folder to the notes structure.

        Args:
            folder (Folder): a folder object that will be added to the notes structure.

        Returns:
            RespMsg: A response message indicating the outcome of the directory addition.
            - If successful, it returns RespMsg.OK.
        """
        data = Json.load_json_file(self.notes_relative_path)
        
        data["categories"].append(folder.__dict__)
        Json.update_json_file(self.notes_relative_path, data)
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
        
    
    def delete(self, folder_id: int) -> RespMsg:
        """
        Delete a folder from the notes structure.

        Args:
            folder_id (int): The unique identifier of the folder to delete.

        Returns:
            RespMsg: A response message indicating the outcome of the folder deletion.
            - If successful, it returns RespMsg.OK.
            - If the folder is not found, it returns RespMsg.NOT_FOUND.
        """
        data = Json.load_json_file(self.notes_relative_path)

        for folder in data['categories']:
            if folder['id'] == folder_id:
                data['categories'].remove(folder)
                Json.update_json_file(self.notes_relative_path, data)
                return RespMsg.OK        
        return RespMsg.NOT_FOUND
    

    def __update_dir_object(self, dir_name: str):
        pass