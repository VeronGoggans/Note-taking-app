import { HomeView } from "../view/homeView.js";
import { HttpModel } from "../model/httpModel.js";
import { Searchbar } from "../view/searchbar.js";
import { viewToLoad } from "../helpers/random.js";


export class HomeController {
    constructor(applicationController) {
        this.applicationController = applicationController;
        this.objectNum = 0;
        this.homeFolderId = 'f-1';
        this.model = new HttpModel()
    }

    async init() {
        this.searchbar = new Searchbar(this);
        this.searchbar.fillSearchbar('note', await this.applicationController.getNoteSearchItems());
        this.searchbar.fillSearchbar('folder', await this.applicationController.getFolderSearchItems());
        this.searchbar.fillSearchbar('flashcard', await this.applicationController.getDeckSearchItems());
        this.searchbar.fillSearchbar('template', await this.applicationController.getTemplateSearchItems());
        this.view = new HomeView(this, this.applicationController);
        this.getRecentFolders();
        this.getRecentNotes();
        this.get5RandomDecks();
    }

    async getRecentFolders() {
        const response = await this.model.get('/recentFolders');
        this.view.renderRecentFolders(
            response[this.objectNum].folders
        );
    }

    async getRecentNotes() {
        const response = await this.model.get('/recentNotes');
        this.view.renderRecentNotes(
            response[this.objectNum].notes
        );
    }

    async get5RandomDecks() {
        const response = await this.model.get('/randomDecks');
        this.view.renderRandomDecks(
            response[this.objectNum].decks
        );
    }

    async handleSearch(searchItemId, searchType) {
        const viewId = viewToLoad(searchType)
        if (viewId === 'editor') {
            if (searchType === 'template') {
                const { template } = await this.applicationController.getTemplateById(searchItemId, false) 
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
}