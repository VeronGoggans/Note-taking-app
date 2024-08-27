import { HttpModel } from "../model/httpModel.js";
import { FlashcardDeckView } from "../view/flashcardDeckView.js";
import { FlashcardModel } from "../model/flashcardModel.js";

export class FlashcardDeckController {
    constructor(applicationController) {
        this.applicationController = applicationController;
        this.objectNum = 0;
        this.model = new HttpModel();
    }

    async init() {
        this.view = new FlashcardDeckView(this, this.applicationController);
        this.flashcardModel = new FlashcardModel();
        await this.getDecks()
    }

    async addDeck(deckName, flashcards) {
        const response = await this.model.add('/deck', {
            'name': deckName,
            'flashcards': flashcards
        });
        const deck = response[this.objectNum].deck;
        this.view.renderOne(deck);
        
    }

    async getDecks() {
        const response = await this.model.get('/decks');
        this.view.renderAll(response[this.objectNum].decks)
        this.view.renderStats(response[this.objectNum].misc)
    }

    async getDeckById(deckId) {
        const response = await this.model.get(`/deck/${deckId}`);
        return response[this.objectNum].deck;
    }

    async getSearchItems() {
        const response = await this.model.get('/deckSearchItems');
        return response[this.objectNum].items;
    }

    async delete(deckId) {
        const response = await this.model.delete(`/deck/${deckId}`);
        const deck = response[this.objectNum].deck;        
        this.view.renderDelete(deck);
    }

    /**
     * Temporarely stores a flashcard object
     * 
     * @param {Object} flashcard 
     */
    saveCardToModel(flashcard) {
        this.flashcardModel.storeFlashcard(flashcard);
    }

    /**
     * Temporarely stores the deck name
     * 
     * @param {Object} flashcard 
     */
    saveDeckName(deckName) {
        this.flashcardModel.storeDeckName(deckName)
    }

    /**
     * Returns a Object that contains the deck name and 
     * a list of saved flashcard objects
     * @returns {Object}
    */
    getStoredDeckInfo() {
        return this.flashcardModel.getStoredDeckInfo();
    }
}