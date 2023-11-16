from backend.data.directory.DirectoryData import DirectoryData
from backend.presentation.requestBodies.DirectoryRequest import DirectoryRequest

class DirectoryService:
    def __init__(self, dir_data: DirectoryData):
        self.directory_data = dir_data

    def get_directories(self):
        return self.directory_data.get()
    
    
    def add_directory(self, dir: DirectoryRequest):
        return self.directory_data.add(dir)
    

    def update_directory(self, dir_id: int, dir: DirectoryRequest):
        return self.directory_data.update(dir_id, dir.name)
    
    
    def delete_directory(self, dir_id: int):
        return self.directory_data.delete(dir_id)

    