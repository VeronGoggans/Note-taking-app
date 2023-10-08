import json

class Json:
    def __init__(self) -> None:
         pass

    # This method loads a json file from a given file path.
    # This method returns the json data that is in the json file.
    @staticmethod
    def load_json_file(file_path):
        try:
            with open(file_path, 'r') as file:
                data = json.load(file)
                return data
        except IOError as e:
            print(e)

    # This method updates a json file with new/updated data.
    # This method has no return value.
    @staticmethod
    def update_json_file(file_path, updated_data):
        with open(file_path, 'w') as file:
                json.dump(updated_data, file, indent=4)
                file.close()