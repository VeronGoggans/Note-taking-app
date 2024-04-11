import { NoteDetailContainer } from "../components/noteDetailContainer.js";
import { DeleteContainer } from "../components/deleteContainer.js";
import { ForgotSaveContainer } from "../components/forgotSaveContainer.js";
import { NewFolderContainer } from "../components/newFolderContainer.js";
import { NoteBackroundContainer } from "../components/noteBackgroundContainer.js";

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
                '.note-details-container'
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

    renderNoteDetails(noteInfo) {
        this.addChild(new NoteDetailContainer(noteInfo[1], noteInfo[2]))
        this.show();
    }
    
    renderNoteDeleteContainer(id, name, view) {
        this.addChild(new DeleteContainer(id, name, view))
        this.show();
    }

    renderForgotSaveContainer(view) {
        this.addChild(new ForgotSaveContainer(view));
        this.show();
    }

    renderNewFolderContainer(view) {
        this.addChild(new NewFolderContainer(view));
        this.show();
    }

    renderNoteBackgroundContainer(id, color, view) {
        this.addChild(new NoteBackroundContainer(id, color, view));
        this.show();
    }
}