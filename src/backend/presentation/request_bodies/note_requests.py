from pydantic import BaseModel

class PostNoteRequest(BaseModel):
    """
    - folder_id (int): The ID of the folder to which the note will be added to.
    - name (str): The name of the note.
    - content (str): The content of the note.
    """
    folder_id: int
    name: str
    content: str


class PutNoteRequest(BaseModel):
    """
    - note_id (int): The ID of the note that will be updated.
    - name (str): The name of the note.
    - content (str): The content of the note.
    - bookmrk (bool): A boolean indicating if the note is boomarked or not.
    """
    note_id: int
    name: str
    content: str
    bookmark: bool


class MoveNoteRequest(BaseModel):
    """
    FolderId is the id of the folder the note is moved into
    """
    folder_id: int
    note_id: int


class PostStickyNoteRequest(BaseModel):
    """
    - name (str): The name of the sticky note
    - content (str): The content of the sticky note
    """
    name: str
    content: str


class PutStickyNoteRequest(BaseModel):
    """
    - id (str): The ID of the note that will be updated.
    - name (str): The name of the sticky note
    - content (str): The content of the sticky note
    """
    id: int
    name: str
    content: str