export class KeyEventListener {
    constructor(view) {
        this.view = view; 
        this.editorWrapper = document.querySelector('.editor-paper');
        this.eKeyCode = 69;
        this.nKeyCode = 78;
        this.sKeyCode = 83;
        this.saveKeyEvent();
        this.newKeyEvent();
        this.exitEditorKeyEvent();
    }

    saveKeyEvent() {
        this.editorWrapper.addEventListener("keydown", (event) => {
            if (event.ctrlKey && (event.key === "s" || event.keyCode === this.sKeyCode)) {
                // Prevent the default behavior (e.g., browser saving the page)
                event.preventDefault();

                const closeEditor = true;
                const checkForChanges = false;
                
                this.view.save(closeEditor, checkForChanges);
            }
        })
    }

    newKeyEvent() {
        this.editorWrapper.addEventListener("keydown", (event) => {
            if (event.ctrlKey && (event.key === "n" || event.keyCode === this.nKeyCode)) {
                event.preventDefault();
                
                this.view.new();
            }
        })
    }

    exitEditorKeyEvent() {
        this.editorWrapper.addEventListener("keydown", (event) => {
            if (event.ctrlKey && (event.key === "e" || event.keyCode === this.eKeyCode)) {
                event.preventDefault();

                this.view.closeEditor();
            }
        })
    }
}