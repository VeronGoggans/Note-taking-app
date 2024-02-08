import { NoteModel } from "../model/noteModel.js";
import { NoteView } from "../view/noteView.js";

export class NoteController {
    constructor(applicationController, dialog) {
        this.applicationController = applicationController;
        this.noteView = new NoteView(this, dialog);
        this.noteModel = new NoteModel();
    }

    async getNotes(folderId) {
        const RESPONSE = await this.noteModel.getNotes('/notes', folderId);
        const NOTES = await RESPONSE.Object;
        this.noteView.renderNoteCards(NOTES);
    }

    async getNoteById(noteId) {
        const RESPONSE = await this.noteModel.getNoteById('/noteById', noteId);
        const NOTE = await RESPONSE.Note;
        const FOLDER_ID = await RESPONSE.Folder;
        return [NOTE, FOLDER_ID];
    }

    async addNote(folderId, content, name) {
        const RESPONSE = await this.noteModel.addNote('/note', folderId, content, name);
        let note = await RESPONSE.Note;
        // Swithing the path with the content
        note.content = content;
        // Rendering the new note in the note view
        this.noteView.renderNoteCard(note);
        // Adding the new note to the searchbar objects array
        this.addSearchObject(note.id, note.title);
    }

    async updateNote(noteId, name, content, bookmark) {
        const RESPONSE = await this.noteModel.updateNote('/note', noteId, name, content, bookmark);
        const NOTE = await RESPONSE.Note;
        this.noteView.renderNoteUpdate(NOTE);
        this.updateSearchObject(noteId, name);
    }

    async deleteNote(noteId) {
        const RESPONSE = await this.noteModel.deleteNote('/note', noteId);
        const NOTE = await RESPONSE.Note;
        this.noteView.removeNote(NOTE);
        this.deleteSearchObject(noteId);
    }

    // async deleteFolderContent(folderId) {
    //     await this.noteModel.deleteFolderContent('/notes', folderId);
    //     console.log('note controller says hi');
    // }

    
    /**
     * This method opens up the text editor
     * And puts the note the user clicked on, in the text editor.
     * 
     * @param {String} content is the content of the note.
     * @param {String} name is the name/title of the note. 
     */
    handleNoteCardClick(content, name, creation, lastEdit, noteId, bookmark) {
        this.applicationController.openNoteInTextEditor(content, name, creation, lastEdit, noteId, bookmark);
    }


    /**
     * This method will add a new note to the search bar's options
     * 
     * This method is called everytime a new note is created
     * 
     * @param {String} noteId 
     * @param {String} name 
     */
    addSearchObject(noteId, name) {
        this.applicationController.addSearchObject(noteId, name)
    }

    /**
     * This method will remove a search object from 
     * the search bar options
     * 
     * This method is called everytime a note gets deleted.
     * 
     * @param {String} noteId 
     */
    deleteSearchObject(noteId) {
        this.applicationController.deleteSearchObject(noteId);
    }

    /**
     * This method will update a search object from 
     * the search bar options
     * 
     * This method is called everytime a note gets updated.
     * 
     * @param {String} noteId 
     * @param {String} name 
     */
    updateSearchObject(noteId, name) {
        this.applicationController.updateSearchObject(noteId, name);
    }
}