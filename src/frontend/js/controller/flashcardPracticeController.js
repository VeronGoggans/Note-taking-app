import { HttpModel } from "../model/httpModel.js";
import { FlashcardPracticeView } from "../view/flashcardPracticeView.js";
import { NotificationHandler } from "../handlers/userFeedback/notificationHandler.js";

export class FlashcardPracticeController {
    constructor(applicationController) {
        this.applicationController = applicationController;
        this.model = new HttpModel()
    }


    async init(deck) {
        this.view = new FlashcardPracticeView(this, this.applicationController, deck);
    }
    

    loadPreviousView() {
        const previousView = this.applicationController.getPreviousView();
        this.applicationController.initView(previousView);
    }
    

    async updateFlashcards(deckId, timeStudied, flashcards) {
        try {
            await this.model.update('/flashcardRatings', {'deck_id': deckId, 'time_studied': timeStudied, 'flashcards': flashcards});
            this.loadPreviousView();
        } 
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }   
    }
}