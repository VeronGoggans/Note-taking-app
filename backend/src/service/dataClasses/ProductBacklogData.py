import os
from backend.src.service.fileOperations.JsonOperations import Json
from backend.src.requestClasses.ProductBacklogItemRequest import ProductBacklogItemRequest
from backend.src.service.idGenerators.idGenerator import IdGenerator
from backend.src.domains.projectDomain.productBacklogItem import ProductBacklogItem
from backend.src.service.enums.responseMessages import RespMsg


class ProductBacklogData():
    def __init__(self):
        self.projects_path = os.getcwd() + '/storage/json/projects.json'

    def add(self, project_id: int, item_data: ProductBacklogItemRequest) -> [{str: RespMsg, str: ProductBacklogItem}, RespMsg]:
        data = Json.load_json_file(self.projects_path)
        backlog_object: ProductBacklogItem = self.__construct_product_backlog_item_object(item_data)

        for project in data['projects']:
            if project['id'] == project_id:
                project['product_backlog'].append(backlog_object.__dict__)
                Json.update_json_file(self.projects_path, data)
                return {"Status_code": RespMsg.OK, "Object": backlog_object}
        return RespMsg.NOT_FOUND


    def get(self, project_id: int)-> [dict, RespMsg]:
        data = Json.load_json_file(self.projects_path)

        for project in data['projects']:
            if project['id'] == project_id:
                return project['product_backlog']
        return RespMsg.NOT_FOUND


    def get_by_id(self, project_id: int, item_id: int) -> [ProductBacklogItem, RespMsg]:
        data = Json.load_json_file(self.projects_path)

        for project in data['projects']:
            if project['id'] == project_id:
                for item in project['product_backlog']:
                    if item['id'] == item_id:
                        return item
                return RespMsg.NOT_FOUND
        return RespMsg.NOT_FOUND
            

    def update(self, project_id: int, item_id: int, item_data: ProductBacklogItemRequest):
        data = Json.load_json_file(self.projects_path)

        for project in data['projects']:
            if project['id'] == project_id:
                for item in project['product_backlog']:
                    if item['id'] == item_id:
                        updated_item = self.__update_item(item, item_data)
                        Json.update_json_file(self.projects_path, data)
                        return updated_item
                return RespMsg.NOT_FOUND
        return RespMsg.NOT_FOUND

        

    def delete(self, project_id: int, item_id: int) -> RespMsg:
        data = Json.load_json_file(self.projects_path)

        for project in data['projects']:
            if project['id'] == project_id:
                for item in project['product_backlog']:
                    if item['id'] == item_id:
                        project['product_backlog'].remove(item)
                        Json.update_json_file(self.projects_path, data)
                        return RespMsg.OK
                return RespMsg.NOT_FOUND
        return RespMsg.NOT_FOUND
        

    def __construct_product_backlog_item_object(self, item_data: ProductBacklogItemRequest):
        id = IdGenerator.ID("productBacklogItem")
        return ProductBacklogItem(id, item_data.name, item_data.description, item_data.priority)
    

    def __update_item(self, current_item: dict, new_item: ProductBacklogItemRequest):
        current_item['name'] = new_item.name
        current_item['description'] = new_item.description
        current_item['priority'] = new_item.priority
        return current_item