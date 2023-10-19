from datetime import datetime


class Project():
    def __init__(self, id: int, name: str, description: str):
        self.id = id
        self.creation_date = self.__get_date()
        self.completion_date = 'null'
        self.name = name
        self.description = description
        self.to_do = []
        self.doing = []
        self.testing = []
        self.done = []


    def to_dict(self):
        return {
            'id': self.id,
            'creation_date': self.creation_date,
            'completion_date': self.completion_date,
            'name': self.name,
            'description': self.description,
            'todo': self.to_do,
            'doing': self.doing,
            'testing': self.testing,
            'done': self.done
        }
    
    
    def set_completion_date(self):
        current_date = datetime.now()
        self.completion_date = current_date.strptime('%d-%m-%Y')
    
    
    def __get_date(self):
        current_date = datetime.now()
        return current_date.strftime('%d-%m-%Y')
        