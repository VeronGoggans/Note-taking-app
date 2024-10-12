import { StickyWallCard } from "../components/sticky_notes/stickyWall.js";
import { StickyWallObjectArray } from "../util/array.js";
import { AnimationHandler } from "../handlers/animation/animationHandler.js";
import { BaseView } from "./baseView.js";

export class StickyWallHomeView extends BaseView {
    constructor(controller, applicationController) {
        super(controller);
        this.controller = controller;
        this.applicationController = applicationController;
        this.stickyWallObjects = new StickyWallObjectArray();
        this.#initElements();
        this.#eventListeners();
        AnimationHandler.fadeInFromBottom(this.viewElement);
    }

    renderAll(stickyWalls) {
        const contentFragment = document.createDocumentFragment();

        for (let i = 0; i < stickyWalls.length; i++) {
            const stickyWall = this.#stickyWall(stickyWalls[i]);
            AnimationHandler.fadeInFromBottom(stickyWall)
            contentFragment.appendChild(stickyWall);
        }
        this._stickyWallsList.append(contentFragment);
    }

    renderOne(stickyWall) {
        const stickyWallCard = this.#stickyWall(stickyWall);
        AnimationHandler.fadeInFromBottom(stickyWallCard);
        this._stickyWallsList.appendChild(stickyWallCard);
        this.closeDialog();
    }


    renderDelete(stickyWallId) {
        const stickyWalls = this._stickyWallsList.children 
        
        for (let i = 0; i < stickyWalls.length; i++) {
            if (stickyWalls[i].id == stickyWallId) {
                AnimationHandler.fadeOutCard(stickyWalls[i])
                this.stickyWallObjects.remove(stickyWallId);
                this.closeDialog();
            }
        }
    }

    renderUpdate(stickyWall) {
        const stickyWalls = this._stickyWallsList.children; 

        for (let i = 0; i < stickyWalls.length; i++) {
            if (stickyWalls[i].id == stickyWall.id) {    

                stickyWalls[i].querySelector('span').textContent = stickyWall.name;
                this.stickyWallObjects.update(stickyWall);
                this.closeDialog()
            }
        }
    }

    getstickyWallObject(stickyWallId) {
        return this.stickyWallObjects.get(stickyWallId);
    }

    async handleStickyWallCardClick(stickyWallId) {
        const stickyWall = await this.controller.getById(stickyWallId)
        this.applicationController.initView('stickyWall', 
            {
                stickyWall: stickyWall,
                previousView: 'stickyWallHome', 
            }
        );
    }

    #stickyWall(stickyWall) {
        this.stickyWallObjects.add(stickyWall);
        return new StickyWallCard(this, stickyWall, this.controller, this.dialog);
    }

    #eventListeners() {
        this._addNewstickyWallButton.addEventListener('click', () => {
            this.dialog.renderNewCollectionModal(this.controller, 'stickyWall');
        });
    }

    #initElements() {
        this.viewElement = document.querySelector('.sticky-home-view');
        this._stickyWallsList = document.querySelector('.sticky-wall-cards');
        this._addNewstickyWallButton = document.querySelector('.add-sticky-wall-btn');  
    }
}