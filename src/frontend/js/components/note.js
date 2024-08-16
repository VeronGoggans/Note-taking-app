import { CNode } from "../util/CNode.js";
import { dateFormat } from "../util/date.js";
import { formatName, filterNotePreview } from "../util/formatters.js";

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

        this.#initializeElements();
        this.#attachEventListeners();
        
        if (this.bookmark) this.HOST.classList.add('bookmark');
        return this.#render();
    }

    #initializeElements() {
        this.HOST = CNode.create('div', { 'class': 'note', 'id': this.id, 'draggable': 'true'});
        this.HOST.dataset.info = `${this.created}--${this.lastEdit}`;
        this.NAME_BOX = CNode.create('div', { 'class': 'note-name-box' });
        this.H4 = CNode.create('h4', { 'contentEditable': 'false', 'textContent': formatName(this.name), 'spellCheck': false });
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

    #attachEventListeners() {
        this.DELETE_ICON.addEventListener('click', () => {this.view.renderDeleteModal(this.id, this.name)});
        this.CONTENT_BOX.addEventListener('click', () => {this.view.handleNoteCardClick(this.id)});
        this.BOOKMARK_ICON.addEventListener('click', () => {this.updateNoteBookmark()});
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
        await this.view.updateNote({
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

        this.#initializeElements();
        this.#attachEventListeners();
        return this.#render();
    }

    #initializeElements() {
        this.HOST = CNode.create('div', { 'class': 'recent-note', 'id': this.id, 'draggable': 'true'});
        this.NAME_BOX = CNode.create('div', { 'class': 'note-name-box' });
        this.H4 = CNode.create('h4', { 'contentEditable': 'false', 'textContent': formatName(this.name), 'spellCheck': false });
        this.CONTENT_BOX = CNode.create('div', { 'class': 'note-content-box' });
        this.CONTENT = CNode.create('p', { 'innerHTML': filterNotePreview(this.content) });
    }

    #render() {
        this.NAME_BOX.appendChild(this.H4);
        this.CONTENT_BOX.appendChild(this.CONTENT);
        this.HOST.append(this.NAME_BOX, this.CONTENT_BOX);
        return this.HOST
    }

    #attachEventListeners() {
        this.CONTENT_BOX.addEventListener('click', () => {this.view.handleNoteCardClick(this.id)});
    }
}