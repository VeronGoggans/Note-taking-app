import { HttpModel } from "../model/httpModel.js";
import { NoteView } from "../view/noteView.js";
import { Searchbar } from "../view/searchbar.js";
import { viewToLoad } from "../helpers/random.js";
import { NotificationHandler } from "../handlers/userFeedback/notificationHandler.js"

export class NoteController {
    constructor(applicationController) {
        this.applicationController = applicationController;
        this.model = new HttpModel();
    }

    
    async init(folderId = 'f-1') {
        this.searchbar = new Searchbar(this);
        this.view = new NoteView(this, this.applicationController);

        await this.#initSearchbar();
        await this.get(folderId);
    }


    async add(folderId, name, content, notify) {
        try {
            const { note } = await this.model.add('/note', {'folder_id': folderId,'name': name,'content': content});
            if (notify) {
                NotificationHandler.push('saved');
            }
            return note
        } 
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }


    async get(folderId) {
        try {
            const { notes } = await this.model.get(`/notes/${folderId}`);
            this.view.renderAll(notes);
        } 
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }


    async getById(noteId) {
        try {
            return await this.model.get(`/noteById/${noteId}`);
        } 
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }

    
    async getSearchItems() {
        try {
            const { notes } = await this.model.get('/noteSearchItems');
            return notes
        } 
        catch(error) {            
            NotificationHandler.push('error', null, error.message)
        }
    }


    async update(note) {
        try {
            await this.model.update('/note', {'note_id': note.id,'name': note.name,'content': note.content,'bookmark': note.bookmark,'favorite': note.favorite});
            NotificationHandler.push('updated');
        } 
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }


    async move(folderId, droppedNoteId) {
        try {
            const { note } = await this.model.update('/moveNote', {'folder_id': folderId, 'note_id': droppedNoteId});
            this.view.renderDelete(note, false);
        } 
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }


    async delete(noteId, notify) {
        try {
            const { note } = await this.model.delete(`/note/${noteId}`);
            this.searchbar.deleteSearchItem(noteId);
            this.view.renderDelete(note);
            
            if (notify) {
                NotificationHandler.push('deleted', note.name)
            }
        } 
        catch(error) {
            NotificationHandler.push('error', null, error.message)
        }
    }


    async handleSearch(searchItemId, searchType) {
        const viewId = viewToLoad(searchType)
        if (viewId === 'editor') {
            const { note, location } = await this.getById(searchItemId)
            this.applicationController.initView(viewId, {
                editorObjectType: 'note', 
                editorObject: note,
                newEditorObject: false, 
                previousView: 'notes', 
                editorObjectLocation: location
            })
        }
        if (viewId === 'notes') {
            const { folder, location } = await this.applicationController.getFolderById(searchItemId);
            this.applicationController.initView(viewId, {
                folder: folder,
                location: location
            });
        }
    }

    async #initSearchbar() {
        const [noteSearchItems, folderSearchItems] = await Promise.all([
            this.getSearchItems(),
            this.applicationController.getFolderSearchItems()
        ]);
        this.searchbar.fillSearchbar('note', noteSearchItems);
        this.searchbar.fillSearchbar('folder', folderSearchItems);
    }
}