from src.backend.domain.note import Note
from src.backend.presentation.request_bodies.note.put_note_request import PutNoteRequest
from src.backend.util.calendar import Calendar
from src.backend.domain.factory import Factory
from src.backend.util.folder_finder import FolderFinder

class NoteManager:
    def __init__(self):
        self.search_bar_note_objects = []
        self.favorites = []
    

    def add_note(self, folders, folder_id: str, note: Note):
        """
        Add a note to a specified folder in the notes structure.

        Args:
            folders (List[dict]): The list of folders to search within.
            folder_id (str): The identifier of the folder to which the note will be added.
            note (Note): the note object to be added in a folder.

        Returns:
            dict or None: 
            - If successful, it returns the note.
            - If the folder is not found, it returns None.
        """
        parent_folder = FolderFinder.find_folder_by_id(folders, folder_id)
        if parent_folder:
            parent_folder['notes'].append(note.__dict__)
            return note
        return None

    
    def get_notes(self, folders, folder_id: str):
        """
        Retrieve a list of notes from a specified folder in the notes structure.

        Args:
            folders (List[dict]): The list of folders to search within.
            folder_id (str): The identifier of the folder from which to retrieve notes from.

        Returns:
            dict or None: 
            - If successful, it returns a list of notes as dictionaries.
            - If the folder is not found, it returns None.
        """
        parent_folder = FolderFinder.find_folder_by_id(folders, folder_id)
        if parent_folder:
            notes_list = Factory.create_note_list(parent_folder['notes'])
            return notes_list
        return None


    def get_note_by_id(self, folders, note_id: str):
        """
        Retrieve a specific note from the notes structure by its unique identifier.

        Args:
            folders (List[dict]): The list of folders to search within.
            note_id (str): The unique identifier of the note to retrieve.

        Returns:
            dict or None: 
            - If successful, it returns the specific Note object.
            - If the note is not found, it returns None.
        """
        for folder in folders:
            for note in folder["notes"]:
                if note.get("id") == note_id:
                    note_object = Note.from_json(note)
                    note_object.set_content_text()
                    return note_object, folder['id'], folder['name']
            
            # If note is not found in current folder, search in subfolders recursively
            note_object = self.get_note_by_id(folder["subfolders"], note_id)
            if note_object:
                return note_object

        # Note not found in any folder or subfolder
        return None
    

    def get_note_name_id(self, folders):
        
        for folder in folders:
            for note in folder['notes']:
                self.search_bar_note_objects.append(
                    {
                        'id': note['id'],
                        'name': note['name'],
                        'folder_name': folder['name']
                    }
                )
            self.get_note_name_id(folder['subfolders'])
        return self.search_bar_note_objects     
    

    def get_favorites(self, folders):
        for folder in folders:
            for note in folder['notes']:
                if note.get('favorite') == True:
                    self.favorites.append(note)

            self.get_favorites(folder['subfolders'])
        return Factory.create_note_list(self.favorites)
               

    def update_note(self, folders, put_request: PutNoteRequest):
        """
        Update a note with the provided note data.

        Args:
            folders (List[dict]): The list of folders to search within.
            put_request (PutNoteRequest): The data to update the note.

        Returns:
            dict or None: 
            - If successful, it returns the updated note as a dictionary.
            - If the note with the specified ID is not found, it returns None.
        """
        note_id = put_request.note_id
        current_note = self.__find_note(folders, note_id)
        if current_note:
            updated_note = self.__update_entity(current_note, put_request)
            return updated_note
        return None
    

    def update_note_color(self, folders, note_id: str, color: str):
        """
        Update the color of a note

        Args:
            folders (List[dict]): The list of folders to search within.
            note_id (str): The unique identifier of the note to be updated.
            color (str): The new color for the note.
            
        Returns:
            dict or None: 
            - If successful, it returns the updated note as a dictionary.
            - If the note with the specified ID is not found, it returns None.
        """
        note = self.__find_note(folders, note_id)
        if note:
            note['color'] = color
            note_object = Note.from_json(note)
            note_object.set_content_text()
            return note_object
        return None


    def delete_note(self, folders, note_id: str, delete_txt_file = True):
        """
        Delete a specific note from the notes structure by its unique identifier.

        Args:
            folders (List[dict]): The list of folders to search within.
            note_id (str): The unique identifier of the note to delete.
            delete_txt_file (bool): A boolean indicating if the linked txt file should be removed or not.

        Returns:
            dict or None: 
            - If successful, it returns the deleted note.
            - If the note is not found, it returns None.
        """
        for folder in folders:
            for note in folder['notes']:
                if note.get('id') == note_id:
                    folder['notes'].remove(note)
                    if delete_txt_file:
                        self.__delete_note_txt_file(note)
                    return note
        
            note_in_subfolder = self.delete_note(folder['subfolders'], note_id)
            if note_in_subfolder:
                return note_in_subfolder
        return None   

    def clear_search_options_list(self):
        self.search_bar_note_objects = []    

    def clear_favorites_list(self):
        self.favorites = []
    

    def __find_note(self, folders, note_id: str):
        """
        Recursively search for a note with the specified ID within the folder structure.

        Args:
            folders (List[dict]): The list of folders to search within.
            note_id (str): The ID of the note to be found.

        Returns:
            dict or None: 
            - If the note is found, it returns the note's dictionary.
            - If the specified note is not found, it returns None.
        """
        for folder in folders:
            for note in folder["notes"]:
                if note.get("id") == note_id:
                    return note
        
            note_in_subfolder = self.__find_note(folder["subfolders"], note_id)
            if note_in_subfolder:
                return note_in_subfolder
        return None
    

    def __delete_note_txt_file(self, note_data: Note):
        """This method will delete the htm file linked to the note object."""
        note_object = Note.from_json(note_data)
        note_object.delete_note_file(note_object.content)

    
    def __update_entity(self, current_note: dict, updated_note: PutNoteRequest):
        current_time = Calendar.datetime()

        note = Note.from_json(current_note)
        note.update_content(note.content, updated_note.content)
        note.content = updated_note.content
        note.bookmark = updated_note.bookmark
        note.favorite = updated_note.favorite
        note.color = updated_note.color
        note.name = updated_note.name
        note.last_edit = current_time
        print(note.content)

        current_note['name'] = updated_note.name
        current_note['bookmark'] = updated_note.bookmark
        current_note['favorite'] = updated_note.favorite
        current_note['color'] = updated_note.color
        current_note['last_edit'] = current_time
        return note