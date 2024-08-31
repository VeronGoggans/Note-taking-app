from pydantic import BaseModel


class FolderRequest(BaseModel):
    """
    - folder_id (str): The id of the folder that will be updated 
    - name (str): The name of the new folder.
    - color (str): The color for the new folder.
    """
    folder_id: str
    name: str


class MoveFolderRequest(BaseModel):
    """
    - new_parent_folder_id (str): The id of the folder that the dropped folder will move in to. 
    - folder_id (str): The id of the folder that will be updated 
    """
    new_parent_folder_id: str
    folder_id: str