import { CNode } from "../util/CNode.js";
import { dateFormat } from "../util/date.js";
import { formatName } from "../util/formatters.js";

export class Note {
    constructor(note, view) {
        this.id = note.id;
        this.name = note.title;
        this.bookmark = note.bookmark;
        this.content = note.content;
        this.color = note.color;
        this.created = dateFormat(note.creation);
        this.lastEdit = dateFormat(note.last_edit);
        this.view = view;

        // creating HTML elements.
        this.HOST = CNode.create('div', {'class': 'note', 'id': this.id});
        this.HOST.dataset.info = `${this.created}--${this.lastEdit}`;
        this.NAME_BOX = CNode.create('div', {'class': 'note-name-box'});
        this.H4 = CNode.create('h4', {'contentEditable': 'false', 'textContent': formatName(this.name), 'spellCheck': false});
        this.BTN_CONTAINER = CNode.create('div', {'class': 'update-note-btns-container'});
        this.CONFIRM = CNode.create('button', {'class': 'confirm-note-update-btn'});
        this.CONFIRM_ICON = CNode.create('i', {'class': 'fa-solid fa-check'});
        this.CANCEL = CNode.create('button', {'class': 'cancel-note-update-btn'});
        this.CANCEL_ICON = CNode.create('i', {'class': 'fa-solid fa-xmark'});
        this.CONTENT_BOX = CNode.create('div', {'class': 'note-content-box'});
        this.CONTENT = CNode.create('p', {'innerHTML': this.content});
        this.UTIL_BAR = CNode.create('div', {'class': 'note-util-bar'});
        this.BOOKMARK = CNode.create('button', {'class': 'bookmark-note-btn'});
        this.BOOKMARK_ICON = CNode.create('i', {'class': 'fa-solid fa-bookmark'});
        this.EDIT = CNode.create('button', {'class': 'edit-note-btn'});
        this.EDIT_ICON = CNode.create('i', {'class': 'fa-solid fa-pen'});
        this.DELETE = CNode.create('button', {'class': 'delete-note-btn'});
        this.DELETE_ICON = CNode.create('i', {'class': 'fa-solid fa-trash'});

        this._attachEventListeners();
        this._applyBookmarkStyle(this.bookmark);
        return this._render();
    }

    _render() {
        this.HOST.appendChild(this.NAME_BOX);
        this.NAME_BOX.appendChild(this.H4);
        this.CONFIRM.appendChild(this.CONFIRM_ICON);
        this.BTN_CONTAINER.appendChild(this.CONFIRM);
        this.CANCEL.appendChild(this.CANCEL_ICON);
        this.BTN_CONTAINER.appendChild(this.CANCEL);
        this.NAME_BOX.appendChild(this.BTN_CONTAINER);
        this.CONTENT_BOX.appendChild(this.CONTENT);
        this.HOST.appendChild(this.CONTENT_BOX);
        this.UTIL_BAR.appendChild(this.BOOKMARK);
        this.BOOKMARK.appendChild(this.BOOKMARK_ICON);
        this.UTIL_BAR.appendChild(this.EDIT);
        this.EDIT.appendChild(this.EDIT_ICON);
        this.UTIL_BAR.appendChild(this.DELETE);
        this.DELETE.appendChild(this.DELETE_ICON);
        this.HOST.appendChild(this.UTIL_BAR);
        return this.HOST
    }

    _attachEventListeners() {
        this.EDIT.addEventListener('click', () => {this._toggleEditableNoteName()});
        this.CONFIRM.addEventListener('click', () => {this.updateNoteName()});
        this.H4.addEventListener('keydown', (event) => {if (event.key === 'Enter') this.updateNoteName()});
        this.CANCEL.addEventListener('click', () => {this._toggleEditableNoteName()});
        this.DELETE.addEventListener('click', () => {this.view.renderDeleteContainer(this.id, this.name)});
        this.CONTENT_BOX.addEventListener('click', () => {this.view.handleNoteCardClick(this.id, this.created)});
        this.BOOKMARK.addEventListener('click', () => {this.updateNoteBookmark()});
    }

    _applyBookmarkStyle(bookmarkValue) {
        if (bookmarkValue) this.HOST.classList.add('bookmark');
    }


    _toggleBookmarkStyle() {
        this.HOST.classList.contains('bookmark') ? 
        this.HOST.classList.remove('bookmark') :
        this.HOST.classList.add('bookmark');
    }


    _toggleEditableNoteName() {
        this.H4.contentEditable = this.H4.contentEditable === 'true' ? 'false' : 'true';
        this.H4.style.borderColor = this.H4.style.borderColor === 'rgb(116, 122, 160)' ? 'transparent' : '#747aa0';
        this.BTN_CONTAINER.style.visibility = this.BTN_CONTAINER.style.visibility === 'visible' ? 'hidden' : 'visible';
    }

    /**
     * This method updates the name of a note
     */
    async updateNoteName() {
        this.view.updateNote(this.id, this.H4.textContent, this.CONTENT.innerHTML, this.bookmark, this.color);
        this._toggleEditableNoteName();
    }

    /**
     * This method updates the bookmark value of a note
     */
    async updateNoteBookmark() {
        // Reverting the bookmark value
        this.bookmark = !this.bookmark;;
        this._toggleBookmarkStyle();
        await this.view.updateNote(this.id, this.name, this.CONTENT.innerHTML, this.bookmark, this.color);
    }
}