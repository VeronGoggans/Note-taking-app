import { ApplicationModel } from "../model/applicationModel.js";
import { FolderController } from "./folderController.js";
import { SubfolderController } from "./subfolderController.js";
import { NoteController } from "./noteController.js";
import { ApplicationView } from "../view/applicationView.js";

export class ApplicationController {
    constructor() {
        this.applicationView = new ApplicationView(this);
        this.applicationModel = new ApplicationModel();
        this.folderController = new FolderController(this);
        this.subfolderController = new SubfolderController(this);
        this.noteController = new NoteController(this);
    }

    start() {
        this.folderController.getFolders();
    }

    navigateToHomescreen() {
        this.folderController.getFolders();
    }

    getCurrentFolderID() {
        return this.applicationModel.getCurrentFolderID();
    }

    async addSubfolder(name, parentID) {
        await this.subfolderController.addSubfolder(name, parentID);
    }

    async addFolder(name) {
        await this.folderController.addFolder(name);
    }

    async handleAddFolder(name) {
        const CURRENT_FOLDER = this.applicationModel.getCurrentFolderID();
        if (CURRENT_FOLDER === null) await this.addFolder(name);
        else await this.addSubfolder(name, CURRENT_FOLDER);
    }



    



    // NEEDS WORK
    navigateOutofFolder() {
        const PARENT_ID = this.applicationModel.getParentFolderID();
        this.navigateIntoFolder(PARENT_ID, 'all');
    }

    navigateIntoFolder(folderId, noteType) {
        this.subfolderController.getSubFolders(folderId);
        this.noteController.getNotes(folderId, noteType);
        this.applicationModel.setCurrentFolderID(folderId);
        console.log(`Current folder: ${this.applicationModel.getCurrentFolderID()}`);
    }
}