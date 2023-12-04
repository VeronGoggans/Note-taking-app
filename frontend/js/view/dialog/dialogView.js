export class DialogView {
    constructor() {
        this._dialog = document.querySelector('.dialog');
        this._createFolderBtn = document.querySelector('.create-folder-btn');
        this._dialog.addEventListener('click', () => this.removeDialog());
        this._createFolderBtn.addEventListener('click', () => this.renderDialog());
    }


    renderDialog() {
        this._dialog.style.visibility = 'visible';
        this._dialog.style.top = '0%';
    }

    removeDialog() {
        this._dialog.style.visibility = 'hidden';
        this._dialog.style.top = '100%';
    }
 }