export class FlashcardEditModel {
    constructor() {
        this.newFlashcards = []
        this.flashcardsToDelete = []
        this.updatedFlashcard = []
    }

    save(flashcard) {
        this.newFlashcards.push(flashcard)
    }

    update(flashcard) {
        this.updatedFlashcard.push(flashcard);
    }

    delete(flashcardId) {
        this.flashcardsToDelete.push(flashcardId)
    }

    getSavedChanges() {
        return {
            newFlashcards: this.newFlashcards,
            updatedFlashcards: this.updatedFlashcard,
            flashcardsToDelete: this.flashcardsToDelete
        }
    }
}