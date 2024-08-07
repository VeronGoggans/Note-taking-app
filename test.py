flashcards = [
    {
        "id": 1,
        "name": "flashcard 1"
    },
    {
        "id": 2,
        "name": "flashcard 1"
    },
    {
        "id": 4,
        "name": "flashcard 1"
    },
    {
        "id": 5,
        "name": "flashcard 1"
    },
    {
        "id": 10,
        "name": "flashcard 1"
    }
]
currentCardIndex = 0


def get_next_card():
    print(flashcards[currentCardIndex])
    currentCardIndex += 1


for i in range(0, len(flashcards) -1):
    get_next_card()
