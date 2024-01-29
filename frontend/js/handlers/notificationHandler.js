export class UserFeedbackHandler {
    constructor() {
        this._folderList = document.querySelector('.list-content-folders');
        this._noteList = document.querySelector('.list-content-notes');
    }

    noFolders(message) {
        this._folderList.appendChild(message);
    }

    noNotes(message) {
        this._noteList.appendChild(message);
    }

    removeNoNotesMessage() {
        this._noteList.removeChild(this._noteList.firstChild);
    }

    removeNoFoldersMessage() {
        this._folderList.removeChild(this._folderList.firstChild);
    }
}