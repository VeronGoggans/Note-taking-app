import os 

class ProjectTaskData():
    def __init__(self) -> None:
        self.projects_path = os.getcwd() + '/storage/json/projects.json'

    def add_task(self):
        pass

    def get_tasks(self):
        pass

    def update_task(self):
        pass

    def delete_task(self):
        pass
