class ProductBacklogItem():
    def __init__(self, id, name, description, priority_level):
        self.id = id
        self.name = name
        self.description = description
        self.priority_level = priority_level


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "priority_level": self.priority_level
        }
    
