import { CNode } from '../../util/CNode.js';

export class ListFolder {
    constructor() {

    }

    static render(id, name) {
        const HOST = CNode.create('div', {'class': 'list-view-folder', 'id': id});
        const SPAN = CNode.create('span', {'class': 'folder-name', 'textContent': name});
        
        // Assemble elements.
        HOST.appendChild(SPAN);

        return HOST;
    }
}