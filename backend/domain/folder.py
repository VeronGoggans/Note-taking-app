class Folder:
    def __init__(self, id: int, name: str):
        self.id = id
        self.name = name
        self.notes = []
        self.subfolders = []