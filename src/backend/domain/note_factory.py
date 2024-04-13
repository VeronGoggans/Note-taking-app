from src.backend.presentation.request_bodies.note.post_note_request import PostNoteRequest
from src.backend.domain.note import Note

class NoteFactory:

    @staticmethod
    def create_new_note(id: str, post_request: PostNoteRequest) -> Note:
        note = Note(
            id,
            post_request.title,
            post_request.content,
            post_request.bookmark,
        )
        note.set_content_path()
        return note
    

    @staticmethod
    def create_existing_note(note_data) -> Note:
        return Note(
            note_data['id'], 
            note_data['title'], 
            note_data['content'], 
            note_data['bookmark'], 
            note_data['color'],
            note_data['last_edit'],
            note_data['creation']
        )
    
    @staticmethod
    def create_note_list(notes: list) -> list[Note]:
        note_objects = []
        for n in notes:
            note = NoteFactory.create_existing_note(n)
            note.set_content_text()
            note_objects.append(note)
        return note_objects