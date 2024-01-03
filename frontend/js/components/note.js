import { CNode } from "../util/CNode.js";

export class Note {
    constructor(id, name, bookmark, content, created, lastEdit, view) {
        this.id = id;
        this.name = name;
        this.bookmark = bookmark;
        this.content = content;
        this.created = this.dateFormat(created);
        this.lastEdit = this.dateFormat(lastEdit);
        this.view = view;

        // creating HTML elements.
        this.HOST = CNode.create('div', {'class': 'note', 'id': this.id});
        this.HOST.dataset.info = `${this.created}--${this.lastEdit}`;
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
        this.CONTENT_BOX.addEventListener('click', () => {this.view.handleNoteCardClick(this.id, this.created)});
    }

    toggleEditableFolderName() {
        // Toggle contentEditable
        this.H4.contentEditable = this.H4.contentEditable === 'true' ? 'false' : 'true';
        this.H4.style.borderColor = this.H4.style.borderColor === 'rgb(92, 125, 255)' ? 'transparent' : '#5c7dff';

        // Toggle visibility
        this.BTN_CONTAINER.style.visibility = this.BTN_CONTAINER.style.visibility === 'visible' ? 'hidden' : 'visible';
    }

    /**
     * This method formats a date string given from the backend.
     * 01/01/2024 turns into 1 Jan 2024
     * 25/12/2023 turns into 25 Dec 2023
     * 
     * @param {String} date A date string. Could be both the creation date or last edit date.
     * @returns A formatted date string.
     */
    dateFormat(date) {
        let dateParts = date.split('/');
        const MONTH = dateParts[1];
        const DAY = dateParts[0];
        const DAY_PARTS = DAY.split('');
        if (DAY_PARTS[0] === '0') dateParts[0] = DAY_PARTS[1];

        let monthFormatted = '';
        if (MONTH === '01') monthFormatted = 'Jan'
        if (MONTH === '02') monthFormatted = 'Feb'
        if (MONTH === '03') monthFormatted = 'Mar'
        if (MONTH === '04') monthFormatted = 'Apr'
        if (MONTH === '05') monthFormatted = 'Mei'
        if (MONTH === '06') monthFormatted = 'Jun'
        if (MONTH === '07') monthFormatted = 'Jul'
        if (MONTH === '08') monthFormatted = 'Aug'
        if (MONTH === '09') monthFormatted = 'Sep'
        if (MONTH === '10') monthFormatted = 'Okt'
        if (MONTH === '11') monthFormatted = 'Nov'
        if (MONTH === '12') monthFormatted = 'Dec'
        dateParts[1] = monthFormatted;
        const NEW_DATE_STRING = dateParts.join(' ');
        return NEW_DATE_STRING
    }

    /**
     * This method updates a note
     * 
     * Note: That this method can only update the following.
     * 1. Name.
     * 2. Bookmark. 
     */
    async updateNote() {
        this.view.updateNote(this.id, this.H4.textContent, this.CONTENT.innerHTML, this.bookmark);
        this.toggleEditableFolderName();
    }
}