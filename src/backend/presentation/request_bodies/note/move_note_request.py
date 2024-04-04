from pydantic import BaseModel

class MoveNoteRequest(BaseModel):
    """
    FolderId is the id of the folder the note is moved into
    """
    folder_id: str
    note_id: str