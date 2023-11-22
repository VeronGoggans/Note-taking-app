from backend.domain.subfolder import Subfolder
from backend.domain.enums.responseMessages import RespMsg
from backend.data.file.json_manager import Json
import os

class SubfolderManager:
    def __init__(self):
        self.notes_relative_path = os.getcwd() + '/storage/json/notes.json'


    def get(self, dir_id: int):
        """
        Retrieve a list of subfolder names belonging to a specific folder.

        Args:
            folder_id (int): The unique identifier of the parent folder.

        Returns:
            Union[List[str], RespMsg]: 
            - If successful, it returns a list of subfolders names.
            - If the parent folder is not found, it returns RespMsg.NOT_FOUND.
        """
        data = Json.load_json_file(self.notes_relative_path)

        subfolder_list = []
        for folder in data["categories"]:
            if folder["id"] == dir_id:
                for subfolder in folder['subcategories']:
                    subfolder.append({'id': subfolder['id'], 'name': subfolder['name']})
                return subfolder_list
        return RespMsg.NOT_FOUND  


    def add(self, folder_id: int, subfolder: Subfolder):
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
        data = Json.load_json_file(self.notes_relative_path)

        for folder in data["categories"]:
            if folder["id"] == folder_id:
                folder["subcategories"].append(subfolder.__dict__)
                Json.update_json_file(self.notes_relative_path, data)
                return subfolder
        return RespMsg.NOT_FOUND


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
        

    def delete(self, subfolder_id: int):
        """
        Delete a subfolder from the notes structure.

        Args:
            subfolder_id (int): The unique identifier of the subfolder to delete.

        Returns:
            RespMsg: A response message indicating the outcome of the subfolder deletion.
            - If successful, it returns RespMsg.OK.
            - If the subfolder is not found, it returns RespMsg.NOT_FOUND.
        """
        data = Json.load_json_file(self.notes_relative_path)

        for folder in data["categories"]:
            for subfolder in folder["subcategories"]:
                if subfolder["id"] == subfolder_id:
                    folder["subcategories"].remove(subfolder)
                    Json.update_json_file(self.notes_relative_path, data)
                    return RespMsg.OK
        return RespMsg.NOT_FOUND