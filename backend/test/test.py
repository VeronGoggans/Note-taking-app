from enum import Enum

class AppEntities(Enum):
    NOTE = 'NOTE'
    FOLDER = 'FOLDER'
    SUBFOLDER = 'SUBFOLDER'

def __valid_entity(entity: str):
    return entity == AppEntities.NOTE.value or entity == AppEntities.FOLDER.value or entity == AppEntities.SUBFOLDER.value

print(__valid_entity('FOLDE'))