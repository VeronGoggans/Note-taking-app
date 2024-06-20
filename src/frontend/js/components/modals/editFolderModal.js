import { CNode } from "../../util/CNode.js";
import { folderColorNames } from "../../constants/constants.js";


export class EditFolderModal {
    constructor(folder, view, dialog) {
        this.folder = folder;
        this.view = view;
        this.dialog = dialog;
        this.preferedFolderColor = null;
        this.#initializeElements();
        this.#attachEventListeners();
        this.#showActiveFolderColor(folder.color);
        return this.#render();
    }

    #initializeElements() {
        this.MODAL = CNode.create('div', {'class': 'edit-folder-modal'});
        this.H2 =CNode.create('h2', {'textContent': 'Folder settings'})
        this.SETTINGS_CONTAINER = CNode.create('div', {'class': 'folder-settings'});
        this.INPUT = CNode.create('input', {'placeholder': 'Untitled', 'spellcheck': false});
        this.INPUT.value = this.folder.name;
        this.NAME_SPAN = CNode.create('span', {'textContent': 'Folder name', 'id': 'title'});
        this.COLOR_SPAN = CNode.create('span', {'textContent': 'Folder color', 'id': 'title'});
        this.NAME_P = CNode.create('p', {'textContent': 'You can change the name of your folder below.'});
        this.COLOR_P = CNode.create('p', {'textContent': 'Select a folder background color: '});
        this.ACTIVE_COLOR_SPAN = CNode.create('span', {'textContent': '(Original)'});
        this.HR = CNode.create('hr', {});
        this.COLORS_CONTAINER = CNode.create('div', {'class': 'folder-color-options'});
        this.BLUE = CNode.create('div', {'style': 'background-color: rgb(169, 215, 255);'});
        this.SALMON_PINK = CNode.create('div', {'style': 'background-color: rgb(238, 165, 166);'});
        this.LAVENDER = CNode.create('div', {'style': 'background-color: rgb(223, 193, 255);'});
        this.LIGHT_GREEN = CNode.create('div', {'style': 'background-color: rgb(159, 251, 149);'});
        this.PEACH = CNode.create('div', {'style': 'background-color: rgb(255, 224, 158);'});
        this.PINK_LAVENDER = CNode.create('div', {'style': 'background-color: rgb(225, 175, 209);'});
        this.BLUE_VIOLET = CNode.create('div', {'style': 'background-color: rgb(142, 122, 181);'});
        this.SUNSET_ORANGE = CNode.create('div', {'style': 'background-color: rgb(255, 191, 169);'});
        this.TURQUOISE = CNode.create('div', {'style': 'background-color: rgb(158, 213, 197);'});
        this.ORIGINAL_COLOR = CNode.create('div', {'class': 'original-folder-color', 'style': 'background-color: rgb(255, 255, 255);'});
        this.BUTTONS_CONTAINER = CNode.create('div', {'class': 'buttons-container'});
        this.CANCEL = CNode.create('button', {'textContent': 'Cancel', 'class': 'cancel-folder-customization-btn'});
        this.SAVE = CNode.create('button', {'textContent': 'Save preferences', 'class': 'save-folder-customisations-btn'});
        this.colorsArray = [this.BLUE, this.LAVENDER, this.LIGHT_GREEN, this.PEACH, this.PINK_LAVENDER,
            this.BLUE_VIOLET, this.SALMON_PINK, this.TURQUOISE, this.SUNSET_ORANGE, this.ORIGINAL_COLOR
        ]
    }   


    #render() {
        this.COLOR_P.appendChild(this.ACTIVE_COLOR_SPAN);
        this.SETTINGS_CONTAINER.append(this.NAME_SPAN, this.NAME_P, this.INPUT, this.HR, this.COLOR_SPAN,
            this.COLOR_P, this.COLORS_CONTAINER
        );
        this.COLORS_CONTAINER.append(this.BLUE, this.LAVENDER, this.LIGHT_GREEN, this.PEACH,
            this.PINK_LAVENDER, this.BLUE_VIOLET, this.SALMON_PINK, this.TURQUOISE, this.SUNSET_ORANGE,
            this.ORIGINAL_COLOR
        );
        this.BUTTONS_CONTAINER.append(this.CANCEL, this.SAVE);
        this.MODAL.append(this.H2, this.SETTINGS_CONTAINER, this.BUTTONS_CONTAINER);
        return this.MODAL
    }

    #attachEventListeners() {
        this.colorsArray.forEach(colorElement => {
            const color = colorElement.style.backgroundColor;
            colorElement.addEventListener('click', () => {this.#showActiveFolderColor(color)});
        });
        this.SAVE.addEventListener('click', () => {this.view.updateFolder(
            this.folder.id, this.INPUT.value, this.preferedFolderColor)
            this.dialog.hide();
        });
        this.CANCEL.addEventListener('click', () => {this.dialog.hide()});
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

        // Updating the active color span
        const colorName = folderColorNames[color];
        this.ACTIVE_COLOR_SPAN.textContent = `(${colorName})`;
    }  
}