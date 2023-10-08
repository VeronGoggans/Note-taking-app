import os
from backend.src.service.fileOperations.JsonOperations import Json


class IdGenerator:
    def __init__(self) -> None:
        pass

    # This method creates an unique id for a specified entity.
    # This method returns the created unique id.
    # This method uses the two static methods from the JSONOperations class
    # to load the json data from the id.json file and update the id.json file with the updated data. 
    @staticmethod
    def ID(entity_name: str):
        path_to_id_file = os.getcwd() + "/storage/id.json"

        data = Json.load_json_file(path_to_id_file)
        unique_id = None

        for entity in data['ids']:
            if entity['entityName'] == entity_name:
                unique_id = entity['id']
                entity['id'] = unique_id + 1
                Json.update_json_file(path_to_id_file, data)
                return unique_id
        return "Entity does not exist yet"