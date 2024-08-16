from src.backend.domain.note import Note
from src.backend.presentation.dtos.note_dtos import *
from src.backend.util.calendar import Calendar
from src.backend.domain.factory import Factory
from src.backend.util.folder_finder import FolderFinder
from src.backend.data.exceptions.exceptions import AdditionException, NotFoundException
from src.backend.data.file.text_manager import TextManager
from datetime import datetime


class NoteManager:    

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
            try:
                parent_folder['notes'].append(note.__dict__)
                return note
            except Exception as e:
                raise AdditionException('An error occurred while adding the note', errors={'exception': str(e)})
        raise NotFoundException(f'Folder with id: {folder_id}, could not be found.')

    
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
            notes_list = Factory.to_priority_list(parent_folder['notes'])
            return notes_list
        raise NotFoundException(f'Folder with id: {folder_id}, could not be found.')


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
        note, folder = self.__find_note(folders, note_id)
        if note:
            note_object = Note.from_json(note)
            note_object.set_content_text()
            return note_object
        raise NotFoundException(f'Note with id: {note_id}, could not be found.')
    

    def get_recent_notes(self, folders: list, notes_list: list) -> list[dict]:
        for folder in folders:
            for note in folder['notes']:
                notes_list.append(note)
            self.get_recent_notes(folder['subfolders'], notes_list)
        return notes_list 


    def get_note_name_id(self, folders, search_items: list) -> list[dict]:
        for folder in folders:
            for note in folder['notes']:
                search_items.append({'id': note['id'],'name': note['name'],'folder_name': folder['name']})
            self.get_note_name_id(folder['subfolders'], search_items)
        return search_items     
    

    def get_bookmarks(self, folders, bookmarks: list) -> list[Note]:
        for folder in folders:
            for note in folder['notes']:
                if note.get('bookmark') == True:
                    bookmarks.append(note)

            self.get_bookmarks(folder['subfolders'], bookmarks)
        return Factory.to_priority_list(bookmarks)
               

    def update_note(self, folders, request_dto: PutNoteDto):
        """
        Update a note with the provided note data.

        Args:
            folders (List[dict]): The list of folders to search within.
            request_dto (PutNoteDto): The data to update the note.

        Returns:
            dict or None: 
            - If successful, it returns the updated note as a dictionary.
            - If the note with the specified ID is not found, it returns None.
        """
        note_id = request_dto.note_id
        current_note = self.__find_note(folders, note_id)[0]
        if current_note:
            updated_note = self.__update_entity(current_note, request_dto)
            return updated_note
        raise NotFoundException(f'Note with id: {note_id}, could not be found.')
    

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
        note, folder = self.__find_note(folders, note_id)
        if note:
            folder['notes'].remove(note)
            if delete_txt_file:
                TextManager.delete(note['content'])
            return note    
        raise NotFoundException(f'Note with id: {note_id}, could not be found.')    

    

    def __find_note(self, folders, note_id: str) -> list:
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
                    return note, folder
        
            note, folder = self.__find_note(folder["subfolders"], note_id)
            if note:
                return note, folder
        return None, None
    

    def get_top_6_most_recent_notes(self, notes: list) -> list:
        # Convert the last_edit strings to datetime objects within the dict
        for note in notes:
            note['last_edit_dt'] = datetime.strptime(note['last_edit'], "%d/%m/%Y %H:%M")

        # Sort the Note objects based on last_visit in descending order
        notes.sort(key=lambda note: note['last_edit_dt'], reverse=True)
        
        # Get the 5 most recetly worked on notes
        most_recent_notes = notes[:6]

        # Clean up by removing the temporary datetime objects
        for note in notes:
            del note['last_edit_dt']
        
        return Factory.to_list(most_recent_notes)


    
    def __update_entity(self, current_note: dict, updated_note: PutNoteDto):
        current_time = Calendar.datetime()

        note = Note.from_json(current_note)
        note.update_content(note.content, updated_note.content)
        note.content = updated_note.content
        note.bookmark = updated_note.bookmark
        note.name = updated_note.name
        note.last_edit = current_time

        current_note['name'] = updated_note.name
        current_note['bookmark'] = updated_note.bookmark
        current_note['last_edit'] = current_time
        return note