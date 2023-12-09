export class TextEditorView {
    constructor() {
        this.HOST = document.querySelector('.editor-container')
        this._toolbar = document.querySelector('.ql-toolbar');
        this._editableEditor = document.querySelector('.ql-editor');
        this._editorBody = document.querySelector('#editor');
        this._saveButton = document.querySelector('.save-note-button');
        this._newNote = true;
    }

    render() {
        this.HOST.style.visibility = 'visible';
        this.HOST.style.top = '0%';
    }

    renderNoteContent(content) {
        this._editableEditor.innerHTML = content;
    }

    clearNoteContent() {
        this._editableEditor.innerHTML = '';
    }

    saveNote() {
        this.clearNoteContent()
        this.HOST.style.visibility = 'hidden';
        this.HOST.top = '100%';
    }
}