import { HttpModel } from "../model/httpModel.js";
import { FlashcardEditModel } from "../model/flashcardEditModel.js";
import { FlashcardEditView } from "../view/flashcardEditView.js";

export class FlashcardEditController {
    constructor(applicationController) {
        this.applicationController = applicationController;
        this.model = new HttpModel();
    }

    init(deck, flashcards) {
        this.deck = deck;
        this.editModel = new FlashcardEditModel();
        this.view = new FlashcardEditView(this, this.applicationController);
        this.view.renderAll(deck, flashcards);
    }

    loadPreviousView() {
        const previousView = this.applicationController.getPreviousView();
        this.applicationController.initView(previousView);
    }

    async updateDeckName(deckId, newDeckName) {
        await this.model.update('/deck', {'deck_id': deckId, 'name': newDeckName});
    }

    async addFlashcard(flashcardObject) {        
        const { flashcard } = await this.model.add(`/flashcard/${this.deck.id}`, {
            'term': flashcardObject.term,
            'description': flashcardObject.description
        });
        this.view.renderOne(flashcard);
    }

    async updateFlashcard(flashcardObject) {      
        const { flashcard } = await this.model.update(`/flashcard`, {
            'id': flashcardObject.id, 
            'term': flashcardObject.term, 
            'description': flashcardObject.description, 
            'rating': flashcardObject.rating
        });
        this.view.renderUpdate(flashcard);
    }

    async deleteFlashcard(flashcardId) {
        const { flashcard } = await this.model.delete(`/flashcard/${flashcardId}`);
        this.view.renderDelete(flashcard);
    }
}