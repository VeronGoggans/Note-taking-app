from fastapi import APIRouter
from src.backend.data.folder.folder_manager import FolderManager
from src.backend.presentation.request_bodies.folder.del_folder_request import DeleteFolderRequest
from src.backend.presentation.request_bodies.folder.post_folder_request import PostFolderRequest
from src.backend.presentation.request_bodies.folder.put_folder_request import PutFolderRequest
from src.backend.domain.enums.responseMessages import Status
from src.backend.application.service.folder_service import FolderService

class FolderRouter:
    def __init__(self, json_manager):
        self.route = APIRouter()
        self.folder_service = FolderService(FolderManager(), json_manager)

        self.route.add_api_route('/folders', self.folders, methods=['GET'])
        self.route.add_api_route('/folder', self.create_folder, methods=['POST'])
        self.route.add_api_route('/folder', self.update_folder, methods=['PUT'])
        self.route.add_api_route('/folder', self.delete_folder, methods=['DELETE'])

    
    def folders(self):
        response = self.folder_service.get_folders()
        return {"Status_code": Status.OK, "Folders": response}
    

    def create_folder(self, folder: PostFolderRequest):
        response = self.folder_service.add_folder(folder)

        if response != Status.INTERAL_SERVER_ERROR:
            return {'Status_code': Status.OK, "Folder": response}
        return {'Status_code': Status.INTERAL_SERVER_ERROR}
    

    def update_folder(self, folder: PutFolderRequest):
        response = self.folder_service.update_folder(folder)

        if response != Status.NOT_FOUND:
            return {'Status_code': Status.OK, "Folder": response}
        return {'Status_code': Status.NOT_FOUND}
    

    def delete_folder(self, folder: DeleteFolderRequest):
        response = self.folder_service.delete_folder(folder)

        if response != Status.NOT_FOUND:
            return {'Status_code': Status.OK, "Folder": response}
        return {'Status_code': Status.NOT_FOUND}
    
    