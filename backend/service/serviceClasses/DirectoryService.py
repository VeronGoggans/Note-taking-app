from backend.data.directory.DirectoryData import DirectoryData

class DirectoryService:
    def __init__(self, dir_data: DirectoryData) -> None:
        self.directory_data = dir_data

    