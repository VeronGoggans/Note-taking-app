class BoardTask():
    def __init__(self, task_name: str, task_description: str, estimated_time: str, due_date, priority: bool, board_section: str):
        self.task_name = task_name
        self.task_description = task_description
        self.estimated_time = estimated_time
        self.due_date = due_date
        self.priority = priority
        self.board_section = board_section