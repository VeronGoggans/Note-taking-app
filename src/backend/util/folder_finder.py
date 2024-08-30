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
    

    @staticmethod
    def delete_folder_by_id(folders, folder_id, parent = None):
        for folder in folders:
            if folder.get("id") == folder_id and parent is not None:
                parent['subfolders'].remove(folder)
                return folder
            if folder.get("id") == folder_id and parent is None:
                folders.remove(folder)
                return folder

            
            subfolder = FolderFinder.delete_folder_by_id(folder["subfolders"], folder_id, folder)
            if subfolder:
                return subfolder
        return None


    @staticmethod
    def find_folder_location(folders: list, folder_id: str):
        """
        Given a folder_id, this function returns a list of dictionaries 
        containing the ids and names of its parent folders.

        :param folders: List of dictionaries representing the folder structure.
        :param folder_id: The folder ID to search for.
        :return: List of dictionaries with 'id' and 'name' of parent folders.
        """

        def traverse_folders(folders, target_id, path):
            for folder in folders:
                # Create a copy of the current path and add the current folder's id and name
                current_path = path.copy()
                current_path.append({'id': folder["id"], 'name': folder["name"]})

                if folder["id"] == target_id:
                    # If the target folder is found, return the current path
                    return current_path
                
                # Check in subfolders recursively
                subfolders = folder.get("subfolders", [])
                if subfolders:
                    result = traverse_folders(subfolders, target_id, current_path)
                    if result:
                        return result
            
            # Return None if the target_id is not found in this branch
            return None

        # Start traversal from the root level
        return traverse_folders(folders, folder_id, [{'id': 'f-1', 'name': 'Home'}])


    @staticmethod
    def find_note_location(folders: list, note_id: str):
        """
        Given a note_id, this function returns a list of dictionaries 
        containing the ids and names of its parent folders up to the note's folder.

        :param folders: List of dictionaries representing the folder structure.
        :param note_id: The note ID to search for.
        :return: List of dictionaries with 'id' and 'name' of parent folders leading to the note's folder.
        """

        def traverse_folders_for_note(folders, note_id, path):
            for folder in folders:
                # Create a copy of the current path and add the current folder's id and name
                current_path = path.copy()
                current_path.append({'id': folder["id"], 'name': folder["name"]})

                # Check if the note is directly within this folder
                notes = folder.get("notes", [])
                for note in notes:
                    if note["id"] == note_id:
                        # If the target note is found, return the path and found note
                        return current_path, note
                
                # Check in subfolders recursively
                subfolders = folder.get("subfolders", [])
                if subfolders:
                    result = traverse_folders_for_note(subfolders, note_id, current_path)
                    if result:
                        return result
            
            # Return None if the note_id is not found in this branch
            return None, None

        # Start traversal from the root level
        return traverse_folders_for_note(folders, note_id, [{'id': 'f-1', 'name': 'Home'}])