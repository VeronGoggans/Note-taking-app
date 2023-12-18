import { FolderController } from "./folderController.js";
import { SubfolderController } from "./subfolderController.js";
import { NoteController } from "./noteController.js";

export class ApplicationController {
    constructor() {
        this.folderController = new FolderController(this);
        this.subfolderController = new SubfolderController(this);
        this.noteController = new NoteController(this);
    }

    start() {
        this.folderController.getFolders();
    }

    navigateOutOfFolder() {
        this.folderController.getFolders();
    }

    navigateIntoFolder(folderId, noteType) {
        this.subfolderController.getSubFolders(folderId);
        this.noteController.getNotes(folderId, noteType);
    }





}