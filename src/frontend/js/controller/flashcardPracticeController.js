import { HttpModel } from "../model/httpModel.js";
import { FlashcardPracticeView } from "../view/flashcardPracticeView.js";

export class FlashcardPracticeController {
    constructor(applicationController) {
        this.applicationController = applicationController;
        this.model = new HttpModel()
    }


    async init(deck, flashcards) {
        this.view = new FlashcardPracticeView(this, this.applicationController, deck, flashcards);
    }
    

    loadPreviousView() {
        const previousView = this.applicationController.getPreviousView();
        this.applicationController.initView(previousView);
    }
    

    async updateFlashcardRating(flascardId, rating) {      
        await this.model.patch('/flashcardRating', {'id': flascardId, 'rating': rating});
    }
}