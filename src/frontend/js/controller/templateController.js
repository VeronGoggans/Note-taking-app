import { HttpModel } from "../model/httpModel.js";
import { TemplateView } from "../view/templateView.js";
import { NotificationHandler } from "../handlers/userFeedback/notificationHandler.js";


export class TemplateController {
    constructor(applicationController) {
        this.applicationController = applicationController;
        this.model = new HttpModel();
    }


    async init() {
        this.view = new TemplateView(this, this.applicationController)
        await this.get()
    }


    async add(name, content, notify) {
        try {
            await this.model.add('/template', {'name': name,'content': content})
            if (notify) {
                NotificationHandler.push('saved')
            }
        } 
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }


    async get() {
        try {
            const { recent, other, totalUses, mostUsed } = await this.model.get('/templates');
            this.view.renderAll(recent, other, totalUses, mostUsed);
        } 
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }


    async getById(templateId, updateUseCount) {
        try {
            const { template }= await this.model.get(`/templateById/${templateId}/${updateUseCount}`);
            return template
        }
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }


    async getTemplateNames() {
        try  {
            const { templates } = await this.model.get('/templateNames');
            return templates
        } 
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }


    async update(template) {
        try  {
            await this.model.update('/template', {'id': template.id,'name': template.name, 'content': template.content})
        } 
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }


    async delete(templateId, notify) {
        try {
            const { template } = await this.model.delete(`/template/${templateId}`)
            this.view.renderDelete(template);

            if (notify) {
                NotificationHandler.push('deleted', template.name)
            }
        } 
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }
}