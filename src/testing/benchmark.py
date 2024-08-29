from enum import Enum

class FlashcardRating(Enum):
    CORRECT = 'Correct'
    WRONG = 'Wrong'
    IDLE = 'Idle'

class Flashcard:
    def __init__(self, id, name, answer, rating = FlashcardRating.IDLE.value):
        self.id = id
        self.name = name
        self.answer = answer
        self.rating = rating


file_location = 'C:/Users/jsvgo\Web Dev/In progress/Note Taking App/storage/flashcards/flashcard-deck-fcd-1.txt'
flashcards_text = ''
with open(file_location, 'r') as file:
    flashcards_text = file.read()

    
flashcards = []
flashcard_blocks = flashcards_text.strip().split('# flashcard ')
flashcard_blocks = [block.strip() for block in flashcard_blocks if block.strip()]

for block in flashcard_blocks:
    
    lines = block.strip().split('\n')
    id = int(lines[0])
    name = lines[1]
    answer = ' '.join(lines[2:-1])
    rating = lines[-1].capitalize()  # Ensure correct capitalization
    
    if rating == 'Correct':
        rating = Flashcard.rating = FlashcardRating.CORRECT.value
    elif rating == 'Wrong':
        rating = Flashcard.rating = FlashcardRating.WRONG.value
    else:
        rating = Flashcard.rating = FlashcardRating.IDLE.value
    
    flashcards.append(Flashcard(id, name, answer, rating))

for flashcard in flashcards:
    print(f'flashcard: {flashcard.id}\nname: {flashcard.name}\nanswer: {flashcard.answer}\nRating: {flashcard.rating}')
    print('\n')