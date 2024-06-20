import { CNode } from "../util/CNode.js";
import { dateFormat } from "../util/date.js";
import { formatName, filterNotePreview } from "../util/formatters.js";

export class Note {
    constructor(note, view) {
        this.id = note.id;
        this.name = note.name;
        this.bookmark = note.bookmark;
        this.favorite = note.favorite;
        this.content = note.content;
        this.color = note.color;
        this.created = dateFormat(note.creation);
        this.lastEdit = dateFormat(note.last_edit);
        this.view = view;

        this.#initializeElements();
        this.#attachEventListeners();
        
        if (this.bookmark) this.HOST.classList.add('bookmark');
        if (this.favorite) this.HOST.classList.add('favorite');
        return this.#render();
    }

    #initializeElements() {
        this.HOST = CNode.create('div', { 'class': 'note', 'id': this.id, 'draggable': 'true'});
        this.HOST.dataset.info = `${this.created}--${this.lastEdit}`;
        this.NAME_BOX = CNode.create('div', { 'class': 'note-name-box' });
        this.H4 = CNode.create('h4', { 'contentEditable': 'false', 'textContent': formatName(this.name), 'spellCheck': false });
        this.BTN_CONTAINER = CNode.create('div', { 'class': 'update-note-btns-container' });
        this.CONFIRM = CNode.create('button', { 'class': 'confirm-note-update-btn' });
        this.CONFIRM_ICON = CNode.create('i', { 'class': 'fa-solid fa-check' });
        this.CANCEL = CNode.create('button', { 'class': 'cancel-note-update-btn' });
        this.CANCEL_ICON = CNode.create('i', { 'class': 'fa-solid fa-xmark' });
        this.CONTENT_BOX = CNode.create('div', { 'class': 'note-content-box' });
        this.CONTENT = CNode.create('p', { 'innerHTML': filterNotePreview(this.content) });
        this.UTIL_BAR = CNode.create('div', { 'class': 'note-util-bar' });
        this.FAVORITE_ICON = CNode.create('i', { 'class': 'fa-solid fa-heart', 'id': 'favorite-note-btn'});
        this.BOOKMARK_ICON = CNode.create('i', { 'class': 'fa-solid fa-bookmark', 'id': 'bookmark-note-btn' });
        this.EDIT_ICON = CNode.create('i', { 'class': 'fa-solid fa-pen' });
        this.DELETE_ICON = CNode.create('i', { 'class': 'fa-solid fa-trash' });
    }

    #render() {
        this.CONFIRM.appendChild(this.CONFIRM_ICON);
        this.CANCEL.appendChild(this.CANCEL_ICON);
        this.BTN_CONTAINER.append(this.CONFIRM, this.CANCEL);
        this.NAME_BOX.append(this.H4, this.BTN_CONTAINER);
        this.CONTENT_BOX.appendChild(this.CONTENT);
        this.UTIL_BAR.append(this.FAVORITE_ICON, this.BOOKMARK_ICON, this.EDIT_ICON, this.DELETE_ICON);
        this.HOST.append(this.NAME_BOX, this.CONTENT_BOX, this.UTIL_BAR);
        return this.HOST
    }

    #attachEventListeners() {
        this.EDIT_ICON.addEventListener('click', () => {this.#toggleEditableNoteName()});
        this.CONFIRM.addEventListener('click', () => {this.updateNoteName()});
        this.H4.addEventListener('keydown', (event) => {if (event.key === 'Enter') this.updateNoteName()});
        this.CANCEL.addEventListener('click', () => {this.#toggleEditableNoteName()});
        this.DELETE_ICON.addEventListener('click', () => {this.view.renderDeleteContainer(this.id, this.name)});
        this.CONTENT_BOX.addEventListener('click', () => {this.view.handleNoteCardClick(this.id)});
        this.BOOKMARK_ICON.addEventListener('click', () => {this.updateNoteBookmark()});
        this.FAVORITE_ICON.addEventListener('click', () => {this.updateNoteFavorite()});
    }

    #toggleBookmarkStyle() {
        this.HOST.classList.contains('bookmark') ? 
        this.HOST.classList.remove('bookmark') :
        this.HOST.classList.add('bookmark');
    }

    #toggleFavoriteStyle() {
        this.HOST.classList.contains('favorite') ? 
        this.HOST.classList.remove('favorite') :
        this.HOST.classList.add('favorite');
    }

    #toggleEditableNoteName() {
        this.H4.contentEditable = this.H4.contentEditable === 'true' ? 'false' : 'true';
        this.H4.style.borderColor = this.H4.style.borderColor === 'rgb(116, 122, 160)' ? 'transparent' : '#747aa0';
        this.BTN_CONTAINER.style.visibility = this.BTN_CONTAINER.style.visibility === 'visible' ? 'hidden' : 'visible';
        const noteObject = this.view.getNoteObject(this.id);

        if (this.BTN_CONTAINER.style.visibility === 'visible') {
            this.H4.textContent = noteObject.name;
        } else {
            this.H4.textContent = formatName(this.H4.textContent);
        }
    }

    async updateNoteName() {
        this.view.updateNote(this.id, this.H4.textContent, this.CONTENT.innerHTML, this.bookmark, this.color);
        this.#toggleEditableNoteName();
    }

    async updateNoteBookmark() {
        // Reverting the bookmark value
        this.bookmark = !this.bookmark;
        this.#toggleBookmarkStyle();
        const content = this.view.getNoteObject(this.id)['content'];
        await this.view.updateNote(this.id, this.name, content, this.bookmark, this.favorite, this.color);
    }

    async updateNoteFavorite() {
        // Reverting the bookmark value
        this.favorite = !this.favorite;
        this.#toggleFavoriteStyle();
        const content = this.view.getNoteObject(this.id)['content'];
        await this.view.updateNote(this.id, this.name, content, this.bookmark, this.favorite, this.color);
    }
}