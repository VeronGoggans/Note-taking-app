from fastapi import APIRouter
from src.backend.data.folder.folder_manager import FolderManager
from src.backend.presentation.request_bodies.folder_requests import FolderRequest
from src.backend.presentation.dtos.folder_dtos import FolderRequestDto
from src.backend.data.exceptions.exceptions import NotFoundException, AdditionException
from src.backend.presentation.http_status import HttpStatus
from src.backend.application.folder_service import FolderService

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
        self.route.add_api_route('/folder/{parent_id}/{folder_id}', self.delete_folder, methods=['DELETE'])
        self.route.add_api_route('/viewedFolderTime/{folder_id}', self.folder_visit, methods=['PATCH'])


    def add_folder(self, request: FolderRequest):
        try:
            request_dto = FolderRequestDto(request.folder_id, request.name, request.color)
            folder = self.service.add_folder(request_dto)
            return {'status': 'succes', "folder": folder}, HttpStatus.OK
        except AdditionException as e:
            return {'status': 'error', 'message': str(e)}, HttpStatus.INTERAL_SERVER_ERROR
        

    def get_folders(self, parent_id: str):
        try:
            folders = self.service.get_folders(parent_id)
            return {"status": 'succes', "folders": folders}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NOT_FOUND
        

    def get_recent_folders(self):
        try:
            folders = self.service.get_recent_folders()
            return {"status": 'succes', "folders": folders}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NOT_FOUND


    def get_search_items(self):
        try:
            search_items = self.service.get_search_items()
            return {'status': 'succes', 'folders': search_items}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NO_CONTENT
        

    def get_folder_by_id(self, folder_id: str):
        try:
            folder = self.service.get_folder_by_id(folder_id)
            return {'status': 'succes', 'folder': folder}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NOT_FOUND


    def update_folder(self, request: FolderRequest):
        try:
            folder = self.service.update_folder(request)
            return {'status': 'succes', "folder": folder}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NOT_FOUND
        

    def folder_visit(self, folder_id: str):
        try:
            self.service.update_visit(folder_id) 
            return {'status': 'succes'}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NOT_FOUND
        

    def delete_folder(self, parent_id: str, folder_id: str ):
        try:
            folder = self.service.delete_folder(parent_id, folder_id)
            return {'status': 'succes', "folder": folder}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NOT_FOUND