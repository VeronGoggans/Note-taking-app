from src.backend.data.exceptions.exceptions import *
from src.backend.presentation.http_status import HttpStatus
from functools import wraps



def exception_handler(func) -> (NotFoundException | SerializationException | DeserializationException):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs) # Return the original function 
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NOT_FOUND
        except InvalidMoveRequestException as e:
            return {'status': 'bad_input', 'message': str(e)}, HttpStatus.BAD_REQUEST
        except (SerializationException | DeserializationException | AdditionException) as e:
            return {'status': 'error', 'message': str(e)}, HttpStatus.INTERAL_SERVER_ERROR
        
    return wrapper 