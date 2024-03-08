export class KeyEventListener {
    constructor(view) {
        this.view = view; 
        this.editorWrapper = document.querySelector('.editor-paper');
        this.saveKeyEvent();
    }

    saveKeyEvent() {
        this.editorWrapper.addEventListener("keydown", (event) => {
            if (event.ctrlKey && (event.key === "s" || event.keyCode === 83)) {
                // Prevent the default behavior (e.g., browser saving the page)
                event.preventDefault();

                const closeEditor = true;
                const checkForChanges = false;
                
                this.view.save(closeEditor, checkForChanges);
            }
        })
    }
}