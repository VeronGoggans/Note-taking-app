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


@dataclass
class PostStickyNoteDto:
    name: str
    content: str


@dataclass
class PutStickyNoteDto:
    sticky_note_id: str
    name: str
    content: str
