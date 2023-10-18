from backend.src.domains.projectDomain.projectBoard.projectBoard import ProjectBoard

class Project():
    def __init__(self, id: int, project_name: str):
        self.project_id = id
        self.project_name = project_name
        self.projectBoard = ProjectBoard()

    def to_dict(self):
        return {
            'project_id': self.project_id,
            'project_name': self.project_name,
            'projectBoard': self.projectBoard.to_dict()
        }

    