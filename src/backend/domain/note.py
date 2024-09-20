from src.backend.util.calendar import Calendar

class Note:
    def __init__(self, id: str, name: str, content: str, bookmark = False, 
                last_edit = Calendar.datetime(), creation = Calendar.date()):
        self.id = id
        self.name = name
        self.content = content
        self.bookmark = bookmark
        self.last_edit = last_edit
        self.creation = creation

    


    @classmethod
    def from_json(self, json_note):
        return Note(
            json_note['id'], 
            json_note['name'], 
            json_note['content'], 
            json_note['bookmark'], 
            json_note['last_edit'],
            json_note['creation']
        )