from src.backend.data.managers.folder_manager import FolderManager
from src.backend.presentation.request_bodies.folder_requests import *
from src.backend.data.exceptions.exceptions import *
from src.backend.domain.folder import Folder
from src.backend.application.decorators.exceptions import check_for_null 



class FolderService:
    def __init__(self, manager: FolderManager):
        self.manager = manager


    def add_folder(self, request: FolderRequest) -> Folder:
        parent_id = request.folder_id
        folder = Folder(1, request.name)

        try:
            return self.manager.add_folder(parent_id, folder)
        except AdditionException as e:
            raise e


    @check_for_null
    def get_folders(self, parent_id: str) -> list[object]:
        return self.manager.get_folders(parent_id)
    

    @check_for_null
    def get_recent_folders(self) -> list[object]:
        recent_folders = self.manager.get_recent_folders()
        return recent_folders
    

    def get_search_items(self) -> list[object]:
        search_items = self.manager.get_search_items() 

        if len(search_items) > 0:
            return search_items
        raise NotFoundException('There are no folders to be retrieved.')
    

    @check_for_null
    def get_folder_by_id(self, folder_id: str) -> list[object]:
        return self.manager.get_by_id(folder_id)
        


    @check_for_null
    def update_folder(self, request: PutFolderRequest) -> object:
        return self.manager.update_folder(request.folder_id, request.name, request.color)
        
        
    
    @check_for_null
    def update_visit(self, folder_id: str) -> None:
        self.manager.update_visit_date(folder_id)
        

    @check_for_null
    def move_folder(self, request: MoveFolderRequest) -> Folder:
        try:
            folder = self.manager.delete_folder(request.folder_id)
            folder_object_to_move = Folder.from_json(folder)

            folder_with_new_parent = self.manager.add_folder(request.new_parent_folder_id, folder_object_to_move)
            return folder_with_new_parent
        except AdditionException as e:
            raise e
    

    @check_for_null
    def delete_folder(self, folder_id: str) -> Folder:
        return self.manager.delete_folder(folder_id)