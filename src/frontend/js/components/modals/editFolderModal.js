import { CNode } from "../../util/CNode.js";


export class EditFolderModal {
    constructor(folder, view, dialog) {
        this.folder = folder;
        this.view = view;
        this.dialog = dialog;
        this.preferedFolderColor = null;
        this.HOST = CNode.create('div', {'class': 'edit-folder-modal'});
        this.HOST.innerHTML = `
            <h2>Edit folder</h2>
            <div class="folder-settings">
                <span id="title">Folder name</span>
                <p>You can change the name of this folder below</p>
                <input type="text" placeholder="Untitled" spellcheck="false">

                <span id="title">Folder theme</span>
                <p>Select a theme for this folder</p>
                <div class="folder-color-options">
                    <div style="background-color: rgb(121, 144, 255)"></div>
                    <div style="background-color: rgb(169, 215, 255)"></div>
                    <div style="background-color: rgb(217, 237, 255)"></div>
                    <div style="background-color: rgb(158, 213, 197)"></div>
                    <div style="background-color: rgb(203, 255, 197)"></div>
                    <div style="background-color: rgb(173, 255, 164)"></div>
                    <div style="background-color: rgb(142, 122, 181)"></div>
                    <div style="background-color: rgb(223, 193, 255)"></div>
                    <div style="background-color: rgb(255, 163, 163)"></div>
                    <div style="background-color: rgb(255, 197, 197)"></div>
                    <div style="background-color: rgb(255, 182, 116)"></div>
                    <div style="background-color: rgb(255, 224, 158)"></div>
                    <div class="original-folder-color" style="background-color: #fff"></div>
                </div>
                <div class="buttons-container">
                    <button class="cancel-btn">Cancel</button>
                    <button class="save-btn">Save changes</button>
                </div>
            </div>
        `
        
        this.colorsArray = this.HOST.querySelectorAll('.folder-color-options div');
        
        this.#attachEventListeners();
        this.#showActiveFolderColor(folder.color);
        this.HOST.querySelector('input').value = folder.name
        return this.HOST
    }


    #attachEventListeners() {
        this.colorsArray.forEach(colorElement => {
            const color = colorElement.style.backgroundColor;
            colorElement.addEventListener('click', () => {this.#showActiveFolderColor(color)});
        });

        this.HOST.querySelector('.save-btn').addEventListener('click', () => {
            this.view.updateObject({
            'id': this.folder.id,
            'name': this.HOST.querySelector('input').value,
            'color': this.preferedFolderColor})
            this.dialog.hide();
        });

        this.HOST.querySelector('.cancel-btn').addEventListener('click', () => {this.dialog.hide()});
    }

    #showActiveFolderColor(color) {
        for (let i = 0; i < this.colorsArray.length; i++) {
            const colorDiv = this.colorsArray[i];
            if (this.colorsArray[i].style.backgroundColor !== color) {
                colorDiv.classList.remove('selected-folder-color');
                continue
            }
            this.preferedFolderColor = color;
            colorDiv.classList.add('selected-folder-color');
        }
    }  
}