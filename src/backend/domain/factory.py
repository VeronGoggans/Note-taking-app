from src.backend.domain.note import Note
from src.backend.domain.template import Template
from src.backend.data.exceptions.exceptions import DeserializationException

class Factory:  

    @staticmethod
    def to_list(notes: list[dict]) -> list[Note]:
        note_objects = []
        for n in notes:
            note = Note.from_json(n)
            note.set_content_text()
            note_objects.append(note)
        return note_objects


    @staticmethod
    def to_priority_list(notes: list) -> list[Note]:
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
        try:
            for t in templates:
                template = Template.from_json(t)
                template.set_content_text()
                template_objects.append(template)

            return template_objects
        except Exception as e:
            raise DeserializationException('Failed to deserialize the templates', errors={'exceptions': str(e)})