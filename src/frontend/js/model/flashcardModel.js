/**
 * This class is used to temporarely store flashcard objects
 * The new deck modal will make use of this class.
 */
export class FlashcardModel {
    constructor() {
        this.flashcards = []
    }

    save(flashcard) {
        this.flashcards.push(flashcard)
    }

    getSavedFlashcards() {
        return this.flashcards
    }
}