import json
from src.backend.data.cache.json_cache import JsonCache
from src.backend.util.paths import ID_PATH, PREFIXES

class JsonManager:
    def __init__(self) -> None:
        self.cache = JsonCache()

    
    def load(self, file_path) -> dict:
        """
        Load JSON data from a file.

        Args:
            file_path (str): The path of the JSON file to load.

        Returns:
            dict: The loaded JSON data as a dictionary.
        """
        json_data = self.cache.get(file_path)
        if json_data:
            return json_data
        
        with open(file_path, 'r') as file:
            json_data = json.load(file)
            self.cache.add(file_path, json_data)
            return json_data
    

    def update(self, file_path, updated_data) -> None:
        """
        Update a JSON file with new data.

        Args:
            file_path (str): The path of the JSON file to update.
            updated_data (dict): The updated data to write to the file.

        Returns:
            None: This method does not return a value.
        """
        backup = self.load(file_path)
        self.cache.update(file_path, updated_data)
        
        try:
            with open(file_path, 'w') as file:
                json.dump(updated_data, file, indent=4)
        except Exception as e:
            with open(file_path, 'w') as file:
                json.dump(backup, file, indent=4)


    def generate_id(self, entity_name) -> str:
        """
        Generate a unique identifier for a specified entity type.
        Both uppercase/lowercase work.

        Args:
            entity_name (str): The name of the entity for which to generate the unique identifier.

        Returns:
            Union[int, ValueError]: 
            - If successful, it returns the generated unique identifier.
            - If the specified entity does not exist yet, it raises a Error indicating that the entity does not exist.
        """
        data = self.load(ID_PATH)

        for entity in data['ids']:
            if entity.get('entity') == entity_name.lower():
                unique_id = entity['id']
                entity['id'] = unique_id + 1
                self.update(ID_PATH, data)
                return f'{PREFIXES[entity_name]}{unique_id}'
            
        raise ValueError(f'{entity_name} is not a valid entity name.')