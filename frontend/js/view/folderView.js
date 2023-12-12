import { DialogView } from "./dialogView.js";
import { CNode } from '../util/CNode.js';

export class FolderView {
    constructor(folderController) {
        this.folderController = folderController;
        this.dialogView = new DialogView();
        this.backoutButton = document.querySelector('.create-note-btn');
        this.backoutButton.addEventListener('click', this.handleBackoutFolderButtonClick);
        this._content = document.querySelector('.content-view');
        this._list = document.querySelector('.list-content');
        this._cover = document.querySelector('.cover');
        this._folders = [];
    }

    renderListViewFolders(folders) {
        for (let i = 0; i < folders.length; i++) {
            // code appending a Lit element to this._list
            const ID = folders[i].id;
            const NAME = folders[i].name;
            const FOLDER_CARD = this.listFolder(ID, NAME);
            this._list.appendChild(FOLDER_CARD);
        }
    }

    renderFolders(folders) {
        for (let i = 0; i < folders.length; i++) {
            // code appending a Lit element to this._content
            const ID = folders[i].id;
            const NAME = folders[i].name;
            const FOLDER_CARD = this.folder(ID, NAME);
            this._content.appendChild(FOLDER_CARD);
        }
    }

    renderFolder(folder) {
        const ID = folder.id;
        const NAME = folder.name;
        const FOLDER_CARD = this.folder(ID, NAME);
        this._content.appendChild(FOLDER_CARD);
    }

    updateFolder(folder) {
        const ID = folder.id;
        const NEW_NAME = folder.name;
    }


    removefolder(folder) {
        const ALL_FOLDERS = this._content.children;
        const ID = folder.id;
        for (let i = 0; i < ALL_FOLDERS.length; i++) {
            if (ALL_FOLDERS[i].id === ID) this._content.removeChild(ALL_FOLDERS[i]);
        }
    }

    handleBackoutFolderButtonClick() {
        this.folderController.navigateOutOfFolder();
    }

    listFolder(id, name) {
        const HOST = CNode.create('div', {'class': 'list-view-folder', 'id': id});
        const SPAN = CNode.create('span', {'class': 'folder-name', 'textContent': name});
        
        // Assemble elements.
        HOST.appendChild(SPAN);

        return HOST;
    }

    folder(id, name) {
        const HOST = CNode.create('div', {'class': 'folder', 'id': id});
        const NAME_BOX = CNode.create('div', {'class': 'folder-name-box'});
        const H4 = CNode.create('h4', {'contentEditable': 'false', 'textContent': name});
        const LOGO = CNode.create('div', {'class': 'folder-logo'});
        const ICON = CNode.create('i', {'class': 'fa-solid fa-folder'});
        const UTIL_BAR = CNode.create('div', {'class': 'folder-util-bar'});
        const EDIT = CNode.create('button', {'id': 'edit-folder-btn'});
        const EDIT_ICON = CNode.create('i', {'class': 'fa-solid fa-pen'});
        const DELETE = CNode.create('button', {'id': 'delete-folder-btn'});
        const DELETE_ICON = CNode.create('i', {'class': 'fa-solid fa-trash'});

        // Assemble elements.
        HOST.appendChild(NAME_BOX);
        NAME_BOX.appendChild(H4);
        HOST.appendChild(LOGO);
        LOGO.appendChild(ICON);
        HOST.appendChild(UTIL_BAR);
        UTIL_BAR.appendChild(EDIT);
        EDIT.appendChild(EDIT_ICON);
        UTIL_BAR.appendChild(DELETE);
        DELETE.appendChild(DELETE_ICON);

        // Functionality
        DELETE.addEventListener('click', () => this.dialogView.renderDeleteFolderDialog(name, this.removefolder));
        HOST.addEventListener('click', () => { this.handleFolderCardClick(id)});

        this._folders.push(id);
        return HOST;
    }
    
    /**
     * Takes the user into a folder and displays the notes inside it.
     * 
     * This method is triggered when a folder card is clicked. It removes all existing folders from the screen
     * using {@link removeFolders}, and then it navigates into the specified folder, displaying its notes and subfolders
     * using {@link navigateIntoFolder}.
     * 
     * @param {string} id - The ID of the folder to navigate into.
     */
    handleFolderCardClick(id) {
        this.removeFolders();
        this.folderController.navigateIntoFolder(id);
    }

    /**
     * Removes folders from the UI and empties the internal folders array.
     *
     * This method iterates through the `_folders` array, and removes the corresponding
     * elements from both the `_list` and `_content` elements based on their IDs, and
     * finally, empties the `_folders` array.
     *
     * @memberof FolderView
     * @name removeFolders
     * @returns {void}
     */
    removeFolders() {
        for (let i = 0; i < this._folders.length; i++) {
            const ID = this._folders[i];
            const LIST_FOLDER = this._list.querySelector(`#${ID}`);
            const CONTENT_FOLDER = this._content.querySelector(`#${ID}`);
        
            LIST_FOLDER.remove();
            CONTENT_FOLDER.remove();
        }
        // Make the array empty.
        this._folders.splice(0, this._folders.length);
    }
}