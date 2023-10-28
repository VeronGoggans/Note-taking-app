from fastapi import APIRouter
from backend.src.requestClasses.ProductBacklogItemRequest import ProductBacklogItemRequest
from backend.src.service.dataClasses.ProductBacklogData import ProductBacklogData
from backend.src.service.enums.responseMessages import RespMsg

route = APIRouter()
product_backlog_data = ProductBacklogData()


@route.get('/productBacklogItems/{project_id}')
def product_backlog_items(project_id: int):
    response = product_backlog_data.get(project_id)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, "Objects": response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.get('/productBacklogItemById/{project_id}/{item_id}')
def product_backlog_item(project_id: int, item_id: int):
    response = product_backlog_data.get_by_id(project_id, item_id)
    if response != RespMsg.NOT_FOUND:
        return {"Status_code": RespMsg.OK, "Object": response}
    return {"Status_code": RespMsg.NOT_FOUND}


@route.post('/productBacklogItem/{project_id}')
def product_backlog_item(project_id: int, item_data: ProductBacklogItemRequest):
    response = product_backlog_data.add(project_id, item_data)
    if response != RespMsg.NOT_FOUND:
        return {"Status_code": RespMsg.OK, "Object": response}
    return {"Status_code": RespMsg.NOT_FOUND}


@route.put('/productBacklogItem/{project_id}/{item_id}')
def product_backlog_item(project_id: int, item_id: int, item_data: ProductBacklogItemRequest):
    response = product_backlog_data.update(project_id, item_id, item_data)
    if response != RespMsg.NOT_FOUND:
        return {'Status_code': RespMsg.OK, 'Object': response}
    return {'Status_code': RespMsg.NOT_FOUND}


@route.delete('/productBacklogItem/{project_id}/{item_id}')
def product_backlog_item(project_id: int, item_id: int):
    response = product_backlog_data.delete(project_id, item_id)
    return {'Status_code': response}