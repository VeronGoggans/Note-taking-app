import { NoteDetailContainer } from "../components/modals/noteDetailModal.js";
import { DeleteModal } from "../components/modals/deleteModal.js";
import { ForgotSaveContainer } from "../components/modals/forgotSaveModal.js";
import { NewFolderContainer } from "../components/modals/newFolderModal.js";
import { NoteBackroundContainer } from "../components/modals/noteBackgroundModal.js";
import { NoteLinkModal } from "../components/modals/linkNoteModal.js";
import { SearchModal } from "../components/modals/searchModal.js";
import { EditFolderModal } from "../components/modals/editFolderModal.js";

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
                '.note-background-color-container',
                '.note-details-container',
                '.note-export-modal',
                '.note-link-modal',
                '.edit-folder-modal'
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
    }

    renderNoteDetailsModal(noteInfo) {
        this.addChild(new NoteDetailContainer(noteInfo[1], noteInfo[2]))
        this.show();
    }
    
    renderDeleteModal(id, name, view) {
        this.addChild(new DeleteModal(id, name, view))
        this.show();
    }

    renderForgotSaveModal(view) {
        this.addChild(new ForgotSaveContainer(view));
        this.show();
    }

    renderNewFolderModal(view) {
        this.addChild(new NewFolderContainer(view));
        this.show();
        const inputElement = this.dialog.querySelector('.new-folder-container input');
        inputElement.focus();
    }

    renderNoteBackgroundModal(id, color, view) {
        this.addChild(new NoteBackroundContainer(id, color, view));
        this.show();
    }

    renderNoteLinkModal(view, notes, page, controller, dialog) {
        this.addChild(new NoteLinkModal(view, notes, page, controller, dialog));
        this.show();
    }

    renderSearchModal() {
        const modal = new SearchModal()
        const inputElement = modal.querySelector('.search-function-modal input');
        this.toolbar.appendChild(modal);
        inputElement.focus()
        modal.style.opacity = '1';
        modal.style.transform = 'translateY(0px)';
    }

    renderEditFolderModal(folder, view) {
        this.addChild(new EditFolderModal(folder, view, this))
        this.show();
    }
}