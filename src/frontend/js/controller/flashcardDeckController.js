import { HttpModel } from "../model/httpModel.js";
import { FlashcardDeckView } from "../view/flashcardDeckView.js";
import { FlashcardModel } from "../model/flashcardModel.js";
import { NotificationHandler } from "../handlers/userFeedback/notificationHandler.js";

export class FlashcardDeckController {
    constructor(applicationController) {
        this.applicationController = applicationController;
        this.model = new HttpModel();
    }

    async init() {
        this.view = new FlashcardDeckView(this, this.applicationController);
        this.flashcardModel = new FlashcardModel();
        await this.getDecks()
    }

    
    async addDeck(deckName, flashcards) {
        try {
            const { deck } = await this.model.add('/deck', {'name': deckName, 'flashcards': flashcards});
            this.view.renderOne(deck);
        } 
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }


    async getDecks() {
        const { decks } = await this.model.get('/decks');        
        this.view.renderAll(decks)
        // this.view.renderStats(flashcard_count)
    }


    async getDeckById(deckId) {
        try {
            const { deck } = await this.model.get(`/deck/${deckId}`);
            return deck
        } 
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }

    async getFlashcards(deckId) {
        const { flashcards } = await this.model.get(`/flashcards/${deckId}`)
        return flashcards
    }


    async getSearchItems() {
        try {
            const { items } = await this.model.get('/deckSearchItems');
            return items
        } 
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }


    async delete(deckId) {
        try {
            const { deck } = await this.model.delete(`/deck/${deckId}`);       
            this.view.renderDelete(deck);
        } 
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
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