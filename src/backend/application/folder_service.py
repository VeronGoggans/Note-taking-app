from src.backend.data.folder.folder_manager import FolderManager
from src.backend.presentation.request_bodies.folder.post_folder_request import PostFolderRequest
from src.backend.presentation.request_bodies.folder.put_folder_request import PutFolderRequest
from src.backend.data.exceptions.exceptions import NotFoundException, AdditionException
from src.backend.domain.folder import Folder
from src.backend.data.file.json_manager import JsonManager
from os import getcwd


class FolderService:
    def __init__(self, manager: FolderManager, json_manager: JsonManager):
        self.manager = manager
        self.json_manager = json_manager
        self.folders_path = getcwd() + '/storage/json/notes.json'
        self.id_path = getcwd() + '/storage/json/id.json'


    def add_folder(self, parent_id: str, post_request: PostFolderRequest):
        folders = self.json_manager.load(self.folders_path)
        id = self.__generate_id(parent_id)
        folder = Folder(id, post_request.name, post_request.color)

        try:
            new_folder = self.manager.add_folder(folders, parent_id, folder)
            self.json_manager.update(self.folders_path, folders)
            return new_folder
        except AdditionException as e:
            raise e


    def get_folders(self, parent_id: str):
        json_folders = self.json_manager.load(self.folders_path)
        return self.manager.get_folders(json_folders, parent_id)
    

    def get_recent_folders(self):
        json_folders = self.json_manager.load(self.folders_path)
        recent_folders = self.manager.get_recent_folders(json_folders)
        self.manager.clear_folder_list()
        return recent_folders
    

    def get_search_items(self) -> list:
        json_folders = self.json_manager.load(self.folders_path)
        search_items = self.manager.get_search_items(json_folders) 

        if len(search_items) > 0:
            self.manager.clear_search_list()
            return search_items
        raise NotFoundException('There are no folders to be retrieved.')
    

    def get_folder_by_id(self, folder_id: str):
        json_folders = self.json_manager.load(self.folders_path)
        try:
            return self.manager.get_by_id(json_folders, folder_id)
        except NotFoundException as e:
            raise e


    def update_folder(self, put_request: PutFolderRequest):
        folders = self.json_manager.load(self.folders_path)
        try:
            folder = self.manager.update_folder(folders, put_request.folder_id, put_request.name, put_request.color)
            self.json_manager.update(self.folders_path, folders)
            return folder
        except NotFoundException as e:
            raise e
        
    
    def update_visit(self, folder_id: str):
        folders = self.json_manager.load(self.folders_path)
        try:
            self.manager.update_visit_date(folders, folder_id)
            self.json_manager.update(self.folders_path, folders)
        except NotFoundException as e:
            raise e
    

    def delete_folder(self, parent_id: str, folder_id: str):
        folders = self.json_manager.load(self.folders_path)
        try:
            folder = self.manager.delete_folder(folders, parent_id, folder_id)
            self.json_manager.update(self.folders_path, folders)
            return folder
        except NotFoundException as e:
            raise e
        
    
    def __generate_id(self, parent_id: str) -> str:
        if parent_id == 'f-1':
            return self.json_manager.generate_id(self.id_path, 'folder')
        return self.json_manager.generate_id(self.id_path, 'subfolder')