from pydantic import BaseModel

class PostNoteRequest(BaseModel):
    """
    - folder_id (str): The ID of the folder to which the note will be added to.
    - title (str): The title of the note.
    - content (str): The content of the note.
    """
    folder_id: str
    title: str
    content: str