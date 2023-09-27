class Note:
    def __init__(self, id: int, title: str, content: str, bookmark: bool, password_protected: bool):
        self.id = id
        self.title = title
        self.content = content
        self.bookmark = bookmark
        self.password_protected = password_protected

    
    