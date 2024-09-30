from pydantic import BaseModel

class PostTaskboardRequest(BaseModel):
    """
    - name (str): The name of the taskboard.
    - description (str): The description of the taskboard.
    """
    name: str
    description: str


class PutTaskboardRequest(BaseModel):
    """
    - id (int): The id of the taskboard to update. 
    - name (str): The name of the taskboard.
    - description (str): The description of the taskboard.
    """
    id: int
    name: str
    description: str


class PostTaskRequest(BaseModel):
    """
    - parent_id (int): The id of the taskboard to add the task to. 
    - name (str): The name of the task.
    - description (str): The description of the task.
    - due_date (str): The date where the task needs to be completed.
    """
    parent_id: int
    name: str
    description: str
    due_date: str
    tag: str


class PutTaskRequest(BaseModel):
    """
    - id (int): The id of the task to update. 
    - name (str): The name of the task.
    - description (str): The description of the task.
    - due_date (str): The date where the task needs to be completed.
    - section (str): The board section the task is on.
    """
    id: int
    name: str
    description: str
    due_date: str
    section: str
    tag: str