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

    async getTemplateById(id) {
        const response = await this.model.getById('/templates', id);
        const template = await response.Template;
        return template
    }

    async getTemplateNames() {
        const response = await this.model.get('/templateNames');
        const templates = await response.Templates;
        return templates
    }

    async addTemplate(name, content) {
        const response = await this.model.add('/template', name, content)
        let template = await response.Template;
        template.content = content;
        this.view.renderOne(template);
        return template
    }

    async updateTemplate(id, name, content) {
        const response = await this.model.update(`/template/${id}`, name, content)
        const template = await response.Template;
        this.view.renderUpdate(template);
    }

    async deleteTemplate(id) {
        const response = await this.model.delete('/template', id)
        const template = await response.Template;
        this.view.renderDelete(template);
    }

}