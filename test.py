flashcards_to_remove = ['# flashcard 0', '# flashcard 2']
with open('storage/flashcards/flashcard-deck-fcd-7.txt') as file:
    index = 0
    lines = file.readlines()
    for line in lines:
        if line.strip() in flashcards_to_remove:
            print(True)
