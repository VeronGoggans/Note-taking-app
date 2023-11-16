from backend.data.subDirectory.SubDirectoryData import SubDirectoryData
from backend.presentation.requestBodies.SubDirectoryRequest import SubDirectoryRequest

class SubDirectoryService:
    def __init__(self, sub_dir_data: SubDirectoryData):
        self.sub_directory_data = sub_dir_data

    
    def get_subdirectories(self, dir_id: int):
        return self.sub_directory_data.get(dir_id)
    
    
    def add_subdirectory(self, dir_id: int, sub_dir: SubDirectoryRequest):
        return self.sub_directory_data.add(dir_id, sub_dir)
    

    def update_subdirectory(self, sub_dir_id: int, sub_dir: SubDirectoryRequest):
        return self.sub_directory_data.update(sub_dir_id, sub_dir.name)
    
    
    def delete_subdirectory(self, sub_dir_id: int):
        return self.sub_directory_data.delete(sub_dir_id)

    