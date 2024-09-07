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
    - taskboard_id (str): The Id of the taskboard to update. 
    - name (str): The name of the taskboard.
    - description (str): The description of the taskboard.
    """
    id: str
    name: str
    description: str