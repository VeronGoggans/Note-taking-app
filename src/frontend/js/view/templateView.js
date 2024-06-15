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


    handleNoteCardClick(templateId, creationDate) {
        const template = this.templateObjects.get(templateId);
        const lastEditDate = dateFormat(template.last_edit);
        const name = template.name;
        const content = template.content;
        this.applicationController.openTemplateInTextEditor(content, name, creationDate, lastEditDate, templateId);
    }


    #template(template) {
        this.templateObjects.add(template);
        return new Template(template, this)
    }

    #initializeDomElements() {
        this._content = document.querySelector('.content-view');
        this._list = document.querySelector('.list-content-notes');
    }
}