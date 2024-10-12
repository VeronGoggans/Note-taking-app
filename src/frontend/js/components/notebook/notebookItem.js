import { CNode } from "../../util/CNode";
import { notebookItemIcons } from "../../constants/constants";

export class NotebookItem {
    constructor(view, notebookItem, controller, dialog) {
        this.view = view 
        this.controller = controller;
        this.dialog = dialog;
        this.notebookItem = notebookItem;
        this.linkedEntityId = notebookItem.linked_entity_id;

        this.#initElements();
        this.#eventListeners();
        return this.#render();
    }


    #initElements() {
        this.HOST = CNode.create('div', { 'class': 'notebook-item', 'id': this.notebookItem.id});
        this.ITEM_NAME = CNode.create('h3', {'textContent': this.notebookItem.linked_entity_name});
        this.ICON = CNode.create('i', {'class': notebookItemIcons[this.notebookItem.linked_entity_type]});
    }


    #render() {
        this.HOST.append(this.ICON, this.TASK_NAME);
        return this.HOST
    }

    #eventListeners() {
    }
}