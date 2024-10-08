import { folderColors } from "../constants/constants.js";
import { CNode } from "../util/CNode.js";
import { formatName } from "../util/formatters.js";
import { addDraggImage } from "../util/ui.js";

export class Folder {
    constructor(folder, view) {
        this.id = folder.id;
        this.name = folder.name;
        this.color = folder.color;
        this.view = view;

        this.#initElements();
        this.applyColor(this.color);
        this.#eventListeners();
        return this.#render();
    }

    #initElements() {
        // creating HTML elements.
        this.HOST = CNode.create('div', {'class': 'folder', 'id': this.id, 'draggable': true});
        this.NAME_BOX = CNode.create('div', {'class': 'folder-name-box'});
        this.H4 = CNode.create('h4', {'textContent': formatName(this.name)});
        this.LOGO = CNode.create('div', {'class': 'folder-logo'});
        this.ICON = CNode.create('i', {'class': 'bi bi-folder'});
        this.UTIL_BAR = CNode.create('div', {'class': 'folder-util-bar'});
        this.COLOR_ICON = CNode.create('i', {'class': 'fa-solid fa-palette'});
        this.EDIT_ICON = CNode.create('i', {'class': 'fa-solid fa-pen'});
        this.DELETE_ICON = CNode.create('i', {'class': 'fa-solid fa-trash'});
    }

    #render() {
        this.NAME_BOX.append(this.H4);
        this.LOGO.appendChild(this.ICON);
        this.UTIL_BAR.append(this.EDIT_ICON, this.DELETE_ICON);
        this.HOST.append(this.NAME_BOX, this.LOGO, this.UTIL_BAR);
        return this.HOST;
    }

    /**
     * 
     * This method is called when the folder gets rendered,
     * to check if the folder already has a custom color.
     *  
     * @param {String} color 
     */
    applyColor(color) {
        const folderColor = folderColors[color];
        const colors = Array.from(this.HOST.classList);

        if (this.HOST.classList.length > 3) {
            for (let i = 0; i < colors.length; i++) {
                if (colors[i].includes('color')) {
                    this.HOST.classList.remove(colors[i]);
                    this.HOST.classList.add(folderColor);
                }
            }        
        } 
        else this.HOST.classList.add(folderColor);
    }

    #eventListeners() {
        this.EDIT_ICON.addEventListener('click', () => {this._toggleEditableFolderName()});
        this.DELETE_ICON.addEventListener('click', () => {this.view.renderDeleteModal(this.id, this.name)});
        this.LOGO.addEventListener('click', () => { this.view.handleFolderCardClick(this.id, this.H4.textContent)});

        // Drag and drop event listeners below.
        this.HOST.addEventListener('dragstart', (event) => {
            addDraggImage(event, this.HOST, 'folder')
            event.dataTransfer.setData('text/plain', `{"draggedItem": "folder", "draggedCardId": "${this.id}"}`)
        }); 

        // Remove the drag style when done dragging
        this.HOST.addEventListener('dragend', () => {this.HOST.classList.remove('dragging')})

        this.HOST.addEventListener('dragover', (event) => {
            event.preventDefault();
            this.HOST.classList.add('hovered')
        })

        this.HOST.addEventListener('dragleave', (event) => {
            event.preventDefault();
            this.HOST.classList.remove('hovered')
        })

        this.HOST.addEventListener('drop', (event) => {
            event.preventDefault();
            // Get the id of the element being dragged
            const droppedCardInfo = JSON.parse(event.dataTransfer.getData('text/plain'));
            const droppedCardId = droppedCardInfo.draggedCardId;
            const draggedItemType = droppedCardInfo.draggedItem;

            // CAUTION the code below is very important
            // This code will only trigger if 
            // the the droppped folder ID is not equal to the ID of the folder it lands on.
            // In other words nothing will happen if a user drops a folder on itself. 
            // != is used instead of !== because a id attribute of a html tag is a string and 
            // the id from the backend is a integer
            if (droppedCardId != this.id) {
                if (draggedItemType === 'folder') {
                    this.view.handleFolderDrop(this.id, droppedCardId)                    
                }
                if (draggedItemType === 'note') {
                    this.view.handleNoteDrop(this.id, droppedCardId)
                }
            }

            // Remove the visual feedback class
            this.HOST.classList.remove('hovered');
        });
    }


    _toggleEditableFolderName() {
        this.view.renderEditFolderModal(this.id);
    }
}


export class RecentFolder {
    constructor(folder, view) {
        this.id = folder.id;
        this.name = folder.name
        this.view = view;

        this.#initElements();
        this.#eventListeners();
        return this.#render();
    }

    #initElements() {
        this.HOST = CNode.create('div', {'class': 'recent-folder', 'id': this.id});
        this.ICON = CNode.create('i', {'class': 'bi bi-folder-fill'});
        this.PARAGRAPH = CNode.create('p', {'textContent': this.name});
    }

    #render() {
        this.HOST.append(this.ICON, this.PARAGRAPH);
        return this.HOST;
    }

    #eventListeners() {
        this.HOST.addEventListener('click', () => {this.view.handleFolderCardClick(this.id)})
    }
}