import { NoteModel } from "../model/noteModel.js";
import { NoteView } from "../view/noteView.js";
import { Searchbar } from "../view/searchbar.js";
import { viewToLoad } from "../helpers/random.js";

export class NoteController {
    constructor(applicationController, dialog, notificationHandler) {
        this.dialog = dialog;
        this.notificationHandler = notificationHandler
        this.applicationController = applicationController;
        this.objectNum = 0;
        this.model = new NoteModel();
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
        const response = await this.model.add('/note', folderId, name, content);
        const newNote = response[this.objectNum].note;
        return newNote
    }

    async updateNote(note) {
        await this.model.update('/note', note);
    }

    async deleteNote(noteId) {
        const response = await this.model.delete('/note', noteId);
        const note = response[this.objectNum].note;
        this.view.renderDelete(note);
    }

    async moveNote(noteId, folderId) {
        const response = await this.model.moveNote('/moveNote', noteId, folderId);
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