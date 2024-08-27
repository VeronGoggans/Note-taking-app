import { HttpModel } from "../model/httpModel.js";
import { TemplateView } from "../view/templateView.js";


export class TemplateController {
    constructor(applicationController) {
        this.applicationController = applicationController;
        this.objectNum = 0;
        this.model = new HttpModel();
    }

    async init() {
        this.view = new TemplateView(this, this.applicationController)
        await this.getTemplates()
    }

    async getTemplates() {
        const response = await this.model.get('/templates');
        this.view.renderAll(
            response[this.objectNum].recent, 
            response[this.objectNum].other,
            response[this.objectNum].totalUses,
            response[this.objectNum].mostUsed
        );
    }

    async getTemplateById(templateId, updateUseCount) {
        const response = await this.model.get(`/templateById/${templateId}/${updateUseCount}`);
        const template = response[this.objectNum].template;
        return template
    }

    async getTemplateNames() {
        const response = await this.model.get('/templateNames');
        const templates = response[this.objectNum].templates;
        return templates
    }

    async addTemplate(name, content) {
        await this.model.add('/template', {
            'name': name,
            'content': content
        })
    }

    async update(template) {
        await this.model.update('/template', {
            'id': template.id,
            'name': template.name,
            'content': template.content
        })
    }

    async delete(templateId) {
        const response = await this.model.delete(`/template/${templateId}`)
        const template = response[this.objectNum].template;
        this.view.renderDelete(template);
    }
}