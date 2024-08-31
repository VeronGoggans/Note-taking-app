from src.backend.data.exceptions.exceptions import *
from src.backend.presentation.http_status import HttpStatus
from functools import wraps



def exception_handler(func) -> (NotFoundException | SerializationException | DeserializationException):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs) # Return the original function 
        except NotFoundException as e:
            return {'status': HttpStatus.NOT_FOUND, 'message': str(e)}
        except InvalidMoveRequestException as e:
            return {'status': HttpStatus.BAD_REQUEST, 'message': str(e)}
        except (SerializationException | DeserializationException | AdditionException) as e:
            return {'status': HttpStatus.INTERAL_SERVER_ERROR, 'message': str(e)}
        
    return wrapper 