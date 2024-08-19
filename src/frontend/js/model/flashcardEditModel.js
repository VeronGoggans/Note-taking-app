/**
 * This class is used to temporarly store changes made 
 * to a specific flashcard deck. 
 * Actions such as:
 * 1. Deleting 
 * 2. Updating 
 * 3. Adding 
 * 
 * The FlashcardEditController then uses the getSavedChanges method 
 * to retrieve this data
 */
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