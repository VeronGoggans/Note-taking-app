from dataclasses import dataclass


@dataclass
class FolderRequestDto:
    folder_id: str
    name: str
    color: str