from pydantic import BaseModel

class PostFocusSessionRequest(BaseModel):
    """
    - name (str): The name of the focus session.
    - work_time (int): The amount of focus time.
    - rest_time (int): The amount of rest time.
    - iterations (int): The amount of times the cycle should be repeated.
    """
    name: str
    work_time: int
    rest_time: int
    iterations: int


class PutFocusSessionRequest(BaseModel):
    """
    - id (int): The id of the focus session.  
    - name (str): The name of the focus session.
    - work_time (int): The amount of focus time.
    - rest_time (int): The amount of rest time.
    - iterations (int): The amount of times the cycle should be repeated.
    """
    id: int
    name: str
    work_time: int
    rest_time: int
    iterations: int
    