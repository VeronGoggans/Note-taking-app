import json

class Json:
    def __init__(self) -> None:
         pass

    
    @staticmethod
    def load_json_file(file_path) -> dict:
        """
        Load JSON data from a file.

        Args:
            file_path (str): The path of the JSON file to load.

        Returns:
            dict: The loaded JSON data as a dictionary.
        """
        with open(file_path, 'r') as file:
            data = json.load(file)
            return data
    

    @staticmethod
    def update_json_file(file_path, updated_data) -> None:
        """
        Update a JSON file with new data.

        Args:
            file_path (str): The path of the JSON file to update.
            updated_data (dict): The updated data to write to the file.

        Returns:
            None: This method does not return a value.
        """
        with open(file_path, 'w') as file:
            json.dump(updated_data, file, indent=4)