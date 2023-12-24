from fastapi import APIRouter
from backend.application.service.domain.subfolder_service import SubfolderService
from backend.data.subfolder.subfolder_manager import SubfolderManager
from backend.presentation.request_bodies.subfolder.post_subfolder_request import PostSubfolderRequest
from backend.presentation.request_bodies.subfolder.put_subfolder_request import PutSubfolderRequest
from backend.presentation.request_bodies.subfolder.del_subfolder_request import DeleteSubfolderRequest
from backend.domain.enums.responseMessages import RespMsg


class SubfolderRouter:
    def __init__(self, json_manager):
        self.route = APIRouter()
        self.subfolder_service = SubfolderService(SubfolderManager(), json_manager)

        self.route.add_api_route('/subfolders/{folder_id}', self.subfolders, methods=['GET'])
        self.route.add_api_route('/subfolder', self.create_subfolder, methods=['POST'])
        self.route.add_api_route('/subfolder', self.update_subfolder, methods=['PUT'])
        self.route.add_api_route('/subfolder', self.delete_subfolder, methods=['DELETE'])


    def subfolders(self, folder_id: str):
        response = self.subfolder_service.get_subfolders(folder_id)

        if response != RespMsg.NOT_FOUND:
            return {'Status_code': RespMsg.OK, "Subfolders": response}
        return {'Status_code': RespMsg.NOT_FOUND}


    def create_subfolder(self, subfolder: PostSubfolderRequest):
        response = self.subfolder_service.add_subfolder(subfolder)

        if response != RespMsg.NOT_FOUND:
            return {'Status_code': RespMsg.OK, "Subfolder": response}
        return {'Status_code': RespMsg.NOT_FOUND}


    def update_subfolder(self, update_request: PutSubfolderRequest):
        response = self.subfolder_service.update_subfolder(update_request)

        if response != RespMsg.NOT_FOUND:
            return {'Status_code': RespMsg.OK, "Subfolder": response}
        return {'Status_code': RespMsg.NOT_FOUND}
    
    
    def delete_subfolder(self, delete_request: DeleteSubfolderRequest):
        response = self.subfolder_service.delete_subfolder(delete_request)

        if response != RespMsg.NOT_FOUND:
            return {'Status_code': RespMsg.OK, 'Subfolder': response}
        return {'Status_code': RespMsg.NOT_FOUND}