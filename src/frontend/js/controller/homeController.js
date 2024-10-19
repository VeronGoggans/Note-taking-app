import { HomeView } from "../view/homeView.js";
import { HttpModel } from "../model/httpModel.js";
import { Searchbar } from "../view/searchbar.js";
import { viewToLoad } from "../helpers/random.js";
import { NotificationHandler } from "../handlers/userFeedback/notificationHandler.js";


export class HomeController {
    constructor(applicationController) {
        this.applicationController = applicationController;
        this.model = new HttpModel()
    }

    async init() {
        this.searchbar = new Searchbar(this);        
        this.view = new HomeView(this, this.applicationController);

        await this.#initSearchbar();
        await this.getRecentFolders();
        await this.getRecentNotes();
        await this.get5RandomDecks();
    }

    async getRecentFolders() {
        try {
            const { Objects } = await this.model.get('/recentFolders');
            this.view.renderRecentFolders(Objects);
        } 
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }


    async getRecentNotes() {
        try {
            const { notes } = await this.model.get('/recentNotes');
            this.view.renderRecentNotes(notes);
        } 
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }


    async get5RandomDecks() {
        try {
            const { decks } = await this.model.get('/randomDecks');
            this.view.renderRandomDecks(decks);
        } 
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }


    async handleSearch(searchItemId, searchType) {
        const viewId = viewToLoad(searchType)
        if (viewId === 'editor') {
            if (searchType === 'template') {
                const template  = await this.applicationController.getTemplateById(searchItemId, false) 

                this.applicationController.initView(viewId, {
                    editorObjectType: 'template', 
                    editorObject: template,
                    newEditorObject: false, 
                    previousView: 'home', 
                    editorObjectLocation: null
                })
            }
            if (searchType === 'note') {
                const { note, location } = await this.applicationController.getNoteById(searchItemId);
                this.applicationController.initView(viewId, {
                    editorObjectType: 'note', 
                    editorObject: note,
                    newEditorObject: false, 
                    previousView: 'home',
                    editorObjectLocation: location 
                })
            }
        }
        if (viewId === 'notes') {
            const { folder, location } = await this.applicationController.getFolderById(searchItemId);            
            this.applicationController.initView(viewId, {
                folder: folder,
                location: location
            });
        }

        if (viewId === 'flashcardsPractice') {
            const deck = await this.applicationController.getDeckById(searchItemId);
            this.applicationController.initView(viewId, {
                deck: deck,
                previousView: 'home'
            })
        }
    }

    async #initSearchbar() {
        const [notes, folders, templates, flashcards] = await Promise.all([
            this.applicationController.getNoteSearchItems(),
            this.applicationController.getFolderSearchItems(),
            this.applicationController.getTemplateSearchItems(),
            this.applicationController.getDeckSearchItems()
        ]);
        this.searchbar.fillSearchbar('note', notes);
        this.searchbar.fillSearchbar('folder', folders);
        this.searchbar.fillSearchbar('template', templates);
        this.searchbar.fillSearchbar('flashcard', flashcards);
    }
}