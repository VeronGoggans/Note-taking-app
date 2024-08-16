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
        this.updatedFlashcard.push(flashcard)
    }

    delete(flashcardId) {
        this.flashcardsToDelete.push(flashcardId)
    }

    getEditInfo() {
        return {
            new: this.newFlashcards,
            updated: this.updatedFlashcard,
            deleted: this.flashcardsToDelete
        }
    }
}