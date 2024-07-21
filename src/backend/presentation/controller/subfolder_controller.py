from fastapi import APIRouter
from src.backend.application.subfolder_service import SubfolderService
from src.backend.data.subfolder.subfolder_manager import SubfolderManager
from src.backend.presentation.request_bodies.subfolder.post_subfolder_request import PostSubfolderRequest
from src.backend.presentation.request_bodies.subfolder.put_subfolder_request import PutSubfolderRequest
from src.backend.presentation.request_bodies.subfolder.del_subfolder_request import DeleteSubfolderRequest
from src.backend.presentation.http_status import HttpStatus
from src.backend.data.exceptions.exceptions import AdditionException, NotFoundException


class SubfolderRouter:
    def __init__(self, json_manager):
        self.route = APIRouter()
        self.service = SubfolderService(SubfolderManager(), json_manager)

        self.route.add_api_route('/subfolders/{folder_id}', self.subfolders, methods=['GET'])
        self.route.add_api_route('/subfolder', self.add_subfolder, methods=['POST'])
        self.route.add_api_route('/subfolder', self.update_subfolder, methods=['PUT'])
        self.route.add_api_route('/subfolder', self.delete_subfolder, methods=['DELETE'])


    def subfolders(self, folder_id: str):
        try:
            subfolder = self.service.get_subfolders(folder_id)
            return {'status': 'succes', 'Folder': subfolder}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', "message": str(e)}, HttpStatus.NOT_FOUND
    

    def add_subfolder(self, subfolder: PostSubfolderRequest):
        try:
            subfolder = self.service.add_subfolder(subfolder)
            return {'status': HttpStatus.OK, "folder": subfolder}, HttpStatus.OK
        except AdditionException as e:
            return {'status': 'error', 'message': str(e)}, HttpStatus.INTERAL_SERVER_ERROR
        except NotFoundException as e:
            return {'status': 'not_found', "message": str(e)}, HttpStatus.NOT_FOUND
    

    def update_subfolder(self, update_request: PutSubfolderRequest):
        try:
            subfolder = self.service.update_subfolder(update_request)
            return {'status': 'succes', 'Folder': subfolder}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', "message": str(e)}, HttpStatus.NOT_FOUND
    

    def delete_subfolder(self, delete_request: DeleteSubfolderRequest):
        try:
            subfolder = self.service.delete_subfolder(delete_request)
            return {'status': 'succes', 'Folder': subfolder}, HttpStatus.OK
        except NotFoundException as e:
            return {'status': 'not_found', "message": str(e)}, HttpStatus.NOT_FOUND