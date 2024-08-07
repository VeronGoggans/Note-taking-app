import { FlashcardPracticeModel } from "../model/flashcardPracticeModel.js";
import { FlashcardPracticeView } from "../view/flashcardPracticeView.js";

export class FlashcardPracticeController {
    constructor(applicationController) {
        this.applicationController = applicationController;
        this.model = new FlashcardPracticeModel()
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
        const response = await this.model.update(deckId, timeStudied, flashcards);
        if (response[this.statusIndex] === 200) {
            this.loadPreviousView();
        }
    }
}