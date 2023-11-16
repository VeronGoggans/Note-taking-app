from backend.data.note.DirectoryNoteData import DirectoryNoteData
from backend.presentation.requestBodies.NoteRequest import NoteRequest
from backend.service.generators.IdGenerator import IdGenerator
from backend.domain.Note import Note

class DirectoryNoteService:
    def __init__(self, note_data: DirectoryNoteData):
        self.note_data = note_data


    def get_notes(self, dir_id: int):
        return self.note_data.get_notes(dir_id)
    

    def get_notes_by_id(self, note_id: int):
        return self.note_data.get_note_by_id(note_id)
    

    def add_note(self, dir_id: int, note: NoteRequest):
        note_object : Note = self.__construct_note_object(note)
        note_object.set_content_path()
        return self.note_data.add_note(dir_id, note_object)
    
    
    def update_note(self, dir_id: int, note_id: int, updated_note: Note):
        return self.note_data.update_note
    

    def __construct_note_object(self, note_data: NoteRequest):
        note_id = IdGenerator.ID("note")
        return Note(
            note_id, 
            note_data.title, 
            note_data.content, 
            note_data.bookmark, 
            note_data.password_protected
            )