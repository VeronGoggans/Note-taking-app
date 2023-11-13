from backend.domain.SubDirectory import SubDirectory
from backend.requestClasses.SubDirectoryRequest import SubDirectoryRequest
from backend.domain.enums.responseMessages import RespMsg
from backend.service.fileOperations.JsonOperations import Json
from backend.service.generators.IdGenerator import IdGenerator
import os

class SubDirectoryData:
    def __init__(self):
        self.notes_relative_path = os.getcwd() + '/storage/json/notes.json'



    def add(self, dir_id: str, sub_dir_data: SubDirectoryRequest):
        data = Json.load_json_file(self.notes_relative_path)
        sub_dir: SubDirectory = self.__construct_sub_dir_object(sub_dir_data.name)

        for dir in data["categories"]:
            if dir["id"] == dir_id:
                dir["subcategories"].append(sub_dir.__dict__)
                Json.update_json_file(self.notes_relative_path, data)
                return RespMsg.OK
        return RespMsg.NOT_FOUND
        


    # This function will return all the subcategory names of a given category_name parameter
    # The function will return a desriptive error message, if the category_nme parameter contains a invalid name.
    def get(self, dir_name):
        data = Json.load_json_file(self.notes_relative_path)

        for dir in data["categories"]:
            if dir["name"] == dir_name:
                return [sub["name"] for sub in dir["subcategories"]]
        return RespMsg.NOT_FOUND  



    def update(self, sub_dir_id: int, new_name: str):
        data = Json.load_json_file(self.notes_relative_path)

        for dir in data['categories']:
            for sub_dir in dir['subcategories']:
                if sub_dir['id'] == sub_dir_id:
                    sub_dir['name'] = new_name
                    Json.update_json_file(self.notes_relative_path, data)
                    return RespMsg.OK
        return RespMsg.NOT_FOUND    
        

    # subcategory_id is used to locate the subcategory that i requested to be deleted.
    # The function will return a suitted error message, if the subcategory contains a invalid ID.
    def delete(self, subcategory_id: int):
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