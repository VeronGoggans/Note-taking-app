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
    parent_id: int
    linked_entity_id: int
    linked_entity_type: str
    linked_entity_name: str


