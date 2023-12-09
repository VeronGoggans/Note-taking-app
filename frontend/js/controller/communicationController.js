export class ComminucationController {
    constructor(folderController, noteController) {
        this.folderController = folderController;
        this.noteController = noteController;
    }

    folderToNoteCom(folderId) {
        this.noteController.getNotes(folderId);
    }

    noteToFolderCom() {
        this.folderController.getFolders();
    }

}