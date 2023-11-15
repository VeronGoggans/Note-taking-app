from backend.domain.SubDirectory import SubDirectory
from backend.presentation.requestBodies.SubDirectoryRequest import SubDirectoryRequest
from backend.domain.enums.responseMessages import RespMsg
from backend.service.fileOperations.JsonOperations import Json
from backend.service.generators.IdGenerator import IdGenerator
import os

class SubDirectoryData:
    def __init__(self):
        self.notes_relative_path = os.getcwd() + '/storage/json/notes.json'


    def add(self, dir_id: int, sub_dir_data: SubDirectoryRequest):
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
        sub_dir: SubDirectory = self.__construct_sub_dir_object(sub_dir_data.name)

        for dir in data["categories"]:
            if dir["id"] == dir_id:
                dir["subcategories"].append(sub_dir.__dict__)
                Json.update_json_file(self.notes_relative_path, data)
                return RespMsg.OK
        return RespMsg.NOT_FOUND
        

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

        for dir in data["categories"]:
            if dir["id"] == dir_id:
                return [sub["name"] for sub in dir["subcategories"]]
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
        

    def delete(self, subcategory_id: int):
        """
        Delete a subdirectory from the notes structure.

        Args:
            subcategory_id (int): The unique identifier of the subdirectory to delete.

        Returns:
            RespMsg: A response message indicating the outcome of the subdirectory deletion.
            - If successful, it returns RespMsg.OK.
            - If the subdirectory is not found, it returns RespMsg.NOT_FOUND.
        """
        data = Json.load_json_file(self.notes_relative_path)

        for dir in data["categories"]:
            for sub_dir in dir["subcategories"]:
                if sub_dir["id"] == subcategory_id:
                    dir["subcategories"].remove(sub_dir)
                    Json.update_json_file(self.notes_relative_path, data)
                    return RespMsg.OK
        return RespMsg.NOT_FOUND
    

    def __construct_sub_dir_object(self, sub_dir_name):
        id = IdGenerator.ID('SubDirectory')
        return SubDirectory(id, sub_dir_name)