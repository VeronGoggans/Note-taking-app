import os
from backend.src.service.fileOperations.JsonOperations import Json
from backend.src.requestClasses.ProductBacklogItemRequest import ProductBacklogItemRequest
from backend.src.service.idGenerators.idGenerator import IdGenerator
from backend.src.domains.projectDomain.productBacklogItem import ProductBacklogItem
from backend.src.service.enums.responseMessages import RespMsg


class ProductBacklogData():
    def __init__(self):
        self.projects_path = os.getcwd() + '/storage/json/projects.json'


    def add(self, project_id: int, item_data: ProductBacklogItemRequest) -> [ProductBacklogItem, RespMsg]:
        """
        Add a Product Backlog Item to a project's product backlog.

        Args:
            project_id (int): The identifier of the project to which the Product Backlog Item will be added.
            item_data (ProductBacklogItemRequest): Data containing information to create the Product Backlog Item.

        Returns:
            Union[ProductBacklogItem, RespMsg]: The added Product Backlog Item if successful, or a RespMsg indicating the outcome.
            - If successful, it returns the added Product Backlog Item.
            - If not found, it returns RespMsg.NOT_FOUND.
        """
        data = Json.load_json_file(self.projects_path)
        backlog_object: ProductBacklogItem = self.__construct_product_backlog_item_object(item_data)

        for project in data['projects']:
            if project['id'] == project_id:
                project['product_backlog'].append(backlog_object.__dict__)
                Json.update_json_file(self.projects_path, data)
                return backlog_object
        return RespMsg.NOT_FOUND


    def get(self, project_id: int)-> [dict, RespMsg]:
        """
        Retrieve the product backlog items of a project.

        Args:
            project_id (int): The identifier of the project for which to retrieve the product backlog.

        Returns:
            Union[List[ProductBacklogItem], RespMsg]: A list of ProductBacklogItem objects representing the product backlog
            if found, or a RespMsg indicating the outcome.
            - If found, it returns a list of ProductBacklogItem objects.
            - If not found, it returns RespMsg.NOT_FOUND.
        """
        data = Json.load_json_file(self.projects_path)

        for project in data['projects']:
            if project['id'] == project_id:
                return project['product_backlog']
        return RespMsg.NOT_FOUND


    def get_by_id(self, project_id: int, item_id: int) -> [ProductBacklogItem, RespMsg]:
        """
        Retrieve a specific Product Backlog Item from a project's product backlog by its unique identifier.

        Args:
            project_id (int): The identifier of the project to search for the item.
            item_id (int): The unique identifier of the Product Backlog Item to retrieve.

        Returns:
            Union[ProductBacklogItem, RespMsg]: The requested Product Backlog Item if found, or a RespMsg indicating the outcome.
            - If found, it returns the specific Product Backlog Item.
            - If not found, it returns RespMsg.NOT_FOUND.
        """
        data = Json.load_json_file(self.projects_path)

        for project in data['projects']:
            if project['id'] == project_id:
                for item in project['product_backlog']:
                    if item['id'] == item_id:
                        return item
                return RespMsg.NOT_FOUND
        return RespMsg.NOT_FOUND
            

    def update(self, project_id: int, item_id: int, item_data: ProductBacklogItemRequest):
        """
        Update a specific Product Backlog Item in a project's product backlog.

        Args:
            project_id (int): The identifier of the project to which the item belongs.
            item_id (int): The unique identifier of the Product Backlog Item to update.
            item_data (ProductBacklogItemRequest): Updated data for the Product Backlog Item.

        Returns:
            Union[ProductBacklogItem, RespMsg]: The updated Product Backlog Item if successful, or a RespMsg indicating the outcome.
            - If successful, it returns the updated Product Backlog Item.
            - If not found, it returns RespMsg.NOT_FOUND.
        """
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
        """
        Delete a specific Product Backlog Item from a project's product backlog.

        Args:
            project_id (int): The identifier of the project from which to remove the item.
            item_id (int): The unique identifier of the Product Backlog Item to delete.

        Returns:
            RespMsg: A response message indicating the outcome of the deletion.
            - If the deletion is successful, it returns RespMsg.OK.
            - If the item or project is not found, it returns RespMsg.NOT_FOUND.
        """
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
        """
        Construct a Product Backlog Item object based on the provided data.
        The ID gets generated in the method.

        Args:
            item_data (ProductBacklogItemRequest): Data containing information to create the Product Backlog Item.

        Returns:
            ProductBacklogItem: A newly constructed Product Backlog Item object with the provided data.
        """
        id = IdGenerator.ID("productBacklogItem")
        return ProductBacklogItem(id, item_data.name, item_data.description, item_data.priority)
    

    def __update_item(self, current_item: dict, new_item: ProductBacklogItemRequest):
        current_item['name'] = new_item.name
        current_item['description'] = new_item.description
        current_item['priority'] = new_item.priority
        return current_item