import { ApplicationModel } from "../model/applicationModel.js";
import { FolderController } from "./folderController.js";
import { SubfolderController } from "./subfolderController.js";
import { NoteController } from "./noteController.js";
import { ApplicationView } from "../view/applicationView.js";
import { TextEditorController } from "./textEditorController.js"

export class ApplicationController {
    constructor() {
        this.applicationView = new ApplicationView(this);
        this.applicationModel = new ApplicationModel();
        this.folderController = new FolderController(this);
        this.subfolderController = new SubfolderController(this);
        this.noteController = new NoteController(this);
        this.textEditorController = new TextEditorController(this);
    }


    /**
     * This method starts the application by fetching the root folders.
     * 
     * This method is called when the app starts.
     */
    async start() {
        await this.folderController.getFolders();
        const RESPONSE = await this.applicationModel.getSearchOptions('/noteSearchObjects');
        this.applicationView.giveSearchOptions(RESPONSE.Notes);
        this.applicationView.renderSearchOptions(RESPONSE.Notes);
    }

    /**
     * This method returns the user to the homescreen, by fetching the root folders again.
     * This method also removes the folder id list.
     * 
     * This method is called when the homescreen button is clicked.
     */
    navigateToHomescreen() {
        this.folderController.getFolders();
        this.applicationModel.clearFolderIdlist();
    }

    /**
     * This method returns the current folder ID
     * by calling the application model to retrieve it.
     * 
     * This method is called when
     * 
     * @returns {String} The current folder ID.
     */
    getCurrentFolderID() {
        return this.applicationModel.getCurrentFolderID();
    }

    async addSubfolder(name, parentID) {
        await this.subfolderController.addSubfolder(name, parentID);
    }

    async addFolder(name) {
        await this.folderController.addFolder(name);
    }

    /**
     * This method handle the create folder button click
     * 
     * This method is called by the application view. 
     * @param {String} name 
     */
    async handleAddFolder(name) {
        const CURRENT_FOLDER = this.applicationModel.getCurrentFolderID();
        if (CURRENT_FOLDER === undefined) await this.addFolder(name);
        else await this.addSubfolder(name, CURRENT_FOLDER);
    }

    
    navigateOutofFolder() {
        const PARENT_ID = this.applicationModel.removeFolderIdFromList();
        if (PARENT_ID === undefined) {
            this.navigateToHomescreen();
            this.noteController.clearNotObjectsList();
        }
        else {
            this.navigateIntoFolder(PARENT_ID, 'all');
            this.noteController.clearNotObjectsList();
        }
    }

    navigateIntoFolder(folderId, noteType) {
        this.subfolderController.getSubFolders(folderId);
        this.noteController.getNotes(folderId, noteType);
        this.applicationModel.addFolderIdToList(folderId);
    }

    showTextEditor() {
        this.textEditorController.showTextEditor();
    }

    /**
     * This method retrieves a spicific note
     * 
     * This method retrieves the note that has been 
     * clicked on in the search bar and then opens 
     * the note in the text editor 
     * 
     * @param {String} noteId 
     */
    async getSearchedNote(noteId) {
        const RESPONSE = await this.noteController.getNoteById(noteId);
        const CONTENT = await RESPONSE.content;
        const NAME = await RESPONSE.title;
        const CREATION = await RESPONSE.creation;
        const LAST_EDIT = await RESPONSE.last_edit;
        this.openNoteInTextEditor(CONTENT, NAME, CREATION, LAST_EDIT, noteId, false);
    }

    /**
     * This method opens up the text editor
     * And puts the note the user clicked on, in the text editor.
     * 
     * @param {String} content is the content of the note.
     * @param {String} name is the name/title of the note. 
     */
    openNoteInTextEditor(content, name, creation, lastEdit, noteId, bookmark) {
        this.textEditorController.openNoteInTextEditor(content, name, creation, lastEdit, noteId, bookmark);
    }


    /**
     * This method adds a note to the backend.
     * 
     * This method is called when the save button inside the text editor 
     * is clicked for a new note.
     * 
     * @param {String} content 
     * @param {String} name 
     */
    createNote(content, name) {
        const CURRENT_FOLDER_ID = this.applicationModel.getCurrentFolderID();
        this.noteController.addNote(CURRENT_FOLDER_ID, content, name);
    }

    /**
     * This method updates a note.
     * 
     * This method is called when the save button inside the text editor
     * is clicked for an existing note 
     * 
     * @param {String} noteId 
     * @param {String} name 
     * @param {String} content 
     * @param {String} bookmark 
     */
    changeNote(noteId, name, content, bookmark) {
        this.noteController.updateNote(noteId, name, content, bookmark);
    }
}