/**
 * This class is used to temporarely store flashcard objects
 * The new deck modal will make use of this class.
 */
export class FlashcardModel {
    constructor() {
        this.deckName = 'Untitled'
        this.flashcards = []
    }

    storeDeckName(deckName) {
        this.deckName = deckName
    }

    storeFlashcard(flashcard) {
        this.flashcards.push(flashcard)
    }

    getStoredDeckInfo() {
        return {
            flashcards: this.flashcards,
            deckName: this.deckName
        }
    }
}