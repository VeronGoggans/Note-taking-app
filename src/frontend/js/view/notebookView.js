import { AnimationHandler } from "../handlers/animation/animationHandler.js";
import { BaseView } from "./baseView.js";


export class NotebookView extends BaseView {
    constructor(controller, applicationController) {
        super(controller);
        this.controller = controller;
        this.applicationController = applicationController;
        this.#initElements();
        this.#eventListeners();
        AnimationHandler.fadeInFromBottom(this.viewElement);
    }


    renderNotebook(notebook) {
        document.querySelector('h1').textContent = notebook.name;
        document.querySelector('.description-block-content').textContent = notebook.description;
        this.notebookId = notebook.id;
    }


    renderAll(notebookItems) {
        const contentFragment = document.createDocumentFragment();

        for (let i = 0; i < notebookItems.length; i++) {
            const notebookItem = this.#notebookItem(notebookItems[i]);
            AnimationHandler.fadeInFromBottom(notebookItem);
            contentFragment.appendChild(notebookItem);
        }
        this._notebooksList.append(contentFragment);
    }


    renderOne(notebook) {
        const notebookCard = createListItemType1(notebook, 'notebook')
        AnimationHandler.fadeInFromBottom(notebookCard);
        this._notebooksList.appendChild(notebookCard);
    }


    renderDelete(notebookId) {
        const notebooks = this._notebooksList.children 
        
        for (let i = 0; i < notebooks.length; i++) {
            if (notebooks[i].id == notebookId) {
                AnimationHandler.fadeOutCard(notebooks[i])
            }
        }
    }

    
    #notebookItem(notebookItem) {
        const notebookItemCard = document.createElement('notebook-item-card');
        notebookItemCard.setAttribute('notebookItem', notebookItem);
        return notebookItemCard
    }


    #eventListeners() {
        this._notebookItemsList.addEventListener('NotebookItemCardClick', (event) => {
            const { notebookItem } = event.detail;
            this.applicationController.initView('notebook', 
                {
                    notebookItem: notebookItem,
                    previousView: 'notebookHomeView', 
                }
            );
        })

        this._notebookItemsList.addEventListener('DeleteListItem', (event) => {
            const { listItem } = event.detail
            this.renderDeleteModal(listItem.id, listItem.name);
        })

        this.viewElement.addEventListener('PreviousViewButtonClick', () => {this.controller.loadPreviousView()});
    }

    #initElements() {
        this.viewElement = document.querySelector('.notebook-view');
        this._notebookItemsList = document.querySelector('.notebook-items');
    }
}