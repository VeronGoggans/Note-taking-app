from src.backend.domain.note import Note
from src.backend.domain.template import Template

class Factory:    

    @staticmethod
    def create_note_list(notes: list) -> list[Note]:
        bookmarked_notes = []
        non_bookmarked_notes = []

        for note in notes:
            if note.get("bookmark", True):
                bookmarked_notes.append(note)
            else:
                non_bookmarked_notes.append(note)

        # Combine the lists, with bookmarked notes first
        sorted_list = bookmarked_notes + non_bookmarked_notes

        note_objects = []
        for n in sorted_list:
            note = Note.from_json(n)
            note.set_content_text()
            note_objects.append(note)
            
        return note_objects
    

    @staticmethod
    def create_template_list(templates: list) -> list[Template]:
        template_objects = []

        for t in templates:
            template = Template.from_json(t)
            template.set_content_text()
            template_objects.append(template)

        return template_objects