import { CNode } from "../../util/CNode.js";
import { dialogEvent } from "../../util/dialog.js";


export class StickyNoteModal {
    constructor(controller, parentId, stickyNote = null) {
        this.controller = controller;
        this.stickyNote = stickyNote;
        this.parentId = parentId;

        this.action = 'add';

        this.HOST = CNode.create('div', {'class': 'sticky-note-modal'});
        this.MODAL_TITLE = CNode.create('h2', {'textContent': 'Add sticky note'});
        this.NAME_INPUT = CNode.create('input', {'type': 'text', 'class': 'name-input', 'spellCheck': false, 'placeholder': 'Sticky note name'});
        this.CONTENT = CNode.create('textarea', {'class': 'content-textarea', 'spellCheck': false, 'placeholder': 'Sticky note content'});
        this.SAVE_BTN = CNode.create('button', {'class': 'save-sticky-note-btn', 'textContent': 'Add'});

        if (stickyNote !== null) {
            this.DELETE_BTN = CNode.create('button', {'class': 'delete-sticky-note-btn', 'textContent': 'Delete sticky'});
            this.HOST.appendChild(this.DELETE_BTN);
            this.#setStickyNote();
        }

        this.#eventListeners();
        return this.#render();
    }

    #setStickyNote() {
        this.HOST.id = this.stickyNote.id;
        this.action = 'update';
        this.MODAL_TITLE.textContent = 'Change sticky note';
        this.SAVE_BTN.textContent = 'Save'
        this.NAME_INPUT.value = this.stickyNote.name;
        this.CONTENT.textContent = this.stickyNote.content;
    }

    #eventListeners() {
        this.SAVE_BTN.addEventListener('click', async () => {
            // ADDING a sticky note 
            if (this.action === 'add') {
                await this.controller.add({
                    "parent_id": this.parentId,
                    "name": this.NAME_INPUT.value,
                    "content": this.CONTENT.value
                });
            } 
            // UPDATING a sticky note
            else {
                await this.controller.update({
                    "id": this.HOST.id,
                    "name": this.NAME_INPUT.value,
                    "content": this.CONTENT.value
                })
            }
            dialogEvent(this.HOST, 'close');
        })

        // Only add this event listener if the user clicked on a 
        // existing sticky note.
        if (this.stickyNote !== null) {
            this.DELETE_BTN.addEventListener('click', async () => {
                await this.controller.delete(this.stickyNote.id)
                dialogEvent(this.HOST, 'close');
            })
        }
    }


    #render() {
        this.HOST.append(this.MODAL_TITLE, this.NAME_INPUT, this.CONTENT, this.SAVE_BTN);
        return this.HOST;
    }
}