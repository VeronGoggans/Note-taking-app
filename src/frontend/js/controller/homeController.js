import { HomeView } from "../view/homeView.js";
import { HomeModel } from "../model/homeModel.js";

export class HomeController {
    constructor(applicationController, dialog, notificationHandler) {
        this.dialog = dialog;
        this.notificationHandler = notificationHandler
        this.applicationController = applicationController;
        this.objectNum = 0;
        this.homeFolderId = 'f-1';
    }

    init() {
        this.view = new HomeView(this, this.applicationController, this.dialog, this.notificationHandler);
        this.model = new HomeModel();
        this.getRecentFolders();
        this.getRecentNotes();
    }

    async getRecentFolders() {
        const response = await this.model.getRecent('/recentFolders');
        const folders = response[this.objectNum].folders;
        this.view.renderRecentFolders(folders);
    }

    async getRecentNotes() {
        const response = await this.model.getRecent('/recentNotes');
        const notes = response[this.objectNum].notes;
        this.view.renderRecentNotes(notes);
    }





    

}