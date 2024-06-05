from pydantic import BaseModel

class PutNoteRequest(BaseModel):
    """
    - note_id (str): The ID of the note that will be updated.
    - title (str): The title of the note.
    - content (str): The content of the note.
    - bookmrk (bool): A boolean indicating if the note is boomarked or not.
    - favorite (bool): A boolean indicating if the note is favorited or not.
    - color (str): The background color of the note.
    """
    note_id: str
    title: str
    content: str
    bookmark: bool
    favorite: bool
    color: str