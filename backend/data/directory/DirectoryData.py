from backend.domain.Directory import Directory
from backend.presentation.requestBodies.DirectoryRequest import DirectoryRequest
from backend.domain.enums.responseMessages import RespMsg
from backend.service.fileOperations.JsonOperations import Json
from backend.service.generators.IdGenerator import IdGenerator
import os

class DirectoryData:
    def __init__(self):
        self.notes_relative_path = os.getcwd() + '/storage/json/notes.json'


    def get(self) -> list:
        """
        Retrieve a list of directories from the notes structure.

        Returns:
            List[Dict[str, Union[int, str]]]: A list of dictionaries containing directory information.
            - Each dictionary includes 'id' and 'name' keys representing the directory's unique identifier and name.
        """
        data = Json.load_json_file(self.notes_relative_path)

        dir_list = []
        for dir in data['categories']:
            dir_object = {'id': dir['id'], 'name': dir['name']}
            dir_list.append(dir_object)
        return dir_list


    def add(self, dir_data: DirectoryRequest) -> RespMsg:
        """
        Add a new directory to the notes structure.

        Args:
            dir_data (DirectoryRequest): Data containing information to create the new directory.

        Returns:
            RespMsg: A response message indicating the outcome of the directory addition.
            - If successful, it returns RespMsg.OK.
        """
        data = Json.load_json_file(self.notes_relative_path)
        directory: Directory = self.__construct_dir_object(dir_data.name)
        
        data["categories"].append(directory.__dict__)
        Json.update_json_file(self.notes_relative_path, data)
        return RespMsg.OK

    
    def update(self, dir_id: int, dir_name: str) -> RespMsg:
        """
        Update the name of a directory in the notes structure.

        Args:
            dir_id (int): The unique identifier of the directory to update.
            dir_name (str): The new name for the directory.

        Returns:
            RespMsg: A response message indicating the outcome of the directory update.
            - If successful, it returns RespMsg.OK.
            - If the directory is not found, it returns RespMsg.NOT_FOUND.
        """
        data = Json.load_json_file(self.notes_relative_path)

        for dir in data['categories']:
            if dir['id'] == dir_id:
                dir['name'] = dir_name
                Json.update_json_file(self.notes_relative_path, data)
                return RespMsg.OK
        return RespMsg.NOT_FOUND
        
    
    def delete(self, dir_id: int) -> RespMsg:
        """
        Delete a directory from the notes structure.

        Args:
            dir_id (int): The unique identifier of the directory to delete.

        Returns:
            RespMsg: A response message indicating the outcome of the directory deletion.
            - If successful, it returns RespMsg.OK.
            - If the directory is not found, it returns RespMsg.NOT_FOUND.
        """
        data = Json.load_json_file(self.notes_relative_path)

        for dir in data['categories']:
            if dir['id'] == dir_id:
                data['categories'].remove(dir)
                Json.update_json_file(self.notes_relative_path, data)
                return RespMsg.OK        
        return RespMsg.NOT_FOUND
    

    def __construct_dir_object(self, dir_name: str):
        id = IdGenerator.ID()
        return Directory(id, dir_name)
    

    def __update_dir_object(self, dir_name: str):
        pass