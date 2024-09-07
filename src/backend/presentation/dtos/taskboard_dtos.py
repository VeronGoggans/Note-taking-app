from dataclasses import dataclass

@dataclass
class PutTaskboardDto:
    id: str
    name: str
    description: str
