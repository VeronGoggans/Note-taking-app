from fastapi import APIRouter
from src.backend.data.folder.folder_manager import FolderManager
from src.backend.presentation.request_bodies.folder.post_folder_request import PostFolderRequest
from src.backend.presentation.request_bodies.folder.put_folder_request import PutFolderRequest
from src.backend.data.exceptions.exceptions import NotFoundException, AdditionException
from src.backend.presentation.http_status import HttpStatus
from src.backend.application.folder_service import FolderService

class FolderRouter:
    def __init__(self, json_manager):
        self.route = APIRouter()
        self.folder_service = FolderService(FolderManager(), json_manager)

        self.route.add_api_route('/folder', self.add_folder, methods=['POST'])
        self.route.add_api_route('/folders', self.folders, methods=['GET'])
        self.route.add_api_route('/folder', self.update_folder, methods=['PUT'])
        self.route.add_api_route('/folder/{folder_id}', self.delete_folder, methods=['DELETE'])


    def add_folder(self, request: PostFolderRequest):
        try:
            folder = self.folder_service.add_folder(request)
            return {'status': 'succes', "folder": folder}, HttpStatus.OK
        except AdditionException as e:
            return {'status': 'error', 'message': str(e)}, HttpStatus.INTERAL_SERVER_ERROR
        

    def folders(self):
        folders = self.folder_service.get_folders()
        return {"status": 'succes', "folders": folders}, HttpStatus.OK
    

    def update_folder(self, request: PutFolderRequest):
        try:
            folder = self.folder_service.update_folder(request)
            return {'status': 'succes', "folder": folder}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NOT_FOUND
    

    def delete_folder(self, folder_id: str ):
        try:
            folder = self.folder_service.delete_folder(folder_id)
            return {'status': 'succes', "folder": folder}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NOT_FOUND