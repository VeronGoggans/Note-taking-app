def increment(id_part: str) -> str:
    """This method is increments the number in a id by one.
    Args:
        id_part (str): The number of the id string.
    
    Returns: 
        (str) A incremented ID string.
    """
    increment_ID = int(id_part) + 1
    return str(increment_ID)
    
print(increment('100'))