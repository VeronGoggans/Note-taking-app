from pydantic import BaseModel


class FolderRequest(BaseModel):
    """
    - folder_id (str): The id of the folder that will be updated 
    - name (str): The name of the new folder.
    - color (str): The color for the new folder.
    """
    folder_id: str
    name: str
    color: str