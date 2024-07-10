from pydantic import BaseModel

class PutNoteRequest(BaseModel):
    """
    - note_id (str): The ID of the note that will be updated.
    - name (str): The name of the note.
    - content (str): The content of the note.
    - bookmrk (bool): A boolean indicating if the note is boomarked or not.
    - favorite (bool): A boolean indicating if the note is favorited or not.
    """
    note_id: str
    name: str
    content: str
    bookmark: bool
    favorite: bool
