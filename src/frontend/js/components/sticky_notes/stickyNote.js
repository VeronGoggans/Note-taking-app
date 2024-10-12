import { CNode } from "../../util/CNode.js";
import { stickyNoteColors } from "../../constants/constants.js";
import { captureNewLines } from "../../util/formatters.js";


export class StickyNote {
    constructor(stickyNote, view, controller, dialog) {
        this.stickyNote = stickyNote;
        this.view = view;
        this.controller = controller;
        this.dialog = dialog;

        this.#initElements();

        // Give the sticky note a random color.
        this.HOST.style.backgroundColor = stickyNoteColors[Math.floor(Math.random()*stickyNoteColors.length)]

        this.#eventListeners();
        return this.#render();
    }


    #initElements() {
        this.HOST = CNode.create('div', { 'class': 'sticky-note', 'id': this.stickyNote.id});
        this.H3 = CNode.create('h3', { 'textContent': this.stickyNote.name });
        this.CONTENT = CNode.create('p', { 'innerHTML': captureNewLines(this.stickyNote.content) });
    }

    #render() {
        this.HOST.append(this.H3, this.CONTENT);
        return this.HOST
    }

    #eventListeners() {
        this.HOST.addEventListener('click', () => {this.dialog.renderStickyNoteModal(this.controller, this.view.getStickyNoteObject(this.stickyNote.id))});
    }
}