from src.backend.util.calendar import Calendar

class Folder:
    def __init__(self, id: int, name: str, color: str = 'rgb(255, 255, 255)', last_visit = Calendar.datetime(), notes = [], subfolders = []):
        self.id = id
        self.name = name
        self.color = color
        self.last_visit = last_visit
        self.notes = notes
        self.subfolders = subfolders


    @classmethod
    def from_json(self, json_folder):
        return Folder(
            json_folder['id'], 
            json_folder['name'], 
            json_folder['color'], 
            json_folder['last_visit'], 
            json_folder['notes'],
            json_folder['subfolders']
        )