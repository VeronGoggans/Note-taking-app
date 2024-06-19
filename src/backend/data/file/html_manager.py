import os

class HTMLManager:  
    @staticmethod
    def save(html_content: str, entity_id: int):
        """
        Save HTML content to a new Text file.

        Args:
            html_content (str): The HTML content to save.
            entity_id (str): The unique identifier of the entity.

        Returns:
            str: The file path where the HTML content is saved.
        """
        BASE_URL = os.getcwd()
        entity_folder = None 
        file_name = None 

        if 'fcb' in entity_id:
            entity_folder = 'storage/flashcards'
            file_name = f'flashcard-set-{entity_id}.txt'
        elif 'n' in entity_id:
            entity_folder = 'storage/notes'
            file_name = f'note-{entity_id}.txt'
        elif 't' in entity_id:
            print('chose template path')
            entity_folder = 'storage/templates'
            file_name = f'template-{entity_id}.txt'
        
        file_path = f'{entity_folder}/{file_name}'

        try:
            with open(f'{BASE_URL}/{file_path}', 'w', encoding='utf-8') as file:
                content_bytes = html_content.encode("utf-8")
                content_str = content_bytes.decode("utf-8")
                file.write(content_str)
                print('Content has been writtin')
                return file_path
        except Exception as e:
            print(f"UnicodeEncodeError occurred: {e}")
            return None
    
    
    @staticmethod
    def get(file_path: str):
        """
        Load the content of a file at the specified path.

        Args:
            file_path (str): The path of the file to load.

        Returns:
            str: The content of the file as a string.
        """
        BASE_URL = os.getcwd()
        html_content = ''
        with open(f'{BASE_URL}/{file_path}', 'r', encoding="utf-8") as file:
            html_content = file.read()
        return html_content
    

    @staticmethod
    def update(file_path: str, updated_html_content: str):
        """
        Update the content of a file at the specified path.

        Args:
            file_path (str): The path of the file to update.
            updated_html_content (str): The updated HTML content to write to the file.

        Returns:
            None: This method does not return a value.
        """
        try:
            latest_version = HTMLManager.get(file_path)
            with open(file_path, 'w', encoding="utf-8") as file:
                content_bytes = updated_html_content.encode("utf-8")
                content_str = content_bytes.decode("utf-8")
                file.write(content_str)
        except Exception as e:
            with open(file_path, 'w', encoding="utf-8") as file:
                file.write(latest_version)

    
    @staticmethod
    def delete(file_path: str):
        """
        Delete a file at the specified path.

        Args:
            file_path (str): The path of the file to delete.

        Returns:
            Union[None, str]: None if successful, or an error message as a string if the deletion fails.
            - If successful, it returns None.
            - If an error occurs during deletion, it returns a string with details about the error.
        """
        try:
            os.remove(file_path)
        except OSError as e:
            return str(e)