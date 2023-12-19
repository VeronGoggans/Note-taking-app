import { ApplicationModel } from "../model/applicationModel.js";
import { FolderController } from "./folderController.js";
import { SubfolderController } from "./subfolderController.js";
import { NoteController } from "./noteController.js";

export class ApplicationController {
    constructor() {
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

    navigateOutofFolder() {
        const PARENT_ID = this.applicationModel.getParentFolderID();
        this.navigateIntoFolder(PARENT_ID, 'all');
    }

    navigateIntoFolder(folderId, noteType) {
        this.subfolderController.getSubFolders(folderId);
        this.noteController.getNotes(folderId, noteType);
        this.applicationModel.setCurrentFolderID(folderId);
        console.log(`Current folder: ${this.applicationModel.getCurrentFolderID()}`);
        console.log(`Parent folder: ${this.applicationModel.getParentFolderID()}`);
    }

    getParentFolderID() {
        return this.applicationModel.getParentFolderID();
    }

    getCurrentFolderID() {
        return this.applicationModel.getCurrentFolderID();
    }
}