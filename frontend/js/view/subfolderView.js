import { Folder } from "../components/folder.js";
import { ListFolder } from "../components/listFolder.js";

export class SubfolderView {
    constructor(controller) {
        this.controller = controller;
        this._content = document.querySelector('.content-view');
        this._list = document.querySelector('.list-content');
    }

    renderListViewSubfolders(subfolders) {
        for (let i = 0; i < subfolders.length; i++) {
            const ID = subfolders[i].id;
            const NAME = subfolders[i].name;
            const SUBFOLDER_CARD = this.listSubfolder(ID, NAME);
            this._list.appendChild(SUBFOLDER_CARD);
        }
    }

    renderSubfolders(subfolders) {
        for (let i = 0; i < subfolders.length; i++) {
            const ID = subfolders[i].id;
            const NAME = subfolders[i].name;
            const SUBFOLDER_CARD = this.subfolder(ID, NAME);
            this._content.appendChild(SUBFOLDER_CARD);
        }
    }

    listSubfolder(id, name) {
        return new ListFolder(id, name, this);
    }

    subfolder(id, name) {
        return new Folder(id, name, this);
    }

}