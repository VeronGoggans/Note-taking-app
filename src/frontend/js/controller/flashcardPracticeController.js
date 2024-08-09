import { HttpModel } from "../model/httpModel.js";
import { FlashcardPracticeView } from "../view/flashcardPracticeView.js";

export class FlashcardPracticeController {
    constructor(applicationController) {
        this.applicationController = applicationController;
        this.model = new HttpModel()
        this.statusIndex = 1;
    }


    async init(deck) {
        this.view = new FlashcardPracticeView(this, this.applicationController, deck);
    }

    loadPreviousView() {
        const previousView = this.applicationController.getPreviousView();
        this.applicationController.initView(previousView);
    }

    async updateFlashcards(deckId, timeStudied, flashcards) {
        const response = await this.model.update('/flashcardRatings', {'deck_id': deckId, 'time_studied': timeStudied, 'flashcards': flashcards});
        if (response[this.statusIndex] === 200) {
            this.loadPreviousView();
        }
    }
}