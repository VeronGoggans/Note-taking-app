from dataclasses import dataclass

@dataclass
class FlashcardDTO:
    term: str
    description: str