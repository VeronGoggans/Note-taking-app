import { HttpModel } from "../model/httpModel.js";
import { TaskboardView } from "../view/taskboardView.js";


export class StickyWallHomeController {
    constructor(applicationController, dialog) {
        this.applicationController = applicationController;
        this.dialog = dialog;
        this.model = new HttpModel();
    }

    async init() {
        this.view = new TaskboardView(this, this.applicationController);
        await this.get()
    }

    async add(stickyWallInfo) {
        const { stickyWall }  = await this.model.add('/stickyWall', stickyWallInfo);
        this.view.renderOne(stickyWall);
    }

    async get() {
        const { stickyWalls } = await this.model.get(`/stickyWalls`);
        this.view.renderAll(stickyWalls);
    }

    async getById(stickyWallId) {
        const { stickyWall } = await this.model.get(`/stickyWall/${stickyWallId}`);
        return stickyWall
    }

    async update(updatedStickyWall) {
        await this.model.update('/stickyWall', updatedStickyWall);
        this.view.renderUpdate(updatedStickyWall);
    }

    async delete(stickyWallId) {
        await this.model.delete(`/stickyWall/${stickyWallId}`);
        this.view.renderDelete(stickyWallId);
    }
}