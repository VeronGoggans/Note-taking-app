import { HttpModel } from "../model/httpModel.js";
import { FlashcardEditModel } from "../model/flashcardEditModel.js";
import { FlashcardEditView } from "../view/flashcardEditView.js";

export class FlashcardEditController {
    constructor(applicationController, dialog) {
        this.applicationController = applicationController;
        this.dialog = dialog;
        this.model = new HttpModel();
    }

    init(deck) {
        this.editModel = new FlashcardEditModel();
        this.view = new FlashcardEditView(this, this.applicationController);
        this.view.renderAll(deck);
    }

    loadPreviousView() {
        const previousView = this.applicationController.getPreviousView();
        this.applicationController.initView(previousView);
    }

    async addFlashcards() {

    }

    async updateFlashcards() {

    }

    async deleteFlashcards() {

    }
}