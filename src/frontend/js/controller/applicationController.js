import { NoteController } from "./noteController.js";
import { HomeController } from "./homeController.js";
import { FolderController } from "./folderController.js";
import { TemplateController } from "./templateController.js";
import { ApplicationModel } from "../model/applicationModel.js";
import { SidebarView } from "../view/sideBarView.js";
import { TextEditorController } from "./textEditorController.js"
import { SettingController } from "./settingController.js";
import { StickWallController } from "./stickyWallController.js";
import { Dialog } from "../util/dialog.js";
import { NotificationHandler } from "../handlers/userFeedback/notificationHandler.js";
import { FlashcardDeckController } from "./flashcardDeckController.js";
import { FlashcardPracticeController } from "./flashcardPracticeController.js";
import { FlashcardEditController } from "./flashcardEditController.js";
import { flashcardsTemplate, flashcardPracticeTemplate, notesTemplate, settingsTemplate, editorTemplate, homeTemplate, templatesTemplate, flashcardEditTemplate, stickyWallTemplate } from "../constants/templates.js";

export class ApplicationController {
    constructor() {
        this.dialog = new Dialog();
        this.notificationHandler = new NotificationHandler();
        this.sidebarView = new SidebarView(this);
        this.model = new ApplicationModel();
        this.noteController = new NoteController(this, this.dialog, this.notificationHandler);
        this.homeController = new HomeController(this, this.dialog, this.noteController);
        this.folderController = new FolderController(this, this.dialog, this.notificationHandler)
        this.templateController = new TemplateController(this, this.dialog, this.notificationHandler);
        this.flashcardDeckController = new FlashcardDeckController(this, this.dialog);
        this.flashcardPracticeController = new FlashcardPracticeController(this, this.dialog);
        this.flashcardEditController = new FlashcardEditController(this, this.dialog);
        this.textEditorController = new TextEditorController(this, this.dialog);
        this.stickyWallController = new StickWallController(this, this.dialog);
        this.settingController = new SettingController(this);
        this.viewContainer = document.querySelector('.content');
        this.controllers = {
            home: this.homeController,
            notes: this.noteController,
            flashcardsHome: this.flashcardDeckController,
            flashcardsPractice: this.flashcardPracticeController,
            flashcardEdit: this.flashcardEditController,
            templates: this.templateController,
            stickyWall: this.stickyWallController,
            settings: this.settingController,
            editor: this.textEditorController
        }
    
        this.templates = {
            home: homeTemplate,
            notes: notesTemplate,
            flashcardsHome: flashcardsTemplate,
            flashcardsPractice: flashcardPracticeTemplate,
            flashcardEdit: flashcardEditTemplate,
            templates: templatesTemplate,
            stickyWall: stickyWallTemplate,
            settings: settingsTemplate,
            editor: editorTemplate
        }
        this.initView('home')
        this.settingController.loadCurrentTheme()
    }

    initView(viewId, viewParameters = {}) {
        const controller = this.controllers[viewId];
        if (controller) {
            // Putting the view template on the screen
            this.viewContainer.innerHTML = this.templates[viewId];
            setTimeout(() => {

                if (viewId === 'notes') {
                    const { folder } = viewParameters; 
                    this.folderController.init(folder.id, folder.name);
                    controller.init(folder.id);
                    return;
                }

                if (viewId === 'editor') {
                    controller.init();
                    const { 
                        editorObjectType, 
                        editorObject, 
                        newEditorObject, 
                        previousView
                    } = viewParameters;

                    this.model.setPreviousView(previousView);
                    
                    if (newEditorObject) {
                        this.openTextEditor(editorObjectType)
                    } else {
                        this.openInTextEditor(editorObject, editorObjectType);
                    }
                    return;
                }

                if (viewId === 'flashcardsPractice') {
                    const {
                        deck,
                        previousView
                    } = viewParameters

                    this.model.setPreviousView(previousView);                    

                    controller.init(deck);

                    return;
                }

                if (viewId === 'flashcardEdit') {
                    const {
                        deck, 
                        previousView
                    } = viewParameters

                    this.model.setPreviousView(previousView);

                    controller.init(deck);
                    return;
                }

                if (viewId === 'home') {
                    this.folderController.clearFolderHistory();
                }

                controller.init();
            }, 0); 
        }
    }

    async showTextEditor() {
        const allFolderNames = this.applicationModel.getAllFolderNames();
        const allTemplateNames = await this.templateController.getTemplateNames();
        this.textEditorController.showTextEditor(allFolderNames, allTemplateNames);
    }

    getCurrentFolderID() {
        const currentFolderObject = this.folderController.getCurrentFolderObject();
        return currentFolderObject.id
    }

    getPreviousView() {
        return this.model.getPreviousView();
    }
    
    async openInTextEditor(editorObject, editorObjectType) {
        const allFolderNames = this.folderController.getAllFolderNames();
        const allTemplateNames = await this.templateController.getTemplateNames();
        this.textEditorController.openInTextEditor(editorObject, editorObjectType, allFolderNames, allTemplateNames);
    }

    async openTextEditor(editorObjectType) {
        const allFolderNames = this.folderController.getAllFolderNames();
        const allTemplateNames = await this.templateController.getTemplateNames();
        this.textEditorController.showTextEditor(editorObjectType, allFolderNames, allTemplateNames);
    }

    async addNote(name, content) {
        const { id } = this.folderController.getCurrentFolderObject();
        const note = await this.noteController.addNote(id, name, content);
        this.textEditorController.storeEditorObject(note, 'note')
    }

    async getNotes(folderId) {
        await this.noteController.getNotes(folderId);
    }

    async getNoteSearchItems() {
        return await this.noteController.getSearchItems();
    }

    async updateNote(note) {
        await this.noteController.updateNote(note);
    }   

    async deleteNote(noteId) {
        await this.noteController.deleteNote(noteId);
    }

    async addTemplate(name, content) {
        await this.templateController.addTemplate(name, content);
    }

    async getTemplates() {
        await this.templateController.getTemplates();
    }

    async getTemplateSearchItems() {
        return await this.templateController.getTemplateNames();
    }

    async updateTemplate(template) {
        await this.templateController.updateTemplate(template);
    }

    async moveNote(noteId, folderId) {
        await this.noteController.moveNote(noteId, folderId);
    }    
    
    async setTheme(init) {
        const THEME = await this.settingController.getTheme();
        this.settingController.setTheme(init, THEME);
    }

    async getTemplateById(templateId, updateUseCount) {
        return await this.templateController.getTemplateById(templateId, updateUseCount)
    }

    getCurrentFolderObject() {
        return this.folderController.getCurrentFolderObject()
    }

    async getFolderById(folderId) {
        return await this.folderController.getFolderById(folderId);
    }

    async getFolderSearchItems() {
        return await this.folderController.getSearchItems();
    }

    async getDeckSearchItems() {
        return await this.flashcardDeckController.getSearchItems();
    }

    async addDeck(deckName, flashcards) {
        await this.flashcardDeckController.addDeck(deckName, flashcards);
    }

    async getDeckById(deckId) {
        return await this.flashcardDeckController.getDeckById(deckId)
    }
}