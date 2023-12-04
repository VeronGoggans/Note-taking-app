import { CNode } from '../../util/CNode.js';

export class Folder {
    constructor() {
    }

    static render(id, name) {
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

        return HOST
    }
}