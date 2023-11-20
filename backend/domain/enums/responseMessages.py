from enum import Enum

class RespMsg(Enum):
    OK = 200
    INTERAL_SERVER_ERROR = 500
    NOT_FOUND = 404
    BAD_REQUEST = 400
    