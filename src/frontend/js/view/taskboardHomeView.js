import { AnimationHandler } from "../handlers/animation/animationHandler.js";
import { createListItemType1 } from "../util/ui/components.js";
import { BaseView } from "./baseView.js";


export class TaskboardHomeView extends BaseView {
    constructor(controller, applicationController) {
        super(controller);
        this.controller = controller;
        this.applicationController = applicationController;
        this.#initElements();
        this.#eventListeners();
        AnimationHandler.fadeInFromBottom(this.viewElement);
    }


    renderAll(taskboards) {
        const contentFragment = document.createDocumentFragment();

        for (let i = 0; i < taskboards.length; i++) {
            const taskboard = createListItemType1(taskboards[i], 'taskboard');
            AnimationHandler.fadeInFromBottom(taskboard)
            contentFragment.appendChild(taskboard);
        }
        this._taskBoardsList.append(contentFragment);
    }


    renderOne(taskboard) {
        const taskboardCard = createListItemType1(taskboard, 'taskboard');
        AnimationHandler.fadeInFromBottom(taskboardCard);
        this._taskBoardsList.appendChild(taskboardCard);
    }


    renderDelete(taskboardId) {
        const taskboards = this._taskBoardsList.children 
        
        for (let i = 0; i < taskboards.length; i++) {
            if (taskboards[i].id == taskboardId) {
                AnimationHandler.fadeOutCard(taskboards[i])
            }
        }
    }


    renderUpdate(taskboard) {
        const taskboards = this._taskBoardsList.children; 

        for (let i = 0; i < taskboards.length; i++) {
            if (taskboards[i].id == taskboard.id) {    
                taskboards[i].setAttribute('list-item', JSON.stringify(taskboard));
            }
        }
    }

    
    #eventListeners() {
        this._addNewTaskboardButton.addEventListener('click', () => {
            this.dialog.renderNewCollectionModal(this.controller, 'taskboard')
        });

        this._taskBoardsList.addEventListener('ListItemCardClick', (event) => {
            const { listItem } = event.detail;        
            this.applicationController.initView('task', 
                {
                    taskboard: listItem,
                    previousView: 'taskboardHome', 
                }
            )
        })

        this._taskBoardsList.addEventListener('DeleteListItem', (event) => {
            const { listItem } = event.detail
            this.renderDeleteModal(listItem.id, listItem.name);
        })

        this._taskBoardsList.addEventListener('UpdateListItem', (event) => {
            const { listItem, listItemType } = event.detail
            this.dialog.renderNewCollectionModal(this.controller, listItemType, listItem)
        })
    }

    #initElements() {
        this.viewElement = document.querySelector('.task-board-home-view');
        this._taskBoardsList = document.querySelector('.task-board-cards');
        this._addNewTaskboardButton = document.querySelector('.add-task-board-btn');  
    }
}