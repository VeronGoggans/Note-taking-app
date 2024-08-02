from dataclasses import dataclass

@dataclass
class PostFlashcardDTO:
    term: str
    description: str
    

@dataclass
class FlashcardDTO:
    id: str
    term: str
    description: str
    rating: str