class ProductBacklogItem():
    def __init__(self, id, name, description, priority):
        self.id = id
        self.name = name
        self.description = description
        self.priority = priority


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "priority": self.priority
        }
    
