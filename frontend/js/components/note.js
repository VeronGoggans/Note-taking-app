import { CNode } from "../util/CNode.js";

export class Note {
    constructor(id, name, bookmark, content, created, lastEdit, view) {
        this.id = id;
        this.name = name;
        this.bookmark = bookmark;
        this.content = content;
        this.created = created;
        this.lastEdit = lastEdit;
        this.view = view;

        // creating HTML elements.
        this.HOST = CNode.create('div', {'class': 'note', 'id': this.id});
        this.HOST.dataset.info = `${created}--${lastEdit}`;
        this.NAME_BOX = CNode.create('div', {'class': 'note-name-box'});
        this.H4 = CNode.create('h4', {'textContent': this.name});
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

        this.attachEventListeners();
        return this.render();
    }

    render() {
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

    attachEventListeners() {
        this.EDIT.addEventListener('click', () => {this.toggleEditableFolderName()});
        this.CONFIRM.addEventListener('click', () => {this.updateNote()});
        this.CANCEL.addEventListener('click', () => {this.toggleEditableFolderName()});
        this.DELETE.addEventListener('click', () => {this.view.renderDeleteContainer(this.id, this.name)});
    }

    toggleEditableFolderName() {
        // Toggle contentEditable
        this.H4.contentEditable = this.H4.contentEditable === 'true' ? 'false' : 'true';
        this.H4.style.borderColor = this.H4.style.borderColor === 'rgb(92, 125, 255)' ? 'transparent' : '#5c7dff';

        // Toggle visibility
        this.BTN_CONTAINER.style.visibility = this.BTN_CONTAINER.style.visibility === 'visible' ? 'hidden' : 'visible';
    }

    async updateNote() {
        this.view.updateNote(this.id, this.H4.textContent, this.content, this.bookmark);
        this.toggleEditableFolderName();
    }
}