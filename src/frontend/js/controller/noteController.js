import { HttpModel } from "../model/httpModel.js";
import { NoteView } from "../view/noteView.js";
import { Searchbar } from "../view/searchbar.js";
import { viewToLoad } from "../helpers/random.js";

export class NoteController {
    constructor(applicationController, dialog, notificationHandler) {
        this.dialog = dialog;
        this.notificationHandler = notificationHandler
        this.applicationController = applicationController;
        this.objectNum = 0;
        this.model = new HttpModel();
    }

    async init(folderId = 'f-1') {
        this.searchbar = new Searchbar(this);
        const noteSearchItems = await this.getSearchItems();
        const folderSearchItems = await this.applicationController.getFolderSearchItems();
        this.searchbar.fillSearchbar('note', noteSearchItems);
        this.searchbar.fillSearchbar('folder', folderSearchItems);
        this.view = new NoteView(this, this.applicationController, this.dialog, this.notificationHandler);
        this.getNotes(folderId);
    }

    async getNotes(folderId) {
        const response = await this.model.get(`/notes/${folderId}`);
        const notes = response[this.objectNum].notes;
        this.view.renderAll(notes);
    }

    async getSearchItems() {
        const response = await this.model.get('/noteSearchItems');
        return response[this.objectNum].notes
    }

    async addNote(folderId, name, content) {
        const response = await this.model.add('/note', {'folder_id': folderId,'name': name,'content': content});
        const newNote = response[this.objectNum].note;
        return newNote
    }

    async updateNote(note) {
        await this.model.update('/note', {
            'note_id': note.id,
            'name': note.name,
            'content': note.content,
            'bookmark': note.bookmark,
            'favorite': note.favorite
        });
    }

    async deleteNote(noteId) {
        const response = await this.model.delete(`/note/${noteId}`);
        const note = response[this.objectNum].note;
        this.view.renderDelete(note);
    }

    async moveNote(noteId, folderId) {
        const response = await this.model.update('/moveNote', {'folder_id': folderId, 'note_id': noteId});
        const note = response[this.objectNum].note;
        this.view.removeNote(note, false);
    }

    async handleSearch(searchItemId, searchType) {
        const viewId = viewToLoad(searchType)
        if (viewId === 'editor') {
            const response = await this.model.get(`/noteById/${searchItemId}`);
            const note = response[this.objectNum].note; 
            this.applicationController.initView(viewId, {
                editorObjectType: 'note', 
                editorObject: note,
                newEditorObject: false, 
                previousView: 'notes', 
            })
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