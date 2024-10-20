import { AnimationHandler } from "../handlers/animation/animationHandler.js";
import { createListItemType1 } from "../util/ui/components.js";
import { BaseView } from "./baseView.js";


export class NotebookHomeView extends BaseView {
    constructor(controller, applicationController) {
        super(controller);
        this.controller = controller;
        this.applicationController = applicationController;
        this.#initElements();
        this.#eventListeners();
        AnimationHandler.fadeInFromBottom(this.viewElement);
    }

    renderAll(notebooks) {
        const contentFragment = document.createDocumentFragment();

        for (let i = 0; i < notebooks.length; i++) {
            const notebook = createListItemType1(notebooks[i], 'notebook');
            AnimationHandler.fadeInFromBottom(notebook)
            contentFragment.appendChild(notebook);
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

    renderUpdate(notebook) {
        const notebooks = this._notebooksList.children; 

        for (let i = 0; i < notebooks.length; i++) {
            if (notebooks[i].id == notebook.id) {                    
                notebooks[i].setAttribute('list-item', JSON.stringify(notebook));
            }
        }
    }


    #eventListeners() {
        this._addNewnotebookButton.addEventListener('click', () => {
            this.dialog.renderNewCollectionModal(this.controller, 'notebook');
        });

        this._notebooksList.addEventListener('ListItemCardClick', (event) => {
            const { listItem } = event.detail;
            this.applicationController.initView('notebook', 
                {
                    notebook: listItem,
                    previousView: 'notebookHome', 
                }
            );
        })

        this._notebooksList.addEventListener('DeleteListItem', (event) => {
            const { listItem } = event.detail
            this.renderDeleteModal(listItem.id, listItem.name);
        })

        this._notebooksList.addEventListener('UpdateListItem', (event) => {
            const { listItem, listItemType } = event.detail
            this.dialog.renderNewCollectionModal(this.controller, listItemType, listItem)
        })
    }

    #initElements() {
        this.viewElement = document.querySelector('.notebook-home-view');
        this._notebooksList = document.querySelector('.notebook-cards');
        this._addNewnotebookButton = document.querySelector('.add-notebook-btn');  
    }
}