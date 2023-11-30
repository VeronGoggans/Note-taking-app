from backend.data.file.json_manager import Json
import os


class IDGenerator:
    @staticmethod
    def ID(entity_name: str) -> str:
        """
        Generate a unique identifier for a specified entity type.
        Entity types [note, folder, subfolder]. 
        Both uppercase/lowercase work.

        Args:
            entity_name (str): The name of the entity for which to generate the unique identifier.

        Returns:
            Union[int, ValueError]: 
            - If successful, it returns the generated unique identifier.
            - If the specified entity does not exist yet, it raises a Error indicating that the entity does not exist.
        """
        path_to_id_file = os.getcwd() + "/storage/json/id.json"

        data = Json.load(path_to_id_file)
        unique_id = None

        for entity in data['ids']:
            if entity.get('entity') == entity_name.lower():
                unique_id = entity['id']
                id_parts: list = entity['id'].split('-')
                string_part = id_parts[0]
                number_part = id_parts[-1]
                increment_ID = int(number_part) + 1
                entity['id'] = f'{string_part}-{str(increment_ID)}'
                Json.update(path_to_id_file, data)
                return unique_id
        raise ValueError(f'{entity_name} is not a valid entity name.')