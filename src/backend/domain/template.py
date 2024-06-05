from src.backend.util.calendar import Calendar
from src.backend.domain.note import Note


class Template:
    def __init__(self, id: int, title: str, content: str, 
                last_edit = Calendar.datetime(), creation = Calendar.date()):
        self.id = id
        self.title = title
        self.content = content
        self.last_edit = last_edit
        self.creation = creation