from enum import Enum

class RespMsg(Enum):
    OK = 200
    INTERAL_SERVER_ERROR = 500
    NOT_FOUND = 404
    SOMETHING_WENT_WRONG = 'Something went wrong during the creation process'
    NOTE_404 = 'Note does not exist'
    CATEGORY_404 = 'Category does not exist'
    SUBCATEGORY_404 = 'Subcategory does not exist'
    PROJECT_404 = 'Project does not exist'
    INVALID_PASSWORD = 'Invalid password'
    