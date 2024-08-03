import { HomeView } from "../view/homeView.js";
import { HomeModel } from "../model/homeModel.js";
import { Searchbar } from "../view/searchbar.js";
import { viewToLoad } from "../helpers/random.js";


export class HomeController {
    constructor(applicationController, dialog, notificationHandler) {
        this.dialog = dialog;
        this.notificationHandler = notificationHandler
        this.applicationController = applicationController;
        this.objectNum = 0;
        this.homeFolderId = 'f-1';
        this.model = new HomeModel();
    }

    async init() {
        this.searchbar = new Searchbar(this);
        const noteSearchItems = await this.applicationController.getNoteSearchItems();
        const folderSearchItems = await this.applicationController.getFolderSearchItems();
        const templateSearchItems = await this.applicationController.getTemplateSearchItems();        
        this.searchbar.fillSearchbar('note', noteSearchItems);
        this.searchbar.fillSearchbar('folder', folderSearchItems);
        this.searchbar.fillSearchbar('template', templateSearchItems);
        this.view = new HomeView(this, this.applicationController, this.dialog, this.notificationHandler);
        this.getRecentFolders();
        this.getRecentNotes();
    }

    async getRecentFolders() {
        const response = await this.model.get('/recentFolders');
        const folders = response[this.objectNum].folders;
        this.view.renderRecentFolders(folders);
    }

    async getRecentNotes() {
        const response = await this.model.get('/recentNotes');
        const notes = response[this.objectNum].notes;
        this.view.renderRecentNotes(notes);
    }

    async handleSearch(searchItemId, searchType) {
        const viewId = viewToLoad(searchType)
        if (viewId === 'editor') {
            if (searchType === 'template') {
                const response = await this.model.get(`/templateById/${searchItemId}/false`);
                const template = response[this.objectNum].template; 
                this.applicationController.initView(viewId, {
                    editorObjectType: 'template', 
                    editorObject: template,
                    newEditorObject: false, 
                    previousView: 'home', 
                })
            }
            if (searchType === 'note') {
                const response = await this.model.get(`/noteById/${searchItemId}`);
                const note = response[this.objectNum].note; 
                this.applicationController.initView(viewId, {
                    editorObjectType: 'note', 
                    editorObject: note,
                    newEditorObject: false, 
                    previousView: 'home', 
                })
            }
        }
        if (viewId === 'notes') {
            const folder = await this.applicationController.getFolderById(searchItemId);
            this.applicationController.initView(viewId, {
                folder: {
                    'id': searchItemId, 
                    'name': folder.name
                }
            });
        }
    }
}