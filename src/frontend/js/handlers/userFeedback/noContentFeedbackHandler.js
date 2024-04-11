
export class NoContentFeedbackHandler {
    constructor(view) {
        this._folderList = document.querySelector('.list-content-folders');
        this._noteList = document.querySelector('.list-content-notes');
        this.view = view;
    }

    /**
     * Appends a message to the folder list in the UI.
     * @param {Element} message - The message element to be appended.
     */
    noFolders(message) {
        this._folderList.appendChild(message);
    }

    /**
     * Appends a message to the note list in the UI.
     * @param {Element} message - The message element to be appended.
     */
    noNotes(message) {
        this._noteList.appendChild(message);
        this.emptyNotification();
    }

    /**
     * Checks if the folder list is empty and triggers a notification if it is.
     */
    emptyNotification() {
        if (this._folderList.children.length === 1 && 
            this._folderList.children[0].classList.contains('list-view-no-folder')) {
            this.view.pushNotification('Empty');
        }
    }

    /**
     * Removes the "no notes" message from the note list.
     */
    removeNoNotesMessage() {
        this._noteList.removeChild(this._noteList.firstChild);
    }

    /**
     * Removes the "no folders" message from the folder list.
     */
    removeNoFoldersMessage() {
        this._folderList.removeChild(this._folderList.firstChild);
    }

}