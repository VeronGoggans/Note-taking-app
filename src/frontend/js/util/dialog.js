import { NoteDetailContainer } from "../components/modals/noteDetailModal.js";
import { DeleteModal } from "../components/modals/deleteModal.js";
import { ForgotSaveContainer } from "../components/modals/forgotSaveModal.js";
import { NewFolderContainer } from "../components/modals/newFolderModal.js";
import { NoteLinkModal } from "../components/modals/linkNoteModal.js";
import { SearchModal } from "../components/modals/searchModal.js";
import { EditFolderModal } from "../components/modals/editFolderModal.js";
import { NewDeckModal } from "../components/modals/newDeckModal.js";
import { AnimationHandler } from "../handlers/animation/animationHandler.js";
import { EditFlashcardModal } from "../components/modals/editFlashcardModal.js";
import { StickyNoteModal } from "../components/modals/stickyNoteModal.js";

export class Dialog {
    constructor() {
        this.dialog = document.querySelector('.dialog');
        this.toolbar = document.querySelector('.toolbar');
        this.attachEventlistener();
    }

    attachEventlistener() {
        this.dialog.addEventListener('click', (event) => {
            const excludedContainers = [
                '.new-folder-container',
                '.delete-folder-container',
                '.settings-container',
                '.dont-forget-to-save-container',
                '.note-details-container',
                '.note-link-modal',
                '.edit-folder-modal',
                '.create-deck-modal',
                '.edit-flashcard-modal',
                '.sticky-note-modal'
            ];

            // Check if the clicked target belongs to any excluded container
            if (excludedContainers.some(selector => event.target.closest(selector))) {
                return;
            }

            // If not, hide the dialog
            this.hide();
        });
    }

    show() {
        this.dialog.style.visibility = 'visible';
        this.dialog.style.top = '0%';
    }

    hide() {
        this.dialog.style.visibility = 'hidden';
        this.dialog.style.top = '100%';
        if (this.dialog.firstChild) {
            // If it has, remove the first child
            const firstChild = this.dialog.firstChild;
            this.dialog.removeChild(firstChild);
        }
    }

    addChild(child) {
        this.dialog.appendChild(child);
        AnimationHandler.fadeInFromBottom(child);
        this.show();
    }

    renderNoteDetailsModal(noteInfo) {
        this.addChild(new NoteDetailContainer(noteInfo))
    }
    
    renderDeleteModal(id, name, view) {
        this.addChild(new DeleteModal(id, name, view))
    }

    renderNewDeckModal(controller, flashcards = null, deckName = null) {
        this.addChild(new NewDeckModal(controller, flashcards, deckName));
        this.dialog.querySelector('.create-deck-modal input').focus();
    }

    renderStickyNoteModal(controller, stickyNote = null) {
        this.addChild(new StickyNoteModal(controller, this, stickyNote))
    }

    renderEditFlashcardModal(controller, flashcard = null) {
        this.addChild(new EditFlashcardModal(controller, this, flashcard));
    }

    renderForgotSaveModal(view) {
        this.addChild(new ForgotSaveContainer(view));
    }

    renderNewFolderModal(view) {
        this.addChild(new NewFolderContainer(view));
        this.dialog.querySelector('.new-folder-container input').focus();
    }

    renderNoteLinkModal(view, notes, page, controller, dialog) {
        this.addChild(new NoteLinkModal(view, notes, page, controller, dialog));
    }

    renderSearchModal(toolbar) {
        const modal = new SearchModal()
        modal.querySelector('.search-function-modal input').focus();
        toolbar.appendChild(modal);
        modal.style.opacity = '1';
        modal.style.transform = 'translateY(0px)';
    }

    renderEditFolderModal(folder, view) {
        this.addChild(new EditFolderModal(folder, view, this));
        this.dialog.querySelector('.edit-folder-modal input').focus()
    }
}