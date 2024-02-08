import { NoteDetailContainer } from "../components/noteDetailContainer.js";
import { DeleteContainer } from "../components/deleteContainer.js";
import { ForgotSaveContainer } from "../components/forgotSaveContainer.js";
import { NewFolderContainer } from "../components/newFolderContainer.js";
import { SettingsContainer } from "../components/settingsContainer.js";

export class Dialog {
    constructor() {
        this.dialog = document.querySelector('.dialog');
        this.attachEventlistener();
    }

    attachEventlistener() {
        this.dialog.addEventListener('click', (event) => {
            if (!event.target.closest('.new-folder-container') && 
            !event.target.closest('.delete-folder-container') &&
            !event.target.closest('.settings-container') && 
            !event.target.closest('.dont-forget-to-save-container')) {this.hide()}
        });
    }

    show() {
        this.dialog.style.visibility = 'visible';
        this.dialog.style.top = '0%';
    }

    hide() {
        this.dialog.style.visibility = 'hidden';
        this.dialog.style.top = '100%';
        this.dialog.removeChild(this.dialog.firstChild);
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

    renderSettingsContainer(view) {
        this.addChild(new SettingsContainer(view));
        this.show();
    }
}