from enum import Enum

class HttpStatus(Enum):
    OK = 200
    NO_CONTENT = 204
    INTERAL_SERVER_ERROR = 500
    NOT_FOUND = 404
    BAD_REQUEST = 400
    