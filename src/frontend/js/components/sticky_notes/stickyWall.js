import { CNode } from "../../util/CNode.js";

export class StickyWallCard {
    constructor(view, stickyWall, controller, dialog) {
        this.view = view;
        this.controller = controller;
        this.dialog = dialog;
        this.stickyWall = stickyWall;

        this.#initElements();
        this.#eventListeners();
        return this.#render();
    }


    #initElements() {
        this.HOST = CNode.create('div', { 'class': 'sticky-wall-card', 'id': this.stickyWall.id});
        this.STICKY_WALL_NAME = CNode.create('span', {'textContent': this.stickyWall.name});
        this.DIV = document.createElement('div');
        this.DELETE_BUTTON = CNode.create('button', {'innerHTML': '<i class="fa-solid fa-trash"></i>'});
        this.EDIT_BUTTON = CNode.create('button', {'innerHTML': '<i class="fa-solid fa-pen"></i>'});
    }

    #render() {
        this.DIV.append(this.EDIT_BUTTON, this.DELETE_BUTTON);
        this.HOST.append(this.STICKY_WALL_NAME, this.DIV);
        return this.HOST
    }

    #eventListeners() {
        this.STICKY_WALL_NAME.addEventListener('click', () => {this.view.handleStickyWallCardClick(this.stickyWall.id)})
        this.DELETE_BUTTON.addEventListener('click', () => {this.view.renderDeleteModal(this.stickyWall.id, this.stickyWall.name)})
        this.EDIT_BUTTON.addEventListener('click', () => {this.dialog.renderNewCollectionModal(this.controller, 'stickyWall', this.stickyWall)})
    }
}