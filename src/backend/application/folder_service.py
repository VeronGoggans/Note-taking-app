from src.backend.data.folder.folder_manager import FolderManager
from src.backend.presentation.dtos.folder_dtos import FolderRequestDto, PutFolderRequestDto
from src.backend.data.exceptions.exceptions import NotFoundException, AdditionException, InvalidMoveRequestException
from src.backend.domain.folder import Folder
from src.backend.data.file.json_manager import JsonManager
from src.backend.util.paths import FOLDERS_PATH, FOR_FOLDER


class FolderService:
    def __init__(self, manager: FolderManager, json_manager: JsonManager):
        self.manager = manager
        self.json_manager = json_manager


    def add_folder(self, request_dto: FolderRequestDto) -> Folder:
        folders = self.json_manager.load(FOLDERS_PATH)
        parent_id = request_dto.folder_id
        id = self.__generate_id(parent_id)
        folder = Folder(id, request_dto.name)

        try:
            new_folder = self.manager.add_folder(folders, parent_id, folder)
            self.json_manager.update(FOLDERS_PATH, folders)
            return new_folder
        except AdditionException as e:
            raise e


    def get_folders(self, parent_id: str) -> list[object]:
        json_folders = self.json_manager.load(FOLDERS_PATH)
        return self.manager.get_folders(json_folders, parent_id)
    

    def get_recent_folders(self) -> list[object]:
        json_folders = self.json_manager.load(FOLDERS_PATH)
        recent_folders = self.manager.get_recent_folders(json_folders)
        self.manager.clear_folder_list()
        return recent_folders
    

    def get_search_items(self) -> list[object]:
        json_folders = self.json_manager.load(FOLDERS_PATH)
        search_items = self.manager.get_search_items(json_folders) 

        if len(search_items) > 0:
            self.manager.clear_search_list()
            return search_items
        raise NotFoundException('There are no folders to be retrieved.')
    

    def get_folder_by_id(self, folder_id: str) -> list[object]:
        json_folders = self.json_manager.load(FOLDERS_PATH)
        try:
            return self.manager.get_by_id(json_folders, folder_id)
        except NotFoundException as e:
            raise e


    def update_folder(self, request_dto: PutFolderRequestDto) -> object:
        folders = self.json_manager.load(FOLDERS_PATH)
        try:
            folder = self.manager.update_folder(folders, request_dto.folder_id, request_dto.name, request_dto.color)
            self.json_manager.update(FOLDERS_PATH, folders)
            return folder
        except NotFoundException as e:
            raise e
        
    
    def update_visit(self, folder_id: str) -> None:
        folders = self.json_manager.load(FOLDERS_PATH)
        try:
            self.manager.update_visit_date(folders, folder_id)
            self.json_manager.update(FOLDERS_PATH, folders)
        except NotFoundException as e:
            raise e
        

    def move_folder(self, new_parent_folder_id: str, folder_id: str) -> Folder:
        folders = self.json_manager.load(FOLDERS_PATH)
        try:
            folder = self.manager.delete_folder(folders, folder_id)
            folder_object_to_move = Folder.from_json(folder)

            folder_with_new_parent = self.manager.add_folder(folders, new_parent_folder_id, folder_object_to_move)
            self.json_manager.update(FOLDERS_PATH, folders)
            return folder_with_new_parent
        except (NotFoundException | AdditionException) as e:
            raise e
    

    def delete_folder(self, folder_id: str) -> Folder:
        folders = self.json_manager.load(FOLDERS_PATH)
        try:
            folder = self.manager.delete_folder(folders, folder_id)
            self.json_manager.update(FOLDERS_PATH, folders)
            return folder
        except NotFoundException as e:
            raise e
        
    
    def __generate_id(self, parent_id: str) -> str:
        if parent_id == 'f-1':
            return self.json_manager.generate_id(FOR_FOLDER)
        return self.json_manager.generate_id('subfolder')