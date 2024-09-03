from fastapi import APIRouter
from src.backend.data.folder.folder_manager import FolderManager
from src.backend.presentation.request_bodies.folder_requests import FolderRequest, MoveFolderRequest, PutFolderRequest
from src.backend.presentation.dtos.folder_dtos import FolderRequestDto, PutFolderRequestDto
from src.backend.presentation.http_status import HttpStatus
from src.backend.application.folder_service import FolderService
from src.backend.presentation.decorators.controller_decorators import exception_handler 

class FolderRouter:
    def __init__(self, json_manager):
        self.route = APIRouter()
        self.service = FolderService(FolderManager(), json_manager)

        self.route.add_api_route('/folder', self.add_folder, methods=['POST'])
        self.route.add_api_route('/folders/{parent_id}', self.get_folders, methods=['GET'])
        self.route.add_api_route('/recentFolders', self.get_recent_folders, methods=['GET'])
        self.route.add_api_route('/folderSearchItems', self.get_search_items, methods=['GET'])
        self.route.add_api_route('/folderById/{folder_id}', self.get_folder_by_id, methods=['GET'])
        self.route.add_api_route('/folder', self.update_folder, methods=['PUT'])
        self.route.add_api_route('/moveFolder', self.move_folder, methods=['PUT'])
        self.route.add_api_route('/folder/{folder_id}', self.delete_folder, methods=['DELETE'])
        self.route.add_api_route('/viewedFolderTime/{folder_id}', self.folder_visit, methods=['PATCH'])


    @exception_handler
    def add_folder(self, request: FolderRequest):
        folder = self.service.add_folder(
            FolderRequestDto(request.folder_id, request.name)
        )
        return {'status': HttpStatus.OK, "folder": folder}
        

    @exception_handler
    def get_folders(self, parent_id: str):
        folders = self.service.get_folders(parent_id)
        return {"status": HttpStatus.OK, "folders": folders}

        
    @exception_handler
    def get_recent_folders(self):
        folders = self.service.get_recent_folders()
        return {"status": HttpStatus.OK, "folders": folders}
        

    @exception_handler
    def get_search_items(self):
        search_items = self.service.get_search_items()
        return {'status': HttpStatus.OK, 'folders': search_items}
        

    @exception_handler
    def get_folder_by_id(self, folder_id: str):
        folder_location = self.service.get_folder_by_id(folder_id)
        return {'status': HttpStatus.OK, 'folder': folder_location[-1], 'location': folder_location}


    @exception_handler
    def update_folder(self, request: PutFolderRequest):
        folder = self.service.update_folder(
            PutFolderRequestDto(request.folder_id, request.name, request.color)
        )
        return {'status': HttpStatus.OK, "folder": folder}
    

    @exception_handler
    def move_folder(self, request: MoveFolderRequest):
        folder = self.service.move_folder(request.new_parent_folder_id, request.folder_id)
        return {'status': HttpStatus.OK, "folder": folder}
        

    @exception_handler
    def folder_visit(self, folder_id: str):
        self.service.update_visit(folder_id) 
        return {'status': HttpStatus.OK}
       
        
    @exception_handler
    def delete_folder(self, folder_id: str ):
        folder = self.service.delete_folder(folder_id)
        return {'status': HttpStatus.OK, "folder": folder}