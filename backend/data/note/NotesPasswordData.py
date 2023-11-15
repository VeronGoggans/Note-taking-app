from backend.domain.enums.responseMessages import RespMsg
from backend.service.fileOperations.JsonOperations import Json
from backend.domain.enums.passwordActions import PasswordActions
import os

class NotesPasswordsData:
    def __init__(self):
        self.notes_relative_path = os.getcwd() + '/storage/json/notes.json'
        self.notesPasswords_relative_path = os.getcwd() + '/storage/json/notesPasswords.json'


    # Paremeter - 1 note_id is used to find the note that matches in id
    # Paremeter - 2 parent is used to tell the function if it should look in only the categories or in only the subcategories.
    # Paremeter - 3 data is the json data that will be updated.
    # Paremeter - 4 action is either the enum ADD or REMOVE 
    # This function is used to update the password_protected field in the json file to true or false.
    def __update_notes_json_file(self, note_id: int, parent: bool, data, action):
        condition = None
        if action == PasswordActions.ADD:
            condition = True
        if action == PasswordActions.REMOVE:
            condition = False


        if parent == True and note_id > 0:
            for category in data["categories"]:
                for note in category['notes']:
                    if note['id'] == note_id:
                        note['password_protected'] = condition
                        Json.update_json_file(self.notes_relative_path, data)
                    
        if parent == False and note_id > 0:
            for category in data["categories"]:
                for subcategory in category['subcategories']:
                    for note in subcategory['notes']:
                        if note['id'] == note_id:
                            note['password_protected'] = condition
                            Json.update_json_file(self.notes_relative_path, data)
        

    # Paremeter - 1 note_id is used for the __update_notes_json_file function and to add a id/password combination to the notesPasswords.json file
    # Paremeter - 2 password is used to add a id/password combination to the notesPasswords.json file
    # Paremeter - 3 parent is used for the __update_notes_json_file function
    # This function adds the id/password combination to the notesPasswords.json file 
    # and then updates the password_protected field in the notes.json file to true
    def add_note_password(self, note_id: int, password: str, parent: bool):
        data = Json.load_json_file(self.notes_relative_path)
        self.__update_notes_json_file(note_id, parent, data, PasswordActions.ADD)
        
        try:
            password_data = Json.load_json_file(self.notesPasswords_relative_path)
            password_data['passwords'].append({"noteId": note_id, "password": password})
            Json.update_json_file(self.notesPasswords_relative_path, password_data)
            return RespMsg.OK
        except Exception as e:
            return RespMsg.INTERAL_SERVER_ERROR
        

    # Paremeter - 1 note_id is used for the __update_notes_json_file function and to add a id/password combination to the notesPasswords.json file
    # Paremeter - 3 parent is used for the __update_notes_json_file function
    # This function removes the id/password combination from the notesPasswords.json file 
    # and then updates the password_protected field in the notes.json file to false
    def delete_note_password(self, note_id: int, parent: bool):
        data = Json.load_json_file(self.notes_relative_path)
        self.__update_notes_json_file(note_id, parent, data, PasswordActions.REMOVE)
        
        try:
            password_data = Json.load_json_file(self.notesPasswords_relative_path)
            for password in password_data['passwords']:
                if password['noteId'] == note_id:
                    password_data['passwords'].remove(password)
                    Json.update_json_file(self.notesPasswords_relative_path, password_data)
                    return RespMsg.OK
        except Exception as e:
            return RespMsg.INTERAL_SERVER_ERROR
        

    # Paremeter - 1 note_id is used to find the note/password combination in the notesPasswords.json file
    # This function searches for the matching note id and then returns it's related password.
    def get_note_password(self, note_id: int):
        data = Json.load_json_file(self.notesPasswords_relative_path)

        for password in data['passwords']:
            if password['noteId'] == note_id:
                return password['password']
        return RespMsg.NOTE_404