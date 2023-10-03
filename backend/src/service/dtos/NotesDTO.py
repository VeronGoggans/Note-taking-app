from backend.src.domains.noteDomain.Note import Note
from backend.src.service.enums.responseMessages import RespMsg
from backend.src.service.fileOperations.JsonOperations import Json
import os

class NoteDTO:
    def __init__(self):
        self.notes_relative_path = os.getcwd() + '/storage/json/notes.json'
    
    # This function sorts the given list of note objects by bookmark
    # If the note object has a bookmrk it gets appended to the list first.
    # It returns a sorted list of note objects.
    def __sort_notes_list(self, notes: list):
        sorted_list = []
        for note in notes:
            if note['bookmark'] == True:
                sorted_list.append(note)
        for note in notes:
            if note['bookmark'] == False:
                sorted_list.append(note)
        return sorted_list

    # Parameter 1 - category_id is the id of the category that the user wants to add a note to
    # Parameter 2 - parent tells the function if it is looking for a category or a subcategory
    # Parameter 3 - note is the actual note object that is going to be added to the json file and thus the category.
    def add_note(self, category_id: int, parent: bool, note: Note):
        """category_name is the name of the category or subcategory you want to add the note to.
           parent is a indecator to tell the program if the category_name parameter is suppossed to represent a category or subcategory
           for category true and subcategory false. And note is a Note object which will be added to the json file"""
        data = Json.load_json_file(self.notes_relative_path)
        try: 
            if parent:
                for category in data["categories"]:
                    if category["id"] == category_id:
                        category["notes"].append(note.__dict__)
                        Json.update_json_file(self.notes_relative_path, data)
                        return RespMsg.OK
            else:
                for category in data['categories']:
                    for subcategory in category['subcategories']:
                        if subcategory["id"] == category_id:
                            subcategory['notes'].append(note.__dict__)
                            Json.update_json_file(self.notes_relative_path, data)
                            return RespMsg.OK
            return RespMsg.SOMETHING_WENT_WRONG
        except IOError as e:
            return e



    # NOTE change category_name to category_id
    # Parameter 1 - category_id is used to find the category to get the notes from
    # Parameter 2 - parent is used to tell the function if the category_id is a category or a subcategory.
    # If parent is True the function will only look threw the categories to find the matching id 
    # If parent is False the function will only look threw the subcategories of each parent category for the matching id

    # Parameter 3 - rerender is used to tell the function if it should only return the last note. 
    # Rerender is only True if the user created a note and want that note send to the front end to be displayed.
    # If rerender is False the function will return all the notes inside a category. 
    def get_notes(self, category_name: str, parent: bool, rerender: bool):
        data = Json.load_json_file(self.notes_relative_path)

        if parent == True and rerender == False:
            for category in data["categories"]:
                if category["name"] == category_name:
                    return self.__sort_notes_list(category["notes"])
                
        if parent and rerender:
            for category in data["categories"]:
                if category["name"] == category_name:
                    return category["notes"][-1]
                
        if parent == False and rerender == True:
            for category in data["categories"]:
                for subcategory in category["subcategories"]:
                    if subcategory["name"] == category_name:
                        return subcategory["notes"][-1]
                    
        if parent == False and rerender == False:
            for category in data["categories"]:
                for subcategory in category["subcategories"]:
                    if subcategory["name"] == category_name:
                        return self.__sort_notes_list(subcategory["notes"])
                    
        return RespMsg.CATEGORY_404

    # Parameter 1 - parent is used to tell the function if the note_id is inside a category or a subcategory.
    # If parent is True the function will only look threw the categories to find the matching note_id 
    # If parent is False the function will only look threw the subcategories of each parent category for the matching note_id

    # Parameter 2 - note_id is used to look for the specific note
    # The function will return a single note that matches the same id, if note_id has a value above 0
    # The function will ignore the note_id if it has a value of 0 and will return a 404 message.
    def get_note_by_id(self, parent: bool, note_id: int):
        data = Json.load_json_file(self.notes_relative_path)
        
        if parent == True and note_id > 0:
            for category in data["categories"]:
                for note in category['notes']:
                    if note['id'] == note_id:
                        return note
            return RespMsg.NOTE_404
                    
        if parent == False and note_id > 0:
            for category in data["categories"]:
                for subcategory in category['subcategories']:
                    for note in subcategory:
                        if note['id'] == note_id:
                            return note
            return RespMsg.NOTE_404

    # Parameter 1 - parent is used to tell the function if the updated note is inside a category or a subcategory.
    # If parent is True the function will only look threw the categories to find the matching note id 
    # If parent is False the function will only look threw the subcategories of each parent category for the matching note id

    # Parameter 2 - updated_note contains a note object with the updated content 
    # The updated note object will be used to update the current version of that note.

    def update_note(self, parent: bool, updated_note: Note):
        data = Json.load_json_file(self.notes_relative_path)
        try: 
            if parent:
                for category in data["categories"]:
                    for note in category['notes']:
                        if note['id'] == updated_note.id:
                            note['title'] = updated_note.title
                            note['content'] = updated_note.content
                            note['bookmark'] = updated_note.bookmark
                            note['password_protected'] = updated_note.password_protected
                            Json.update_json_file(self.notes_relative_path, data)
                            return note
                return RespMsg.NOTE_404
            else:
                for category in data['categories']:
                    for subcategory in category['subcategories']:
                        for note in subcategory['notes']:
                            if note["id"] == updated_note.id:
                                note['title'] = updated_note.title
                                note['content'] = updated_note.content
                                note['bookmark'] = updated_note.bookmark
                                note['password_protected'] = updated_note.password_protected
                                Json.update_json_file(self.notes_relative_path, data)
                                return note
                return RespMsg.NOTE_404
        except IOError as e:
            return RespMsg.INTERAL_SERVER_ERROR
        

    def update_note_category(self, note_id: int, category_id: int, parent: bool):
        try:
            note_dict = self.get_note_by_id(parent, note_id)
            note = Note(note_dict['id'], note_dict['title'], note_dict['content'], note_dict['bookmark'], note_dict['password_protected'])
            self.delete_note(note_id, parent)
            self.add_note(category_id, parent, note) 
            return RespMsg.OK
        except Exception as e:
            return RespMsg.INTERAL_SERVER_ERROR   
        
        
    # note_id is used to find the note that is requested to be deleted
    # child_of_parent tells the function if the note is inside of a category or subcategory
    # if child_of_parent is true the function will only search threw the categories
    # if child_of_parent is false the function will search threw all subcategories  
    def delete_note(self, note_id: int, child_of_parent: bool):
        data = Json.load_json_file(self.notes_relative_path)

        try:
            if child_of_parent: # Searching threw all the categories
                for category in data['categories']:
                    for note in category['notes']:
                        if note['id'] == note_id:
                            category['notes'].remove(note)
                            Json.update_json_file(self.notes_relative_path, data)
                            return RespMsg.OK

            else: # Searching threw all the subcategories
                for category in data['categories']:
                    for subcategory in category['subcategories']:
                        for note in subcategory['notes']:
                            if note['id'] == note_id:
                                subcategory['notes'].remove(note)
                                Json.update_json_file(self.notes_relative_path, data)
                                return RespMsg.OK
                            
            return RespMsg.NOTE_404
        except Exception as e:
            return RespMsg.INTERAL_SERVER_ERROR