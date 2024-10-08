import { CNode } from "../util/CNode.js";
import { dateFormat } from "../util/date.js";
import { formatName, filterNotePreview, captureNewLines } from "../util/formatters.js";
import { stickyNoteColors } from "../constants/constants.js";
import { addDraggImage } from "../util/ui.js";

export class Note {
    constructor(note, view) {
        this.id = note.id;
        this.name = note.name;
        this.bookmark = note.bookmark;
        this.content = filterNotePreview(note.content);
        this.color = note.color;
        this.created = dateFormat(note.creation);
        this.lastEdit = dateFormat(note.last_edit);
        this.view = view;

        this.#initElements();
        this.#eventListeners();
        
        if (this.bookmark) this.HOST.classList.add('bookmark');
        return this.#render();
    }

    #initElements() {
        this.HOST = CNode.create('div', { 'class': 'note', 'id': this.id, 'draggable': true});
        this.HOST.dataset.info = `${this.created}--${this.lastEdit}`;
        this.NAME_BOX = CNode.create('div', { 'class': 'note-name-box' });
        this.H4 = CNode.create('h4', {'textContent': formatName(this.name)});
        this.CONTENT_BOX = CNode.create('div', { 'class': 'note-content-box' });
        this.CONTENT = CNode.create('p', { 'innerHTML': this.content});
        this.UTIL_BAR = CNode.create('div', { 'class': 'note-util-bar' });
        this.BOOKMARK_ICON = CNode.create('i', { 'class': 'fa-solid fa-bookmark', 'id': 'bookmark-note-btn' });
        this.DELETE_ICON = CNode.create('i', { 'class': 'fa-solid fa-trash' });
    }

    #render() {
        this.NAME_BOX.append(this.H4);
        this.CONTENT_BOX.appendChild(this.CONTENT);
        this.UTIL_BAR.append(this.BOOKMARK_ICON, this.DELETE_ICON);
        this.HOST.append(this.NAME_BOX, this.CONTENT_BOX, this.UTIL_BAR);
        return this.HOST
    }

    #eventListeners() {
        this.DELETE_ICON.addEventListener('click', () => {this.view.renderDeleteModal(this.id, this.name)});
        this.CONTENT_BOX.addEventListener('click', () => {this.view.handleNoteCardClick(this.id)});
        this.BOOKMARK_ICON.addEventListener('click', () => {this.updateNoteBookmark()});

        // Drag and drop event listeners below.
        this.HOST.addEventListener('dragstart', (event) => {
            addDraggImage(event, this.HOST, 'file')
            event.dataTransfer.setData('text/plain', `{"draggedItem": "note", "draggedCardId": "${this.id}"}`)
        });
        this.HOST.addEventListener('dragend', () => {this.HOST.classList.remove('dragging')});
    }

    #toggleBookmarkStyle() {
        this.HOST.classList.contains('bookmark') ? 
        this.HOST.classList.remove('bookmark') :
        this.HOST.classList.add('bookmark');
    }


    async updateNoteBookmark() {
        // Reverting the bookmark value
        this.bookmark = !this.bookmark;
        this.#toggleBookmarkStyle();
        const content = this.view.getNoteObject(this.id)['content'];
        await this.view.updateObject({
            'id': this.id, 
            'name': this.name, 
            'content': content, 
            'bookmark': this.bookmark, 
            'favorite': this.favorite
        });
    }
}


export class RecentNote {
    constructor(note, view) {
        this.id = note.id;
        this.name = note.name;
        this.bookmark = note.bookmark;
        this.content = note.content;
        this.view = view;

        this.#initElements();
        this.#eventListeners();
        return this.#render();
    }

    #initElements() {
        this.HOST = CNode.create('div', { 'class': 'recent-note', 'id': this.id});
        this.NAME_BOX = CNode.create('div', { 'class': 'note-name-box' });
        this.H4 = CNode.create('h4', { 'textContent': formatName(this.name)});
        this.CONTENT_BOX = CNode.create('div', { 'class': 'note-content-box' });
        this.CONTENT = CNode.create('p', { 'innerHTML': filterNotePreview(this.content) });
    }

    #render() {
        this.NAME_BOX.appendChild(this.H4);
        this.CONTENT_BOX.appendChild(this.CONTENT);
        this.HOST.append(this.NAME_BOX, this.CONTENT_BOX);
        return this.HOST
    }

    #eventListeners() {
        this.CONTENT_BOX.addEventListener('click', () => {this.view.handleNoteCardClick(this.id)});
    }
}

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