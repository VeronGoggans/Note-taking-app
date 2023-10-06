class Category:
    def __init__(self, id: int, name: str):
        self.id = id
        self.name = name
        self.subcategories = []
        self.notes = []