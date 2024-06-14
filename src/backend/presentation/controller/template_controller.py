# from fastapi import APIRouter
# from src.backend.application.template_service import TemplateService
# from src.backend.data.template.template_manager import TemplateManager
# from src.backend.domain.enums.responseMessages import Status

# class TemplateRouter:
#     def __init__(self, json_manager):
#         self.route = APIRouter()
#         self.template_service = TemplateService(TemplateManager(), json_manager)

#         self.route.add_api_route('/templates', self.get_templates, methods=['GET'])
#         self.route.add_api_route('/template', self.create_template, methods=['POST'])
#         self.route.add_api_route('/template', self.update_template, methods=['PUT'])
#         self.route.add_api_route('/template', self.delete_template, methods=['DELETE'])


#     def get_templates(self):
#         response = self.template_service.get_templates()
#         return {"Status_code": Status.OK, "Folders": response}
    

#     def create_template(self, folder: PostFolderRequest):
#         response = self.folder_service.add_folder(folder)

#         if response != Status.INTERAL_SERVER_ERROR:
#             return {'Status_code': Status.OK, "Folder": response}
#         return {'Status_code': Status.INTERAL_SERVER_ERROR}
    

#     def update_template(self, folder: PutFolderRequest):
#         response = self.folder_service.update_folder(folder)

#         if response != Status.NOT_FOUND:
#             return {'Status_code': Status.OK, "Folder": response}
#         return {'Status_code': Status.NOT_FOUND}
    

#     def delete_template(self, folder: DeleteFolderRequest):
#         response = self.folder_service.delete_folder(folder)

#         if response != Status.NOT_FOUND:
#             return {'Status_code': Status.OK, "Folder": response}
#         return {'Status_code': Status.NOT_FOUND}