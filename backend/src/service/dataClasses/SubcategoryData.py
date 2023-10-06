from backend.src.domains.noteDomain.subCategory import SubCategory
from backend.src.service.enums.responseMessages import RespMsg
from backend.src.service.fileOperations.JsonOperations import Json
import os

class SubcategoryData:
    def __init__(self):
        self.notes_relative_path = os.getcwd() + '/storage/json/notes.json'



    def add_subcategory(self, category_name: str, sub_category: SubCategory):
        data = Json.load_json_file(self.notes_relative_path)
        try:
            for category in data["categories"]:
                if category["name"] == category_name:
                    category["subcategories"].append(sub_category.__dict__)
                    Json.update_json_file(self.notes_relative_path, data)
                    return RespMsg.OK
            
            return RespMsg.CATEGORY_404
        except Exception as e: 
            return e
        


    # This function will return all the subcategory names of a given category_name parameter
    # The function will return a desriptive error message, if the category_nme parameter contains a invalid name.
    def get_subcategories(self, category_name):
        data = Json.load_json_file(self.notes_relative_path)

        # Search for the category by name
        for category in data["categories"]:
            if category["name"] == category_name:
                return [sub["name"] for sub in category["subcategories"]]
            
        return RespMsg.CATEGORY_404  



    def update_subcategory(self, subcategory_id, new_subcategory_name):
        data = Json.load_json_file(self.notes_relative_path)

        try:
            for category in data['categories']:
                for subcategory in category['subcategories']:
                    if subcategory['id'] == subcategory_id:
                        subcategory['name'] = new_subcategory_name
                        Json.update_json_file(self.notes_relative_path, data)
                        return RespMsg.OK
            return RespMsg.SUBCATEGORY_404
        except Exception as e:
            return RespMsg.INTERAL_SERVER_ERROR
    
        

    # subcategory_id is used to locate the subcategory that i requested to be deleted.
    # The function will return a suitted error message, if the subcategory contains a invalid ID.
    def delete_subcategory(self, subcategory_id: int):
        data = Json.load_json_file(self.notes_relative_path)

        try:
            for category in data["categories"]:
                for subcategory in category["subcategories"]:
                    if subcategory["id"] == subcategory_id:
                        category["subcategories"].remove(subcategory)
                        Json.update_json_file(self.notes_relative_path, data)
                        return RespMsg.OK
            return RespMsg.SUBCATEGORY_404
        except Exception as e:
            return RespMsg.INTERAL_SERVER_ERROR