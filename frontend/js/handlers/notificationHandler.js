
export class UserFeedbackHandler {
    constructor() {
        this._contentNotificationContainer = document.querySelector('.content-view-notification-layer');
        this._folderList = document.querySelector('.list-content-folders');
        this._noteList = document.querySelector('.list-content-notes');
    }

    noFolders(message) {
        this._folderList.appendChild(message);
    }

    noNotes(message) {
        this._noteList.appendChild(message);
        if (this._folderList.children.length === 1) {
            if (this._folderList.children[0].classList.contains('list-view-no-folder')) {
                // this.showNoContentMessage();
            }
        }
    }

    showNoContentMessage() {
        this._contentNotificationContainer.insertBefore(new NoContentMessage(), this._contentNotificationContainer.firstChild);
    }

    removeNoContentMessage() {
        this._contentNotificationContainer.removeChild(this._contentNotificationContainer.firstChild);
    }

    removeNoNotesMessage() {
        this._noteList.removeChild(this._noteList.firstChild);
        if (this._contentNotificationContainer.children.length > 0) {
            this.removeNoContentMessage();
        }
    }

    removeNoFoldersMessage() {
        this._folderList.removeChild(this._folderList.firstChild);
        if (this._contentNotificationContainer.children.length > 0) {
            this.removeNoContentMessage();
        }
    }
}