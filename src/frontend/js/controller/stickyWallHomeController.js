import { HttpModel } from "../model/httpModel.js";
import { StickyWallHomeView } from "../view/stickyWallHomeView.js"; 


export class StickyWallHomeController {
    constructor(applicationController) {
        this.applicationController = applicationController;
        this.model = new HttpModel();
    }

    async init() {
        this.view = new StickyWallHomeView(this, this.applicationController);
        await this.get()
    }

    async add(stickyWallInfo) {
        const { Object }  = await this.model.add('/stickyWall', stickyWallInfo);
        this.view.renderOne(Object);
    }

    async get() {
        const { Objects } = await this.model.get(`/stickyWalls`);
        this.view.renderAll(Objects);
    }

    async getById(stickyWallId) {
        const { Object } = await this.model.get(`/stickyWall/${stickyWallId}`);
        return Object
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