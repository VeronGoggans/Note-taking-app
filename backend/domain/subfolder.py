class Subfolder:
    def __init__(self, id: int, name: str, password = ''):
        self.id = id
        self.name = name
        self.password_protected = False
        self.password = password
        self.notes = []    