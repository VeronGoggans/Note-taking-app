from pydantic import BaseModel

class PostNotebookRequest(BaseModel):
    """
    - name (str): The name of the notebook.
    - description (str): The content of the notebook.
    """
    name: str
    description: str


class PutNotebookRequest(BaseModel):
    """
    - id (int): The id of the notebook.
    - name (str): The name of the notebook.
    - description (str): The content of the notebook.
    """
    id: int
    name: str
    description: str


class PostNotebookItemRequest(BaseModel):
    pass


