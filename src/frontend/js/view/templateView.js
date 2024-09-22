import { Template } from "../components/template.js"; 
import { AnimationHandler } from "../handlers/animation/animationHandler.js";
import { TemplateObjectArray } from "../util/array.js";
import { decrementString } from "../util/ui.js";
import { BaseView } from "./baseView.js";


export class TemplateView extends BaseView {
    constructor(controller, applicationController) {
        super(controller);
        this.controller = controller;
        this.applicationController = applicationController;
        this.templateObjects = new TemplateObjectArray();
        this.#initializeDomElements();
        this.#attachEventListeners();

        AnimationHandler.fadeInFromBottom(this._viewElement);
    }


    renderAll(recent, other, totalUses, mostUsed) {
        this.templateObjects.clear()
        this.#renderTemplateStats(recent, other, totalUses, mostUsed);
        if (recent.length > 0) {
            const recentContentFragment = document.createDocumentFragment();
            const otherContentFragment = document.createDocumentFragment();

            for(let i = 0; i < recent.length; i++) {
                const templateCard = this.#template(recent[i]);
                recentContentFragment.appendChild(templateCard);
                AnimationHandler.fadeInFromBottom(templateCard);
            }

            for(let i = 0; i < other.length; i++) {
                const templateCard = this.#template(other[i]);
                otherContentFragment.appendChild(templateCard);
                AnimationHandler.fadeInFromBottom(templateCard);
            }
            this._recentTemplates.appendChild(recentContentFragment);
            this._otherTemplates.appendChild(otherContentFragment);
        } 
    }

    
    renderDelete(template, closeDialog = true) {
        const templates = this._recentTemplates.children;

        for (let i = 0; i < templates.length; i++) {
            if (templates[i].id == template.id) {
                AnimationHandler.fadeOutCard(templates[i]);
                this.templateObjects.remove(template);
                this._templateCountSpan.textContent = decrementString(this._templateCountSpan.textContent); 
            }
        }
        if (closeDialog) this.closeDialog();
    }

    handleTemplateCardClick(templateId) {
        const template = this.templateObjects.get(templateId);
        this.applicationController.initView('editor', 
            {
                editorObjectType: 'template', 
                editorObject: template,
                newEditorObject: false, 
                previousView: 'templates', 
                editorObjectLocation: null
            }
        );
    }

    getTemplateObject(templateId) {
        return this.templateObjects.get(templateId);
    }


    #renderTemplateStats(recent, other, totalUses, mostUsed) {
        this._templateCountSpan.textContent = 
        recent.length + other.length

        this._templateUsesCountSpan.textContent = totalUses;
        this._mostUsedTemplateSpan.textContent = mostUsed;
    }

    #template(template) {
        this.templateObjects.add(template);
        return new Template(template, this)
    }

    #initializeDomElements() {
        this._addTemplateButton = document.querySelector('.add-template-btn');
        this._recentTemplates = document.querySelector('.recent-templates');
        this._otherTemplates = document.querySelector('.other-templates');
        this._templateCountSpan = document.querySelector('.template-count');
        this._templateUsesCountSpan = document.querySelector('.total-uses-count');
        this._mostUsedTemplateSpan = document.querySelector('.most-used-template');
        this._viewElement = document.querySelector('.templates');
    }

    #attachEventListeners() {
        this._addTemplateButton.addEventListener('click', () => {
            this.applicationController.initView('editor', {
                editorObjectType: 'template', 
                editorObject: null,
                newEditorObject: true, 
                previousView: 'templates', 
                editorObjectLocation: null
            })
        });
    }
}