class BoardTask():
    def __init__(self, id:int, name: str, description: str, estimated_time: str, due_date: str, priority: bool, board_section: str):
        self.id = id
        self.name = name
        self.description = description
        self.estimated_time = estimated_time
        self.due_date = due_date
        self.priority = priority
        self.board_section = board_section 