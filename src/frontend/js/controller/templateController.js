import { TemplateModel } from "../model/templateModel.js";
import { TemplateView } from "../view/templateView.js";


export class TemplateController {
    constructor(applicationController, dialog, notificationHandler) {
        this.applicationController = applicationController;
        this.templateModel = new TemplateModel();
        this.templateView = new TemplateView()
    }

    async getTemplates() {
        const response = await this.templateModel.get('/templates');
        const templates = await response.Templates;
        this.templateView.renderTemplatesCards(templates);
    }

    async addTemplate() {

    }

    async updateTemplate() {

    }

    async deleteTemplate() {

    }

}