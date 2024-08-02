from dataclasses import dataclass

@dataclass
class PostNoteDto:
    folder_id: str
    name: str
    content: str


@dataclass
class PutNoteDto:
    note_id: str
    name: str
    content: str
    bookmark: bool
    favorite: bool