import { TextEditorView } from "../view/textEditorView.js";
import { TextEditorModel } from "../model/textEditorModel.js";

export class TextEditorController {
    constructor(applicationController) {
        this.applicationController = applicationController;
        this.textEditorView = new TextEditorView(this);
        this.textEditorModel = new TextEditorModel();
    }

    showTextEditor() {
        this.textEditorView.show();
    }

    /**
     * This method tells the controller to open up a note inside the text editor.
     * 
     * @param {String} content 
     * @param {String} name 
     */
    openNoteInTextEditor(content, name) {
        this.textEditorView.open(content, name);
    }


    handleSaveButtonClick(content, name) {
        this.applicationController.createNote(content, name);
    }
}