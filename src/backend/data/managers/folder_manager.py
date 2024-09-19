from src.backend.domain.folder import Folder
from src.backend.util.folder_finder import FolderFinder
from src.backend.data.exceptions.exceptions import NotFoundException, AdditionException
from src.backend.util.calendar import Calendar

class FolderManager:
    def __init__(self):
        self.folder_list = []
        self.search_items = []
        

    def add_folder(self, parent_id: str, folder: Folder) -> (Folder | NotFoundException | AdditionException):
        pass


    def get_folders(self, parent_id: str) -> (list[object] | NotFoundException):
        pass
        

    def get_recent_folders(self) -> list:
        pass
    

    def get_search_items(self) -> list:
        pass


    def get_by_id(self, folders: list, folder_id: str) -> (dict | NotFoundException):
        folder_location = FolderFinder.find_folder_location(folders, folder_id)
        if folder_location:
            return folder_location
        raise NotFoundException(f'Folder with id: {folder_id}, could not be found')
    
    
    def update_folder(self, folder_id: str, folder_name: str, folder_color: str) -> (dict | NotFoundException):
       pass
    

    def update_visit_date(self, folder_id: str) -> (None | NotFoundException):
        pass # use calendar precise
        
    
    def delete_folder(self, folder_id: str) -> (dict | NotFoundException):
        pass
        
    
    def __get_top_4_most_recent_folders(self) -> list:
        # Sort the Folder objects based on last_visit in descending order
        self.folder_list.sort(key=lambda folder: folder['last_visit'], reverse=True)

        # Get the 5 most recently viewed folders
        most_recent_folders = self.folder_list[:4]

        # Remove the notes and subfolders fields from each folder
        simplified_folders = [{'id': folder['id'], 'name': folder['name'], 'color': folder['color'], 'last_visit': folder['last_visit']} for folder in most_recent_folders]

        return simplified_folders