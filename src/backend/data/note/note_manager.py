from src.backend.domain.note import Note
from src.backend.presentation.request_bodies.note_requests import *
from src.backend.util.calendar import Calendar
from src.backend.domain.factory import Factory
from src.backend.data.exceptions.exceptions import *
from datetime import datetime


class NoteManager:    

    def add_note(self, folder_id: str, note: Note) -> (Note | AdditionException | NotFoundException):
        pass

    
    def get_notes(self, folder_id: str) -> (list[Note] | NotFoundException):
        pass


    def get_note_by_id(self, note_id: str) -> (Note | NotFoundException):
        pass
    

    def get_recent_notes(self, notes_list: list) -> list[dict]:
        pass 


    def get_note_name_id(self, search_items: list) -> list[dict]:
        pass     
    

    def get_bookmarks(self, bookmarks: list) -> list[Note]:
        pass
               

    def update_note(self, request: PutNoteRequest) -> (Note | NotFoundException):
        pass
    

    def delete_note(self, note_id: str):
        pass 

    

    def get_top_6_most_recent_notes(self, notes: list) -> list[Note]:
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