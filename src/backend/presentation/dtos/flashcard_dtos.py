from dataclasses import dataclass

@dataclass
class PostFlashcardDTO:
    """
    - term (str): The term for the flashcard
    - description (str): The description for the flashcard
    """
    term: str
    description: str
    

@dataclass
class FlashcardDTO:
    id: str
    term: str
    description: str
    rating: str