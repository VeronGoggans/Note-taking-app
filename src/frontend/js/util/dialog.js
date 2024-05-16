import { NoteDetailContainer } from "../components/modals/noteDetailModal.js";
import { NoteDeleteModal } from "../components/modals/noteDeleteModal.js";
import { ForgotSaveContainer } from "../components/modals/forgotSaveModal.js";
import { NewFolderContainer } from "../components/modals/newFolderModal.js";
import { NoteBackroundContainer } from "../components/modals/noteBackgroundModal.js";
import { NoteExportModal } from "../components/modals/noteExportModal.js";
import { NoteLinkModal } from "../components/modals/linkNoteModal.js";

// Improvements
// Dependency injection
export class Dialog {
    constructor() {
        this.dialog = document.querySelector('.dialog');
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
                '.note-link-modal'
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
    
    renderNoteDeleteModal(id, name, view) {
        this.addChild(new NoteDeleteModal(id, name, view))
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

    renderNoteExportModal(view) {
        this.addChild(new NoteExportModal(view));
        this.show();
    }

    renderNoteLinkModal(view, notes, page, controller) {
        this.addChild(new NoteLinkModal(view, notes, page, controller));
        this.show();
    }
}