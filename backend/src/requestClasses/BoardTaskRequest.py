from pydantic import BaseModel

class BoardTaskRequest(BaseModel):
    name: str
    description: str
    estimated_time: str
    due_date: str
    priority: bool
    board_section: str