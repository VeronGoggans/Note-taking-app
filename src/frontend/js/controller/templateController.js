import { TemplateModel } from "../model/templateModel.js";
import { TemplateView } from "../view/templateView.js";


export class TemplateController {
    constructor(applicationController, dialog, notificationHandler) {
        this.applicationController = applicationController;
        this.model = new TemplateModel();
        this.view = new TemplateView(this, applicationController, dialog, notificationHandler)
    }

    async getTemplates() {
        const response = await this.model.get('/templates');
        const templates = await response.Templates;
        this.view.renderAll(templates);
    }

    async addTemplate(name, content) {
        const response = await this.model.add('/template', name, content)
        const template = await response.Template;
        this.view.renderOne(template);
    }

    async updateTemplate(name, content) {
        const response = await this.model.update('/template', name, content)
        const template = await response.Template;
        this.view.rend(template);
    }

    async deleteTemplate() {

    }

}