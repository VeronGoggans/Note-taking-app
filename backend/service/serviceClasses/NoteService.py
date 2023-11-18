from backend.data.note.NoteData1 import NoteData1
from backend.data.note.NoteData2 import NoteData2
from backend.presentation.requestBodies.NoteRequest import NoteRequest
from backend.service.generators.IdGenerator import IdGenerator
from backend.domain.Note import Note

class NoteService:
    def __init__(self, note_data_1: NoteData1, note_data_2: NoteData2):
        self.note_data_1 = note_data_1
        self.note_data_2 = note_data_2



    def get_notes(self, dir_id: int, note_type: str, directory=True):
        if directory:
            return self.note_data_1.get_notes(dir_id, note_type)
        return self.note_data_2.get_notes(dir_id, note_type)
    


    def get_note_by_id(self, note_id: int, directory = True):
        if directory:
            return self.note_data_1.get_note_by_id(note_id)
        return self.note_data_2.get_note_by_id(note_id)
    


    def add_note(self, dir_id: int, request_data: NoteRequest, directory = True):
        note : Note = self.__construct_note_object(request_data)
        note.set_content_path()
        if directory:
            return self.note_data_1.add_note(dir_id, note)
        return self.note_data_2.add_note(dir_id, note)

    

    def update_note(self, note_id: int, updated_note: NoteRequest, directory = True):
        if directory:
            return self.note_data_1.update_note(note_id, updated_note)
        return self.note_data_2.update_note(note_id, updated_note)
    


    def delete_note(self, note_id: int, directory = True):
        if directory:
            return self.note_data_1.delete_note(note_id)
        return self.note_data_2.delete_note(note_id)
    


    def __construct_note_object(self, note_data: NoteRequest):
        note_id = IdGenerator.ID("note")
        return Note(
            note_id, 
            note_data.title, 
            note_data.content, 
            note_data.bookmark, 
            note_data.password_protected
            )