from enum import Enum

class RespMsg(Enum):
    OK = 200
    INTERAL_SERVER_ERROR = 500
    NOT_FOUND = 404
    SOMETHING_WENT_WRONG = 'Something went wrong during the creation process'
    INVALID_PASSWORD = 'Invalid password'
    