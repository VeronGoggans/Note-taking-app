class Taskboard:
    def __init__(
            self, 
            id: str, 
            name: str, 
            description: str,
            todo: list = [],
            inprogress: list = [],
            done: list = []
            ) -> None:
        self.id = id
        self.name = name
        self.description = description
        self.todo = todo
        self.inprogress = inprogress
        self.done = done
        