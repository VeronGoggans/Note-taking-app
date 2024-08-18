class StickyNote:
    def __init__(self, id: str, name: str, content: str) -> None:
        self.id = id
        self.name = name
        self.content = content

    
    @classmethod
    def from_json(self, json_sticky_note):
        return StickyNote(
            json_sticky_note['id'], 
            json_sticky_note['name'], 
            json_sticky_note['content'], 
        )