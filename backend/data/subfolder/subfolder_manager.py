from backend.domain.subfolder import Subfolder
import os

class SubfolderManager:
    def __init__(self):
        self.notes_relative_path = os.getcwd() + '/storage/json/notes.json'
        self.DELETED = 'DELETED'


    def get_subfolders(self, folders, folder_id: str):
        """
        Retrieve a list of subfolder names belonging to a specific folder.

        Args:
            folders (List[dict]): The list of folders to search within.
            folder_id (str): The unique identifier of the parent folder.

        Returns:
            dict or None:
            - If successful, it returns a list of subfolders names.
            - If the parent folder is not found, it returns None.
        """
        target_folder = self.__find_folder_by_id(folders, folder_id)
    
        if target_folder:
            subfolders = target_folder.get("subfolders", [])
            subfolder_info = [{"id": subfolder["id"], "name": subfolder["name"]} for subfolder in subfolders]
            return subfolder_info
        return None


    def add_subfolder(self, folders, folder_id: str, subfolder: Subfolder):
        """
        Add a new subfolder to an existing folder in the notes structure.

        Args:
            folders (List[dict]): The list of folders to search within.
            folder_id (str): The unique identifier of the parent folder.
            subfolder (Subfolder): Data containing information to create the new subdirectory.

        Returns:
            dict or None:
            - If successful, it returns the subfolder.
            - If the parent folder is not found, it returns None.
        """
        parent_folder = self.__find_folder_by_id(folders, folder_id)
        if parent_folder:
            parent_folder['subfolders'].append(subfolder.__dict__)
            return subfolder
        return None


    def update_subfolder(self, folders, subfolder_id: str, new_subfolder_name: str):
        """
        Update the name of a subfolder in the notes structure.

        Args:
            folders (List[dict]): The list of folders to search within.
            subfolder_id (str): The unique identifier of the subfolder to update.
            new_name (str): The new name for the subfolder.

        Returns:
            dict or None:
            - If successful, it returns this object {'name': 'some_name'} .
            - If the subfolder is not found, it returns None.
        """
        subfolder = self.__find_folder_by_id(folders, subfolder_id)
        if subfolder:
            subfolder['name'] = new_subfolder_name
            return {'name': new_subfolder_name, 'id': subfolder_id}
        return None


    def delete_subfolder(self, folders, parent_id: str, folder_id: str):
        """
        Delete a folder from the notes structure.

        Args:
            folders (List[dict]): The list of folders to search within.
            parent_id (str): The unique identifier of subfolders parent folder. 
            folder_id (str): The unique identifier of the folder to delete.

        Returns:
            str or None:
            - If successful, it returns the string 'DELETED'.
            - If the folder is not found, it returns None.
        """
        parent_folder = self.__find_folder_by_id(folders, parent_id)
        if parent_folder:
            for subfolder in parent_folder['subfolders']:
                if subfolder.get('id') == folder_id:
                    parent_folder['subfolders'].remove(subfolder)
                    return subfolder
            return None
        return None 
    

    def __find_folder_by_id(self, folders, target_id: str):
        """
        Recursively searches for a folder within the nested folder structure by its ID.

        Args:
            folders (List[dict]): The list of folders to search within.
            target_id (str): The ID of the folder to find.

        Returns:
            dict or None: 
            - If a folder with the specified ID is found, returns the corresponding dictionary.
            - If not found, returns None.
        """
        for folder in folders:
            if folder.get("id") == target_id:
                return folder
            
            subfolder = self.__find_folder_by_id(folder["subfolders"], target_id)
            if subfolder:
                return subfolder
        return None