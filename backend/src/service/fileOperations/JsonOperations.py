import json

class Json:
    def __init__(self) -> None:
         pass

    # file_name is the name of the file the user wants to load.
    # After it loads the json data it return it.  
    @staticmethod
    def load_json_file(file_path):
        try:
            with open(file_path, 'r') as file:
                data = json.load(file)
                return data
        except IOError as e:
            print(e)

    # updated_data is the updated json data that needs to be writen/update to the corrisponding json file.
    # file_name is the name of te json file the updated json data should be written to.
    @staticmethod
    def update_json_file(file_path, updated_data):
        with open(file_path, 'w') as file:
                json.dump(updated_data, file, indent=4)
                file.close()