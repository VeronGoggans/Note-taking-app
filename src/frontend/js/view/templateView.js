import { Template } from "../components/template.js"; 
import {AnimationHandler} from "../handlers/animation/animationHandler.js";


export class TemplateView {
    constructor() {
        this.#initializeDomElements();
    }

    renderTemplatesCards(templates) {
        if (templates.length > 0) {
            const contentFragment = document.createDocumentFragment();

            for(let i = 0; i < templates.length; i++) {
                const templateCard = this.#template(templates[i]);
                contentFragment.appendChild(templateCard);
                AnimationHandler.fadeInFromBottom(templateCard);
            } 
            this._content.appendChild(contentFragment)
        }
    }


    #template(template) {
        return new Template(template, this)
    }

    #initializeDomElements() {
        this._content = document.querySelector('.content-view');
        this._list = document.querySelector('.list-content-notes');
    }
}