class Folder:
    def __init__(self, id: int, name: str, color: str):
        self.id = id
        self.name = name
        self.color = color
        self.notes = []
        self.subfolders = []