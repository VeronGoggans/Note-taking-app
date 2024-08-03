import { FlashcardModel } from "../model/flashcardModel.js";
import { FlashcardDeckView } from "../view/flashcardDeckView.js";

export class FlashcardDeckController {
    constructor(applicationController, dialog) {
        this.applicationController = applicationController;
        this.dialog = dialog;
        this.objectNum = 0;
        this.model = new FlashcardModel();
    }

    async init() {
        this.view = new FlashcardDeckView(this, this.applicationController, this.dialog);
        await this.getDecks()
    }

    async getDecks() {
        const response = await this.model.get('/decks');
        this.view.renderAll(
            response[this.objectNum].decks
        )
    }

    async getFlashcards() {
        const response = await this.model.get('/flashcards', folderId);
        const notes = response.Note;
    }

    async getFlashcardById(flashcardId) {
        const response = await this.model.getById('/flashcardById', flashcardId);
        const flashcard = response.Flashcard;
        return flashcard
    }
}