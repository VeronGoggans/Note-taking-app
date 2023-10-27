class UserStory():
    def __init__(self, id, name, priority, estimate_time, as_a_description, i_want_description, so_that_description):
        self.id = id
        self.name = name
        self.priority = priority
        self.estimate_time = estimate_time
        self.as_a_description = as_a_description
        self.i_want_description = i_want_description
        self.so_that_description = so_that_description

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "priority": self.priority,
            "estimate_time": self.estimate_time,
            "as_a_description": self.as_a_description,
            "i_want_description": self.i_want_description,
            "so_that_description": self.so_that_description
        }