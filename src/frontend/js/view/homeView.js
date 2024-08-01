import { RecentFolder } from "../components/folder.js";
import { RecentNote } from "../components/note.js";
import { FolderObjectArray, NoteObjectArray } from "../util/array.js";
import { AnimationHandler } from "../handlers/animation/animationHandler.js";

export class HomeView {
    constructor(controller, applicationController, dialog, notificationHandler) {
        this.controller = controller;
        this.applicationController = applicationController;
        this.notificationHandler = notificationHandler;
        this.dialog = dialog;

        this.folderObjects = new FolderObjectArray();
        this.noteObjects = new NoteObjectArray()
        this.#initializeDomElements();
    }

    renderRecentFolders(folders) {
        this.folderObjects.clear(); 
        const contentFragment = document.createDocumentFragment();

        for (let i = 0; i < folders.length; i++) {
            const folderCard = this.#recentFolder(folders[i]);

            contentFragment.appendChild(folderCard);
            AnimationHandler.fadeInFromSide(folderCard);
        }
        this.recentFolderContainer.appendChild(contentFragment); 
    }


    renderRecentNotes(notes) {
        this.noteObjects.clear()
        const contentFragment = document.createDocumentFragment();

        for (let i = 0; i < notes.length; i++) {
            const noteCard = this.#recentNote(notes[i]);

            contentFragment.appendChild(noteCard);
            AnimationHandler.fadeInFromSide(noteCard);
        }
        this.recentNoteContainer.appendChild(contentFragment); 
    }

    handleNoteCardClick(noteId) {
        const note = this.noteObjects.get(noteId);
        this.applicationController.initView('editor', 
            {
                editorObjectType: 'note', 
                editorObject: note,
                newEditorObject: false, 
                previousView: 'home', 
            }
        );
    }

    handleFolderCardClick(folderId) {
        const folder = this.folderObjects.get(folderId);
        this.applicationController.initView('notes', {folder: folder});
    }


    #recentFolder(folder) {
        this.folderObjects.add(folder)
        return new RecentFolder(folder, this);
    }

    #recentNote(note) {
        this.noteObjects.add(note)
        return new RecentNote(note, this);
    }

    #initializeDomElements() {
        this.recentFolderContainer = document.querySelector('.recent-folders');
        this.recentNoteContainer = document.querySelector('.recent-notes');
    }
}