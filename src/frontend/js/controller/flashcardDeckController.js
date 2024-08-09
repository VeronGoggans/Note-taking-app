import { HttpModel } from "../model/httpModel.js";
import { FlashcardDeckView } from "../view/flashcardDeckView.js";

export class FlashcardDeckController {
    constructor(applicationController, dialog) {
        this.applicationController = applicationController;
        this.dialog = dialog;
        this.objectNum = 0;
        this.model = new HttpModel();
    }

    async init() {
        this.view = new FlashcardDeckView(this, this.applicationController, this.dialog);
        await this.getDecks()
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
}