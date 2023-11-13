from backend.domain.Directory import Directory
from backend.requestClasses.DirectoryRequest import DirectoryRequest
from backend.domain.enums.responseMessages import RespMsg
from backend.service.fileOperations.JsonOperations import Json
from backend.service.generators.IdGenerator import IdGenerator
import os

class DirectoryData:
    def __init__(self):
        self.notes_relative_path = os.getcwd() + '/storage/json/notes.json'



    def add(self, dir_data: DirectoryRequest):
        data = Json.load_json_file(self.notes_relative_path)
        directory: Directory = self.__construct_dir_object(dir_data.name)
        
        data["categories"].append(directory.__dict__)
        Json.update_json_file(self.notes_relative_path, data)
        return RespMsg.OK
        


    # This function returns all the catgories that are stored in the json file
    # and takes in one parameter
    # rerender will be set to true if the user just added another category 
    # and tells the program that it only needs to return the new category
    # This function will return all category if rerender is set to false 
    def get(self):
        data = Json.load_json_file(self.notes_relative_path)

        directory_id_name_list = []
        for directory in data['categories']:
            id_name_object = {'id': directory['id'], 'name': directory['name']}
            directory_id_name_list.append(id_name_object)
        return directory_id_name_list
            

    
    def update(self, category_id, new_category_name):
        data = Json.load_json_file(self.notes_relative_path)

        for category in data['categories']:
            if category['id'] == category_id:
                category['name'] = new_category_name
                Json.update_json_file(self.notes_relative_path, data)
                return RespMsg.OK
        return RespMsg.NOT_FOUND
        
    

    # category_id is used to locate the category that is requested to be deleted.
    # The function wll return a suitted error message, if the category_id contains a invalid ID.
    def delete(self, category_id: int):
        data = Json.load_json_file(self.notes_relative_path)

        for category in data['categories']:
            if category['id'] == category_id:
                data['categories'].remove(category)
                Json.update_json_file(self.notes_relative_path, data)
                return RespMsg.OK        
        return RespMsg.NOT_FOUND
    

    def __construct_dir_object(self, dir_name: str):
        id = IdGenerator.ID()
        return Directory()
    

    def __update_dir_object(self, dir_name: str):
        pass
