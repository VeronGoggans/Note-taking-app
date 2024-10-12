import { NotebookCard } from "../components/notebook/notebook.js";
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

    renderAll(notebooks) {
        const contentFragment = document.createDocumentFragment();

        for (let i = 0; i < notebooks.length; i++) {
            const notebook = new NotebookCard(this, notebooks[i], this.controller, this.dialog);
            AnimationHandler.fadeInFromBottom(notebook)
            contentFragment.appendChild(notebook);
        }
        this._notebooksList.append(contentFragment);
    }

    renderOne(notebook) {
        const notebookCard = new NotebookCard(this, notebook, this.controller, this.dialog)
        AnimationHandler.fadeInFromBottom(notebookCard);
        this._notebooksList.appendChild(notebookCard);
        this.closeDialog();
    }


    renderDelete(notebookId) {
        const notebooks = this._notebooksList.children 
        
        for (let i = 0; i < notebooks.length; i++) {
            if (notebooks[i].id === notebookId) {
                AnimationHandler.fadeOutCard(notebooks[i])
                this.closeDialog();
            }
        }
    }

    renderUpdate(notebook) {
        const notebooks = this._notebooksList.children; 

        for (let i = 0; i < notebooks.length; i++) {
            if (notebooks[i].id === notebook.id) {    

                notebooks[i].querySelector('span').textContent = notebook.name;
                this.closeDialog()
            }
        }
    }

    async handlenotebookCardClick(notebookId) {
        const notebook = await this.controller.getById(notebookId)
        this.applicationController.initView('task', 
            {
                notebook: notebook,
                previousView: 'notebooks', 
            }
        );
    }

    #eventListeners() {
        this._addNewnotebookButton.addEventListener('click', () => {
            this.dialog.renderNewCollectionModal(this.controller, 'notebook');
        });
    }

    #initElements() {
        this.viewElement = document.querySelector('.notebook-home-view');
        this._notebooksList = document.querySelector('.notebook-cards');
        this._addNewnotebookButton = document.querySelector('.add-notebook-btn');  
    }
}