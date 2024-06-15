import { TemplateModel } from "../model/templateModel.js";


export class TemplateController {
    constructor(applicationController, dialog, notificationHandler) {
        this.applicationController = applicationController;
        this.templateModel = new TemplateModel();
    }

    async getTemplates() {
        const response = await this.templateModel.get('/templates');
        const templates = await response.Templates;
    }

    async addTemplate() {

    }

    async updateTemplate() {

    }

    async deleteTemplate() {

    }

}