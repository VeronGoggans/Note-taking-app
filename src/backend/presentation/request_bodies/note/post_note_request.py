from pydantic import BaseModel

class PostNoteRequest(BaseModel):
    """
    - folder_id (str): The ID of the folder to which the note will be added to.
    - name (str): The name of the note.
    - content (str): The content of the note.
    """
    folder_id: str
    name: str
    content: str