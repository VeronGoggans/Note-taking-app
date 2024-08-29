from src.backend.domain.folder import Folder
from src.backend.util.folder_finder import FolderFinder
from src.backend.data.exceptions.exceptions import NotFoundException, AdditionException
from src.backend.util.calendar import Calendar

class FolderManager:
    def __init__(self):
        self.folder_list = []
        self.search_items = []
        

    def add_folder(self, folders, parent_id: str, folder: Folder) -> (Folder | NotFoundException | AdditionException):
        """
        Add a new folder to the notes structure.

        Args:
            folders (List[dict]): The list of folders to search within.
            folder (Folder): a folder object that will be added to the notes structure.

        Returns:
           Folder:
            - If successful, it returns the folder.
        """
        try:
            if parent_id == 'f-1':
                folders.append(folder.__dict__)
                return folder
            
            parent_folder = FolderFinder.find_folder_by_id(folders, parent_id)
            if parent_folder:
                parent_folder['subfolders'].append(folder.__dict__)
                return folder
            raise NotFoundException(f'Folder with id: {parent_id}, could not be found')
        except Exception as e: 
            raise AdditionException('An error occurred while adding the folder', errors={'exception': str(e)})


    def get_folders(self, folders: list, parent_id: str) -> (list[object] | NotFoundException):
        """
        Retrieve a list of information (id, name, color) about the folders.

        Args:
            folders (List[dict]): The list of folders to search within.
        
        Returns:
            list[dict]:
            - Each dictionary includes 'id', 'name' and 'color' keys representing the Folder.
        """
        folder_list = []
        if parent_id == 'f-1':
            for folder in folders:
                if folder['id'] != 'f-1':
                    folder_list.append({
                        'id': folder['id'], 
                        'name': folder['name'],
                        'color': folder['color']
                        })
            return folder_list
        else:
            target_folder = FolderFinder.find_folder_by_id(folders, parent_id)
            if target_folder:
                subfolders = target_folder.get('subfolders', [])
                subfolder_list = [{'id': subfolder['id'], 'name': subfolder['name'], 'color': subfolder['color']} for subfolder in subfolders]
                return subfolder_list
            raise NotFoundException(f'Subfolder with id: {parent_id}, could not be found')
        

    def get_recent_folders(self, folders: list) -> list:
        for folder in folders:
            self.folder_list.append(folder)
            self.get_recent_folders(folder['subfolders'])
        return self.__get_top_4_most_recent_folders()
    

    def get_search_items(self, folders: list) -> list:
        for folder in folders:
            self.search_items.append({'id': folder['id'],'name': folder['name']})
            self.get_search_items(folder['subfolders'])
        return self.search_items  


    def get_by_id(self, folders: list, folder_id: str) -> (dict | NotFoundException):
        folder = FolderFinder.find_folder_by_id(folders, folder_id)
        if folder:
            return {'id': folder['id'], 'name': folder['name']}
        raise NotFoundException(f'Folder with id: {folder_id}, could not be found')
    
    
    def update_folder(self, folders, folder_id: str, folder_name: str, folder_color: str) -> (dict | NotFoundException):
        """
        Update the name and or color of a folder.

        Args:
            folders (List[dict]): The list of folders to search within.
            folder_id (str): The unique identifier of the folder to update.
            folder_name (str): The new name for the folder.
            folder_color (str): The new color for the folder.

        Returns:
            dict:
            - If successful, it returns the folder.
        """   
        target_folder = FolderFinder.find_folder_by_id(folders, folder_id)   
        if target_folder:
            target_folder['name'] = folder_name
            target_folder['color'] = folder_color
            return {'name': folder_name, 'id': folder_id, 'color': folder_color}
        raise NotFoundException(f'Folder with id: {folder_id}, could not be found')
    

    def update_visit_date(self, folders: list, folder_id: str) -> (None | NotFoundException):
        folder = FolderFinder.find_folder_by_id(folders, folder_id)
        if folder is not None:
            folder['last_visit'] = Calendar.datetime(precise=True)
            return
        raise NotFoundException(f'Folder with id: {folder_id}, could not be found')
        
    
    def delete_folder(self, folders, folder_id: str) -> (dict | NotFoundException):
        """
        Delete a folder from the notes structure.

        Args:
            folders (List[dict]): The list of folders to search within.
            folder_id (str): The unique identifier of the folder to delete.

        Returns:
            dict or None:
            - If successful, it returns the folder.
            - If the folder is not found, it returns None.
        """
        folder_to_remove = FolderFinder.delete_folder_by_id(folders, folder_id)
        if folder_to_remove:
            return folder_to_remove
        raise NotFoundException(f'Folder with the specified ID {folder_id}, does not exist')
        
    
    def __get_top_4_most_recent_folders(self) -> list:
        # Sort the Folder objects based on last_visit in descending order
        self.folder_list.sort(key=lambda folder: folder['last_visit'], reverse=True)

        # Get the 5 most recently viewed folders
        most_recent_folders = self.folder_list[:4]

        # Remove the notes and subfolders fields from each folder
        simplified_folders = [{'id': folder['id'], 'name': folder['name'], 'color': folder['color'], 'last_visit': folder['last_visit']} for folder in most_recent_folders]

        return simplified_folders
        

    def clear_folder_list(self):
        self.folder_list = []

    def clear_search_list(self):
        self. search_items = []