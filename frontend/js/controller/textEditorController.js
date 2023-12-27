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
}