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
import { TaskBoardHomeController } from "./taskboardHomeController.js";
import { TaskboardController } from "./taskboardController.js";
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
        this.taskboardHomeController = new TaskBoardHomeController(this);
        this.taskboardController = new TaskboardController(this);
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
            editor: this.textEditorController,
            taskboardHome: this.taskboardHomeController,
            taskboard: this.taskboardController
        }
        this.initView('home')
        this.settingController.loadCurrentTheme()
    }

    initView(viewId, viewParameters = {}) {
        const controller = this.controllers[viewId];
        if (controller) {
            // Putting the view template on the screen
            this.viewContainer.innerHTML = templates[viewId];
            setTimeout(() => {

                if (viewId === 'home') {
                    this.folderController.clearFolderHistory();
                    this.sidebarView.setActiveTab('home')
                }

                if (viewId === 'notes') {
                    const { folder, location } = viewParameters; 
                    this.folderController.init(folder.id, folder.name, location);
                    // note controller 
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
                        previousView, 
                        editorObjectLocation
                    } = viewParameters;

                    this.model.setPreviousView(previousView);
                    if (editorObjectLocation !== null) {
                        this.folderController.setNoteLocation(editorObjectLocation);
                    }
                    
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

                if (viewId === 'taskboardHome') {
                    this.sidebarView.setActiveTab('taskboards')
                }

                if (viewId === 'taskboard') {
                    const {
                        taskboard, 
                        previousView
                    } = viewParameters

                    this.model.setPreviousView(previousView);

                    controller.init(taskboard);
                    return;
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

    // Note methods

    async addNote(name, content, notify) {
        const { id } = this.folderController.getCurrentFolderObject();
        const note = await this.noteController.add(id, name, content, notify);
        this.textEditorController.storeEditorObject(note, 'note')
    }

    async getNotes(folderId) {
        await this.noteController.get(folderId);
    }

    async getNoteById(noteId) {
        return await this.noteController.getById(noteId)
    }

    async getNoteSearchItems() {
        return await this.noteController.getSearchItems();
    }

    async updateNote(note) {
        await this.noteController.update(note);
    }   

    async moveNote(folderId, droppedNoteId) {
        await this.noteController.move(folderId, droppedNoteId);
    } 

    async deleteNote(noteId, notify) {
        await this.noteController.delete(noteId, notify);
    }

    // Template methods

    async addTemplate(name, content, notify) {
        await this.templateController.add(name, content, notify);
    }

    async getTemplates() {
        await this.templateController.get();
    }

    async getTemplateSearchItems() {
        return await this.templateController.getTemplateNames();
    }

    async getTemplateById(templateId, updateUseCount) {        
        return await this.templateController.getById(templateId, updateUseCount)
    }

    async updateTemplate(template) {
        await this.templateController.update(template);
    }

    async deleteTemplate(templateId, notify) {
        await this.templateController.delete(templateId, notify)
    }   

    // Folder methods

    async getFolderById(folderId) {
        return await this.folderController.getById(folderId);
    }

    async getFolderSearchItems() {
        return await this.folderController.getSearchItems();
    }

    getCurrentFolderObject() {
        return this.folderController.getCurrentFolderObject();
    }

    getPreviousFolderObject() {
        return this.folderController.getPreviousFolderObject();
    }

    async moveFolder(newParentFolderId, droppedFolderId) {
        await this.folderController.move(newParentFolderId, droppedFolderId)
    }

    // Deck methods

    async addDeck(deckName, flashcards) {
        await this.flashcardDeckController.addDeck(deckName, flashcards);
    }

    async getDeckById(deckId) {
        return await this.flashcardDeckController.getDeckById(deckId)
    }

    async getDeckSearchItems() {
        return await this.flashcardDeckController.getSearchItems();
    }

    // Settings methods 

    async setTheme(init) {
        const theme = await this.settingController.getTheme();
        this.settingController.setTheme(init, theme);
    }
}