import { Template } from "../components/template.js"; 
import { AnimationHandler } from "../handlers/animation/animationHandler.js";
import { TemplateObjectArray } from "../util/array.js";
import { dateFormat } from "../util/date.js";
import { formatName, filterNotePreview } from "../util/formatters.js";


export class TemplateView {
    constructor(templateController, applicationController, dialog, notificationHandler) {
        this.templateController = templateController;
        this.applicationController = applicationController;
        this.notificationHandler = notificationHandler;
        this.dialog = dialog;
        this.templateObjects = new TemplateObjectArray();
        this.#initializeDomElements();
    }


    renderAll(templates) {
        this.templateObjects.clear()
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


    renderOne(template) {
        const templateCard = this.#template(template);
        this._content.appendChild(templateCard);
        AnimationHandler.fadeInFromBottom(templateCard);
    }


    renderUpdate(template) {
        const templates = this._content.children 

        for (let i = 0; i < cards.length; i++) {
            if (templates[i].id === template.id) {

                const templatePreview = templates[i].querySelector('p');
                templatePreview.innerHTML = filterNotePreview(template.content);

                const templateName = templates[i].querySelector('h4');
                templateName.textContent = formatName(template.name);

                templates[i].setAttribute("data-info", `${dateFormat(template.creation)}--${dateFormat(template.last_edit)}`);

                this.templateObjects.update(template);
            }
        }
    }

    
    renderDelete(template, closeDialog = true) {
        const templates = this._content.children;

        for (let i = 0; i < templates.length; i++) {
            if (templates[i].id === template.id) {
                AnimationHandler.fadeOutCard(templates[i], this._content);
                this.templateObjects.remove(template);
            }
        }
        if (closeDialog) this.dialog.hide();
    }


    handleTemplateCardClick(templateId) {
        const template = this.templateObjects.get(templateId);
        template.last_edit = dateFormat(template.last_edit);
        this.applicationController.openTemplateInTextEditor(template);
    }


    getTemplateObject(templateId) {
        return this.templateObjects.get(templateId);
    }


    #template(template) {
        this.templateObjects.add(template);
        return new Template(template, this)
    }

    #initializeDomElements() {
        this._content = document.querySelector('.content-view');
    }
}