import { CNode } from "../../util/CNode.js";
import { dialogEvent } from "../../util/dialog.js";
import { editFolderModalTemplate } from "../../constants/modalTemplates.js";
 

export class EditFolderModal {
    constructor(controller, folder) {
        this.folder = folder;
        this.controller = controller;
        this.action = 'add';
        this.preferedFolderColor = null;

        this.#initElements();
        this.#eventListeners();
        return this.HOST
    }


    #initElements() {
        this.HOST = CNode.create('div', {'class': 'edit-folder-modal'});
        this.HOST.innerHTML = editFolderModalTemplate;
        this.colorsArray = this.HOST.querySelectorAll('.folder-color-options div');
        if (this.folder !== null) {
            this.#loadFolder();
            return
        }
        this.#showActiveFolderColor('rgb(255, 255, 255)');
    }

    #loadFolder() {
        this.HOST.querySelector('h2').textContent = 'Edit folder';
        this.HOST.querySelector('.save-btn').textContent = 'Save changes';
        this.HOST.querySelector('input').value = this.folder.name;
        this.action = 'update';
        this.#showActiveFolderColor(this.folder.color);
    }


    #eventListeners() {
        this.colorsArray.forEach(colorElement => {
            const color = colorElement.style.backgroundColor;
            colorElement.addEventListener('click', () => {this.#showActiveFolderColor(color)});
        });

        this.HOST.querySelector('.save-btn').addEventListener('click', () => {
            if (this.action === 'update') {
                this.controller.update({
                    'id': this.folder.id,
                    'name': this.HOST.querySelector('input').value,
                    'color': this.preferedFolderColor
                })    
            }
            else if (this.action === 'add') {
                this.controller.add({
                    'name': this.HOST.querySelector('input').value || 'Untitled',
                    'color': this.preferedFolderColor
                })
            }
            dialogEvent(this.HOST, 'close');
        });

        this.HOST.querySelector('.cancel-btn').addEventListener('click', () => {
            dialogEvent(this.HOST, 'close');
        });
    }
  

    #showActiveFolderColor(color) {
        for (let i = 0; i < this.colorsArray.length; i++) {
            const colorDiv = this.colorsArray[i];

            if (colorDiv.style.backgroundColor !== color) {
                colorDiv.classList.remove('selected-folder-color');                
                continue
            }
            this.preferedFolderColor = color;
            colorDiv.classList.add('selected-folder-color');
        }
    }  
}