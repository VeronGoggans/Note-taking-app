from src.backend.util.calendar import Calendar

class Folder:
    def __init__(self, id: int, name: str, color: str):
        self.id = id
        self.name = name
        self.color = color
        self.last_visit = Calendar.datetime()
        self.notes = []
        self.subfolders = []