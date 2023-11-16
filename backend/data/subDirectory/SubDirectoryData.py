from backend.domain.SubDirectory import SubDirectory
from backend.domain.enums.responseMessages import RespMsg
from backend.data.fileOperations.JsonOperations import Json
import os

class SubDirectoryData:
    def __init__(self):
        self.notes_relative_path = os.getcwd() + '/storage/json/notes.json'


    def get(self, dir_id: int):
        """
        Retrieve a list of subdirectories names belonging to a specific directory.

        Args:
            dir_id (int): The unique identifier of the parent directory.

        Returns:
            Union[List[str], RespMsg]: 
            - If successful, it returns a list of subdirectory names.
            - If the parent directory is not found, it returns RespMsg.NOT_FOUND.
        """
        data = Json.load_json_file(self.notes_relative_path)

        sub_dir_list = []
        for dir in data["categories"]:
            if dir["id"] == dir_id:
                for sub_dir in dir['subcategories']:
                    sub_dir_list.append({'id': sub_dir['id'], 'name': sub_dir['name']})
                return sub_dir_list
        return RespMsg.NOT_FOUND  


    def add(self, dir_id: int, sub_dir: SubDirectory):
        """
        Add a new subdirectory to an existing directory in the notes structure.

        Args:
            dir_id (int): The unique identifier of the parent directory.
            sub_dir_data (SubDirectoryRequest): Data containing information to create the new subdirectory.

        Returns:
            RespMsg: A response message indicating the outcome of the subdirectory addition.
            - If successful, it returns RespMsg.OK.
            - If the parent directory is not found, it returns RespMsg.NOT_FOUND.
        """
        data = Json.load_json_file(self.notes_relative_path)

        for dir in data["categories"]:
            if dir["id"] == dir_id:
                dir["subcategories"].append(sub_dir.__dict__)
                Json.update_json_file(self.notes_relative_path, data)
                return sub_dir
        return RespMsg.NOT_FOUND


    def update(self, sub_dir_id: int, new_name: str):
        """
        Update the name of a subdirectory in the notes structure.

        Args:
            sub_dir_id (int): The unique identifier of the subdirectory to update.
            new_name (str): The new name for the subdirectory.

        Returns:
            RespMsg: A response message indicating the outcome of the subdirectory update.
            - If successful, it returns RespMsg.OK.
            - If the subdirectory is not found, it returns RespMsg.NOT_FOUND.
        """
        data = Json.load_json_file(self.notes_relative_path)

        for dir in data['categories']:
            for sub_dir in dir['subcategories']:
                if sub_dir['id'] == sub_dir_id:
                    sub_dir['name'] = new_name
                    Json.update_json_file(self.notes_relative_path, data)
                    return RespMsg.OK
        return RespMsg.NOT_FOUND    
        

    def delete(self, sub_dir_id: int):
        """
        Delete a subdirectory from the notes structure.

        Args:
            sub_dir_id (int): The unique identifier of the subdirectory to delete.

        Returns:
            RespMsg: A response message indicating the outcome of the subdirectory deletion.
            - If successful, it returns RespMsg.OK.
            - If the subdirectory is not found, it returns RespMsg.NOT_FOUND.
        """
        data = Json.load_json_file(self.notes_relative_path)

        for dir in data["categories"]:
            for sub_dir in dir["subcategories"]:
                if sub_dir["id"] == sub_dir_id:
                    dir["subcategories"].remove(sub_dir)
                    Json.update_json_file(self.notes_relative_path, data)
                    return dir
        return RespMsg.NOT_FOUND