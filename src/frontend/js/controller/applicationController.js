import { NoteController } from "./noteController.js";
import { HomeController } from "./homeController.js";
import { FolderController } from "./folderController.js";
import { TemplateController } from "./templateController.js";
import { ApplicationModel } from "../model/applicationModel.js";
import { SidebarView } from "../view/sideBarView.js";
import { TextEditorController } from "./textEditorController.js"
import { SettingController } from "./settingController.js";
import { StickWallController } from "./stickyWallController.js";
import { FlashcardDeckController } from "./flashcardDeckController.js";
import { FlashcardPracticeController } from "./flashcardPracticeController.js";
import { FlashcardEditController } from "./flashcardEditController.js";
import { templates } from "../constants/templates.js";

export class ApplicationController {
    constructor() {
        this.sidebarView = new SidebarView(this);
        this.model = new ApplicationModel();
        this.noteController = new NoteController(this);
        this.homeController = new HomeController(this);
        this.folderController = new FolderController(this)
        this.templateController = new TemplateController(this);
        this.flashcardDeckController = new FlashcardDeckController(this);
        this.flashcardPracticeController = new FlashcardPracticeController(this);
        this.flashcardEditController = new FlashcardEditController(this);
        this.textEditorController = new TextEditorController(this);
        this.stickyWallController = new StickWallController(this);
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
    
        this.templates = templates
        this.initView('home')
        document.querySelector('#home-btn').classList.add('active-view');
        this.settingController.loadCurrentTheme()
    }

    initView(viewId, viewParameters = {}) {
        const controller = this.controllers[viewId];
        if (controller) {
            // Putting the view template on the screen
            this.viewContainer.innerHTML = this.templates[viewId];
            setTimeout(() => {

                if (viewId === 'home') {
                    this.folderController.clearFolderHistory();
                    this.sidebarView.setActiveTab('home')
                }

                if (viewId === 'notes') {
                    const { folder } = viewParameters; 
                    this.folderController.init(folder.id, folder.name);
                    controller.init(folder.id);
                    this.sidebarView.setActiveTab('notes');
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
                    this.sidebarView.setActiveTab('notes');
                    return;
                }

                if (viewId === 'flashcardsHome') {
                    this.sidebarView.setActiveTab('flashcards');
                }

                if (viewId === 'flashcardsPractice') {
                    const {
                        deck,
                        previousView
                    } = viewParameters

                    this.model.setPreviousView(previousView);                    

                    controller.init(deck);
                    this.sidebarView.setActiveTab('flashcards');
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

                if (viewId === 'templates') {
                    this.sidebarView.setActiveTab('templates');
                }

                if (viewId === 'stickyWall') {  
                    this.sidebarView.setActiveTab('sticky-wall')
                }

                if (viewId === 'settings') {
                    this.sidebarView.setActiveTab('settings')
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

    async addNote(name, content, notify) {
        const { id } = this.folderController.getCurrentFolderObject();
        const note = await this.noteController.addNote(id, name, content, notify);
        this.textEditorController.storeEditorObject(note, 'note')
    }

    async getNotes(folderId) {
        await this.noteController.getNotes(folderId);
    }

    async getNoteSearchItems() {
        return await this.noteController.getSearchItems();
    }

    async updateNote(note) {
        await this.noteController.update(note);
    }   

    async deleteNote(noteId, notify) {
        await this.noteController.delete(noteId, notify);
    }

    async addTemplate(name, content, notify) {
        await this.templateController.addTemplate(name, content, notify);
    }

    async getTemplates() {
        await this.templateController.getTemplates();
    }

    async getTemplateSearchItems() {
        return await this.templateController.getTemplateNames();
    }

    async updateTemplate(template) {
        await this.templateController.update(template);
    }

    async moveNote(folderId, droppedNoteId) {
        await this.noteController.moveNote(folderId, droppedNoteId);
    }    

    async moveFolder(newParentFolderId, droppedFolderId) {
        await this.folderController.moveFolder(newParentFolderId, droppedFolderId)
    }
    
    async setTheme(init) {
        const THEME = await this.settingController.getTheme();
        this.settingController.setTheme(init, THEME);
    }

    async getTemplateById(templateId, updateUseCount) {
        return await this.templateController.getTemplateById(templateId, updateUseCount)
    }

    async deleteTemplate(templateId, notify) {
        await this.templateController.delete(templateId, notify)
    }

    getCurrentFolderObject() {
        return this.folderController.getCurrentFolderObject();
    }

    getPreviousFolderObject() {
        return this.folderController.getPreviousFolderObject();
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