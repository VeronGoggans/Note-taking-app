from src.backend.data.exceptions.exceptions import NotFoundException, SerializationException, DeserializationException, AdditionException
from src.backend.presentation.http_status import HttpStatus
from functools import wraps



def exception_handler(func) -> (None | NotFoundException | SerializationException | Exception):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs) # Return the original function 
        except NotFoundException as e:
            return {'status': 'not_found', 'message': str(e)}, HttpStatus.NOT_FOUND
        except (SerializationException | DeserializationException | AdditionException | Exception) as e:
            return {'status': 'error', 'message': str(e)}, HttpStatus.INTERAL_SERVER_ERROR
    return wrapper 