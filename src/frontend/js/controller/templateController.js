import { TemplateModel } from "../model/templateModel.js";
import { TemplateView } from "../view/templateView.js";


export class TemplateController {
    constructor(applicationController, dialog, notificationHandler) {
        this.dialog = dialog;
        this.notificationHandler = notificationHandler;
        this.applicationController = applicationController;
        this.objectNum = 0;
        this.model = new TemplateModel();
    }

    async init() {
        this.view = new TemplateView(this, this.applicationController, this.dialog, this.notificationHandler)
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

    async getTemplateById(id, updateUseCount) {
        const response = await this.model.get(`/templateById/${id}/${updateUseCount}`);
        const template = response[this.objectNum].template;
        return template
    }

    async getTemplateNames() {
        const response = await this.model.get('/templateNames');
        const templates = response[this.objectNum].templates;
        return templates
    }

    async addTemplate(name, content) {
        await this.model.add('/template', name, content)
    }

    async updateTemplate(template) {
        await this.model.update('/template', template)
    }

    async deleteTemplate(id) {
        const response = await this.model.delete('/template', id)
        const template = response[this.objectNum].template;
        this.view.renderDelete(template);
    }

}