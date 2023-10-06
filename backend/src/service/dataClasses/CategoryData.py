from backend.src.domains.noteDomain.category import Category
from backend.src.service.enums.responseMessages import RespMsg
from backend.src.service.fileOperations.JsonOperations import Json
import os

class CategoryData:
    def __init__(self):
        self.notes_relative_path = os.getcwd() + '/storage/json/notes.json'



    def add_category(self, category: Category):
        data = Json.load_json_file(self.notes_relative_path)
        try:
            data["categories"].append(category.__dict__)
            Json.update_json_file(self.notes_relative_path, data)
            return RespMsg.OK
        except IOError as e:
            return e
        


    # This function returns all the catgories that are stored in the json file
    # and takes in one parameter
    # rerender will be set to true if the user just added another category 
    # and tells the program that it only needs to return the new category
    # This function will return all category if rerender is set to false 
    def get_categories(self, rerender: bool):
        data = Json.load_json_file(self.notes_relative_path)
        category_id_name_list = []
        if not rerender:
            for categorie in data['categories']:
                id = categorie['id']
                name = categorie['name']
                id_name_object = {'id': id, 'name': name}
                category_id_name_list.append(id_name_object)
            return category_id_name_list
        else: 
            category_id_name_list.append({'id': data['categories'][-1]['id'], 'name': data['categories'][-1]['name']})
            return category_id_name_list
            

    
    def update_category(self, category_id, new_category_name):
        data = Json.load_json_file(self.notes_relative_path)

        try:
            for category in data['categories']:
                if category['id'] == category_id:
                    category['name'] = new_category_name
                    Json.update_json_file(self.notes_relative_path, data)
                    return RespMsg.OK
            return RespMsg.CATEGORY_404
        except Exception as e:
            return RespMsg.INTERAL_SERVER_ERROR
        
    

    # category_id is used to locate the category that is requested to be deleted.
    # The function wll return a suitted error message, if the category_id contains a invalid ID.
    def delete_category(self, category_id: int):
        data = Json.load_json_file(self.notes_relative_path)

        try: 
            for category in data['categories']:
                if category['id'] == category_id:
                    data['categories'].remove(category)
                    Json.update_json_file(self.notes_relative_path, data)
                    return RespMsg.OK
                
            return RespMsg.CATEGORY_404
        except Exception as e:
            return RespMsg.INTERAL_SERVER_ERROR