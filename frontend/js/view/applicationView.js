import { NewFolderContainer } from '../components/newFolderContainer.js';


export class ApplicationView {
    constructor(applicationController) {
        this.applicationController = applicationController;
        this.createNoteButton = document.querySelector('.create-note-btn');
        this.createFolderButton = document.querySelector('.create-folder-btn');
        this.backButton = document.querySelector('.exit-folder-btn');
        this.homeButton = document.querySelector('.home-screen-btn');
        this.dialog = document.querySelector('.dialog');
        this._content = document.querySelector('.content-view');
        this._list = document.querySelector('.list-content');

        this.attachEventListeners();
    }

    attachEventListeners() {
        this.backButton.addEventListener('click', () => {this.back()});
        this.homeButton.addEventListener('click', () => {this.home()});
        this.createFolderButton.addEventListener('click', () => {this.renderNewFolderContainer()});
        this.dialog.addEventListener('click', (event) => {if (!event.target.closest('.new-folder-container') && !event.target.closest('.delete-folder-container')) this.removeDialog()})
    }

    renderNewFolderContainer() {
        this.dialog.appendChild(new NewFolderContainer(this));
        this.renderDialog();
    }

    renderDialog() {
        this.dialog.style.visibility = 'visible';
        this.dialog.style.top = '0%';
    }

    removeDialog() {
        this.dialog.style.visibility = 'hidden';
        this.dialog.style.top = '100%';
        const CHILD = this.dialog.firstChild;
        this.dialog.removeChild(CHILD);
    }

    /**
     * Removes folders from the UI.
     *
     * This method removes all the child elements from the content html div and list-view html div
     *
     * @returns {void}
     */
    removeContent() {
        const CONTENT = this._content;
        const LIST = this._list;
        while (CONTENT.firstChild) CONTENT.removeChild(CONTENT.firstChild);
        while (LIST.firstChild) LIST.removeChild(LIST.firstChild);
    }

    // Communication with the application controller

    home() {
        this.removeContent();
        this.applicationController.navigateToHomescreen();
    }

    back() {
        this.removeContent();
        this.applicationController.navigateOutofFolder();
    }

    async handleAddFolderButtonClick(name) {
        await this.applicationController.handleAddFolder(name);
    }

    // aysnc handle
}