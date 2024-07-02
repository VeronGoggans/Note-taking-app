import { FlashcardModel } from "../model/flashcardModel.js";

export class FlashcardController {
    constructor(applicationController, dialog, notificationHandler) {
        this.applicationController = applicationController;
        this.model = new FlashcardModel();
    }

    async getFlashcards() {
        const response = await this.model.get('/flashcards', folderId);
        const notes = await response.Note;
    }

    async getFlashcardById(flashcardId) {
        const response = await this.model.getById('/flashcardById', flashcardId);
        const flashcard = await response.Flashcard;
        return flashcard
    }
}