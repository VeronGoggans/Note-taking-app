import { ApplicationModel } from "../model/applicationModel.js";
import { FolderController } from "./folderController.js";
import { NoteController } from "./noteController.js";
import { TemplateController } from "./templateController.js";
import { ApplicationView } from "../view/applicationView.js";
import { TextEditorController } from "./textEditorController.js"
import { SettingController } from "./settingController.js";
import { Dialog } from "../util/dialog.js";
import { NotificationHandler } from "../handlers/userFeedback/notificationHandler.js";
 
export class ApplicationController {
    constructor() {
        this.homeFolderId = 'f-1';
        this.favoriteFolderId = 'f-2';
        this.templateFolderId = 'f-3';
        this.dialog = new Dialog();
        this.notificationHandler = new NotificationHandler();
        this.applicationView = new ApplicationView(this, this.dialog);
        this.applicationModel = new ApplicationModel();
        this.folderController = new FolderController(this, this.dialog, this.notificationHandler);
        this.noteController = new NoteController(this, this.dialog, this.notificationHandler);
        this.templateController = new TemplateController(this, this.dialog, this.notificationHandler);
        this.textEditorController = new TextEditorController(this, this.dialog);
        this.settingController = new SettingController();
    }


    /**
     * This method starts the application by fetching the root folders.
     * 
     * This method is called when the app starts.
     */
    async start() {
        await this.setTheme(true);
        await this.folderController.getFolders();
        await this.noteController.getNotes(this.homeFolderId);
        const response = await this.getSearchObjects();
        this.applicationView.giveSearchOptions(response.Notes);
        this.applicationView.renderSearchOptions(response.Notes);
    }


    async handleAddFolder(name) {
        const currentFolderId = this.applicationModel.getCurrentFolderID();
        if (currentFolderId === 'f-1') {
            await this.addFolder(name);
        } else {
            await this.addSubfolder(name, currentFolderId);
        } 
    }

    async navigateToHomescreen() {
        this.applicationView.removeContent();
        await this.folderController.getFolders();
        await this.noteController.getNotes(this.homeFolderId);
        this.applicationModel.clearFolderIdlist();
        this.applicationView.displayFolderName('Home');
        this.applicationView.displayCreateButtonText('Add document')
    }
    
    async navigateOutofFolder() {
        const parentFolder = this.applicationModel.removeFolderIdFromList();
        if (parentFolder === this.homeFolderId) {
            await this.navigateToHomescreen();
        }
        else {
            await this.navigateIntoFolder(parentFolder.id, parentFolder.name);
        }
    }

    async navigateIntoFolder(folderId, name) {
        this.applicationView.removeContent();
        this.applicationView.displayFolderName(name);
        this.applicationModel.addFolderIdToList(folderId, name);

        if (folderId === this.templateFolderId) {
            await this.templateController.getTemplates();
            this.applicationView.displayCreateButtonText('Add template')
        }
        else {
            await this.folderController.getFolders(folderId);
            await this.noteController.getNotes(folderId);
            this.applicationView.displayCreateButtonText('Add document')
        }
    }


    async showTextEditor() {
        const allFolderNames = this.applicationModel.getAllFolderNames();
        const allTemplateNames = await this.templateController.getTemplateNames();
        this.textEditorController.showTextEditor(allFolderNames, allTemplateNames);
    }

    /**
     * This method retrieves a spicific note
     * 
     * This method retrieves the note that has been 
     * clicked on in the search bar takes the user to the folder 
     * the searched note is present in and finally opens 
     * that note in the text editor     
     * 
     * @param {String} noteId 
     */
    async getSearchedNote(noteId) {
        const response = await this.noteController.getNoteById(noteId);
        const note = await response[0];
        this.openNoteInTextEditor(note);
        if (response[1] !== this.homeFolderId) {
            this.navigateIntoFolder(await response[1], await response[2]);
        }
    }

    /**
     * This method returns the current folder ID
     * by calling the application model to retrieve it.
     * 
     * This method is called when
     * 
     * @returns {String} The current folder ID.
     */
    getCurrentFolderID() {
        return this.applicationModel.getCurrentFolderID();
    }

    async getSearchObjects() {
        return await this.applicationModel.getSearchOptions('/noteSearchObjects');
    }
    
    /**
     * This method is called everytime a new note is created.
     */
    addSearchObject(noteId, name, folderName) {
        this.applicationView.addSearchObject(noteId, name, folderName);
    }

    /**
     * This method is called everytime a note gets deleted.
     */
    deleteSearchObject(noteId) {
        this.applicationView.deleteSearchObject(noteId);
    }

    /**
     * This method is called everytime a note gets updated.
     */
    updateSearchObject(noteId, name) {
        this.applicationView.updateSearchObject(noteId, name);
    }

    /**
     * This method opens up the text editor
     * And puts the note the user clicked on, in the text editor.
     */
    async openNoteInTextEditor(note) {
        const allFolderNames = this.applicationModel.getAllFolderNames();
        const allTemplateNames = await this.templateController.getTemplateNames();
        this.textEditorController.openNoteInTextEditor(note, allFolderNames, allTemplateNames);
    }

    async openTemplateInTextEditor(template) {
        const allFolderNames = this.applicationModel.getAllFolderNames();
        const allTemplateNames = await this.templateController.getTemplateNames();
        this.textEditorController.openTemplateInTextEditor(template, allFolderNames, allTemplateNames)
    }

    getTemplates() {
        this.templateController.getTemplates();
    }

    async addNote(name, content) {
        const currentFolderId = this.applicationModel.getCurrentFolderID();
        const note = await this.noteController.addNote(currentFolderId, name, content);
        this.textEditorController.storeNoteData(note)
    }

    async changeNote(noteId, name, content, bookmark, favorite, color) {
        await this.noteController.updateNote(noteId, name, content, bookmark, favorite, color);
    }

    async addTemplate(name, content) {
        const template = await this.templateController.addTemplate(name, content);
        this.textEditorController.storeTemplateData(template);
    }

    async changeTemplate(templateId, name, content) {
        await this.templateController.updateTemplate(templateId, name, content);
    }

    async moveNote(noteId, folderId) {
        await this.noteController.moveNote(noteId, folderId);
    }

    async updateNoteColor(noteId, color) {
        await this.noteController.updateNoteColor(noteId, color);
    }

    async addSubfolder(name, parentID) {
        await this.folderController.addFolder(name, parentID);
    }

    async addFolder(name) {
        await this.folderController.addFolder(name);
    }

    async deleteNote(noteId) {
        await this.noteController.deleteNote(noteId);
    }
    
    async setTheme(init) {
        const THEME = await this.settingController.getTheme();
        this.settingController.setTheme(init, THEME);
    }

    async getTemplateById(templateId) {
        return await this.templateController.getTemplateById(templateId)
    }
}