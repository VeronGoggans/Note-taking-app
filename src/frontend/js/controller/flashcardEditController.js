import { HttpModel } from "../model/httpModel.js";
import { FlashcardEditModel } from "../model/flashcardEditModel.js";
import { FlashcardEditView } from "../view/flashcardEditView.js";
import { NotificationHandler } from "../handlers/userFeedback/notificationHandler.js";

export class FlashcardEditController {
    constructor(applicationController) {
        this.applicationController = applicationController;
        this.model = new HttpModel();
    }

    init(deck) {
        this.deck = deck;
        this.editModel = new FlashcardEditModel();
        this.view = new FlashcardEditView(this, this.applicationController);
        this.view.renderAll(deck);
    }

    loadPreviousView() {
        const previousView = this.applicationController.getPreviousView();
        this.applicationController.initView(previousView);
    }


    async saveDeckChanges(deckId = null, newDeckName = null) {
        const { newFlashcards, updatedFlashcards, flashcardsToDelete} = this.editModel.getSavedChanges();

        try {
            if (newFlashcards.length > 0) {
                await this.model.add('/flashcards', {'deck_id': this.deck.id, 'flashcards': newFlashcards})
            }
            if (updatedFlashcards.length > 0) {
                await this.model.update('/flashcards', {'deck_id': this.deck.id, 'flashcards': updatedFlashcards})
            }
            if (flashcardsToDelete.length > 0) {
                await this.model.delete('/flashcards', {'deck_id': this.deck.id, 'flashcard_ids': flashcardsToDelete})
            }
            if (deckId !== null) {
                await this.model.update('/deck', {'deck_id': deckId, 'name': newDeckName})
            }
        }
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }


    deleteFlashcard(flashcardId) {
        this.editModel.delete(flashcardId);
    }

    updateFlashcard(flashcard) {
        this.editModel.update(flashcard);
        this.view.renderUpdate(flashcard);
    }

    addFlashcard(flashcard) {
        this.editModel.save(flashcard)
        this.view.renderOne(flashcard)
    }
}