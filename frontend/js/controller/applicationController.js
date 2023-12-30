import { ApplicationModel } from "../model/applicationModel.js";
import { FolderController } from "./folderController.js";
import { SubfolderController } from "./subfolderController.js";
import { NoteController } from "./noteController.js";
import { ApplicationView } from "../view/applicationView.js";
import { TextEditorController } from "./textEditorController.js"

export class ApplicationController {
    constructor() {
        this.applicationView = new ApplicationView(this);
        this.applicationModel = new ApplicationModel();
        this.folderController = new FolderController(this);
        this.subfolderController = new SubfolderController(this);
        this.noteController = new NoteController(this);
        this.textEditorController = new TextEditorController(this);
    }

    /**
     * This method starts the application by fetching the root folders.
     */
    start() {
        this.folderController.getFolders();
    }

    /**
     * This method returns the user too the homescreen, by fetching the root folders again.
     * This method also removes the folder id list.
     */
    navigateToHomescreen() {
        this.folderController.getFolders();
        this.applicationModel.clearFolderIdlist();
    }

    /**
     * This methos returns the current folder ID,
     * by calling the application model to retrieve it.
     * 
     * @returns {String} The current folder ID.
     */
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
        console.log(CURRENT_FOLDER);
        if (CURRENT_FOLDER === undefined) await this.addFolder(name);
        else await this.addSubfolder(name, CURRENT_FOLDER);
    }

    navigateOutofFolder() {
        const PARENT_ID = this.applicationModel.removeFolderIdFromList();
        if (PARENT_ID === undefined) this.navigateToHomescreen();
        else this.navigateIntoFolder(PARENT_ID, 'all');
    }

    navigateIntoFolder(folderId, noteType) {
        this.subfolderController.getSubFolders(folderId);
        this.noteController.getNotes(folderId, noteType);
        this.applicationModel.addFolderIdToList(folderId);
        // console.log(`Current folder: ${this.applicationModel.getCurrentFolderID()}`);
    }

    showTextEditor() {
        this.textEditorController.showTextEditor();
    }

    /**
     * This method opens up the text editor
     * And puts the note the user clicked on, in the text editor.
     * 
     * @param {String} content is the content of the note.
     * @param {String} name is the name/title of the note. 
     */
    openNoteInTextEditor(content, name) {
        this.textEditorController.openNoteInTextEditor(content, name);
    }

    createNote(content, name) {
        const CURRENT_FOLDER_ID = this.applicationModel.getCurrentFolderID();
        this.noteController.addNote(CURRENT_FOLDER_ID, content, name);
    }
}