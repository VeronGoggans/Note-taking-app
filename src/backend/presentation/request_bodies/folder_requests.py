from pydantic import BaseModel


class FolderRequest(BaseModel):
    """
    - parent_id (str): The id of the parent folder 
    - name (str): The name of the new folder.
    """
    parent_id: int
    name: str


class PutFolderRequest(BaseModel): 
    """
    - folder_id (str): The id of the folder that will be updated 
    - name (str): The name of the new folder.
    - color (str): The color for the new folder.
    """
    folder_id: int
    name: str
    color: str


class MoveFolderRequest(BaseModel):
    """
    - parent_id (str): The id of the folder that the dropped folder will move in to. 
    - folder_id (str): The id of the folder that will be updated 
    """
    parent_id: int
    folder_id: int