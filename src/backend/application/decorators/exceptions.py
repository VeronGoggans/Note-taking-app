from src.backend.data.exceptions.exceptions import NotFoundException
from functools import wraps

def check_for_null(func) -> (NotFoundException):

    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs) # Return the original function 
        except NotFoundException as e:
            raise e
    return wrapper 


