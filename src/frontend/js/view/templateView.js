import { Template } from "../components/template.js"; 
import { AnimationHandler } from "../handlers/animation/animationHandler.js";
import { TemplateObjectArray } from "../util/array.js";
import { dateFormat } from "../util/date.js";
import { formatName, filterNotePreview } from "../util/formatters.js";
import { DeleteModal } from "../components/modals/deleteModal.js";



export class TemplateView {
    constructor(controller, applicationController, dialog, notificationHandler) {
        this.controller = controller;
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
            this._recentTemplates.appendChild(contentFragment)
        } else {
            this.notificationHandler.push('empty')
        }
    }


    renderOne(template) {
        const templateCard = this.#template(template);
        this._recentTemplates.appendChild(templateCard);
        AnimationHandler.fadeInFromBottom(templateCard);
        this.notificationHandler.push('saved');
    }


    renderUpdate(template) {
        const templates = this._recentTemplates.children 

        for (let i = 0; i < templates.length; i++) {
            if (templates[i].id === template.id) {

                const templatePreview = templates[i].querySelector('p');
                templatePreview.innerHTML = filterNotePreview(template.content);

                const templateName = templates[i].querySelector('h4');
                templateName.textContent = formatName(template.name);

                templates[i].setAttribute("data-info", `${dateFormat(template.creation)}--${dateFormat(template.last_edit)}`);

                this.templateObjects.update(template);
                this.notificationHandler.push('updated');
            }
        }
    }

    
    renderDelete(template, closeDialog = true) {
        const templates = this._recentTemplates.children;

        for (let i = 0; i < templates.length; i++) {
            if (templates[i].id === template.id) {
                AnimationHandler.fadeOutCard(templates[i], this._recentTemplates);
                this.templateObjects.remove(template);
                this.notificationHandler.push('deleted', template.name);
            }
        }
        if (closeDialog) this.dialog.hide();
    }

    /**
     * This method renders a confirmation container 
     * telling the user if they want to delete the note.
     * 
     * @param {String} id 
     * @param {String} name
     */
    renderDeleteContainer(id, name) {
        this.dialog.addChild(new DeleteModal(id, name, this));
        this.dialog.show();
    }

    handleTemplateCardClick(templateId) {
        const template = this.templateObjects.get(templateId);
        template.last_edit = dateFormat(template.last_edit);
        this.applicationController.openTemplateInTextEditor(template);
    }


    getTemplateObject(templateId) {
        return this.templateObjects.get(templateId);
    }

    async handleDeleteButtonClick(id) {
        await this.controller.deleteTemplate(id);
    }


    #template(template) {
        this.templateObjects.add(template);
        return new Template(template, this)
    }

    #initializeDomElements() {
        this._recentTemplates = document.querySelector('.recent-templates');
        this._otherTemplates = document.querySelectorAll('.other-templates');
    }
}