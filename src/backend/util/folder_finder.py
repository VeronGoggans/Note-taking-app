class FolderFinder:
    @staticmethod
    def find_folder_by_id(folders, folder_id: str):
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
            if folder.get("id") == folder_id:
                return folder
            
            subfolder = FolderFinder.find_folder_by_id(folder["subfolders"], folder_id)
            if subfolder:
                return subfolder
        return None
