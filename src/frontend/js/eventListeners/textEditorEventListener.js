import { PlacementHelper } from "../helpers/placementHelper.js";

export class TextEditorEventListener {
    constructor(editorPage, editor) {
      this.placementHelper = new PlacementHelper();

      this.formatBar = document.querySelector('.rich-text-option-container');
      this.forwardSlashCommandContainer = document.querySelector('.foreward-slash-command-container');
      this.editor = editor;
      this.editorPage = editorPage;
      this.forwardSlashKeyCode = 191;

      this.#eventListeners();
    }


    showToolbar() {
      const selection = window.getSelection();
      if (!selection.isCollapsed) {
        this.placementHelper.placeFormatBar(selection);
        this.formatBar.style.display = 'flex';
      } else {
        this.formatBar.style.display = 'none';
      }
    }


    showForwardSlashCommandContainer() {
      const selection = window.getSelection();
      if (selection.isCollapsed) {
        this.placementHelper.placeCommandBar(selection);
        this.forwardSlashCommandContainer.style.display = 'flex';
        this.forwardSlashCommandContainer.scrollTop = 0;
      } else {
        this.forwardSlashCommandContainer.style.display = 'none';
      }
    }


    removeForwardSlashCommandContainer() {
      if (this.forwardSlashCommandContainer.style.display === 'flex') {
        this.forwardSlashCommandContainer.style.display = 'none';
      }
    }


    removeToolbar() {
      this.formatBar.style.display = 'none';
    }


    removeSpawnables() {
      this.removeForwardSlashCommandContainer();
      this.removeToolbar();
    }


    checkForForwardSlash(event) {
      if (event.keyCode === this.forwardSlashKeyCode) {
        this.showForwardSlashCommandContainer();
      }
    }

    /**
     * This method will check if the Enter key is pressed inside 
     * of a Heading. If so, this method will step out of the heading.
     * If not the method will insert a <br> tag to got to the next line 
     */
    headingCheck() {
      if (event.key === 'Enter') {
        const range = window.getSelection().getRangeAt(0);
        let node = range.startContainer;

        // Traverse up the DOM to check if any parent is a header
        while (node) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (/^H[1-6]$/.test(node.nodeName)) {
              return
            }
          }
          node = node.parentNode;
        }
        document.execCommand('insertLineBreak')
        event.preventDefault();
      }
    }


    #eventListeners() {
      this.editor.addEventListener('mouseup', () => {this.showToolbar()});
      this.editor.addEventListener('scroll', () => {this.removeSpawnables()});
      this.editorPage.addEventListener('mouseup',  () => {this.showToolbar()});
      this.editorPage.addEventListener('keyup', () => {this.showToolbar()});
      this.editorPage.addEventListener('keyup', (event) => {this.checkForForwardSlash(event)});
      this.editorPage.addEventListener('keydown', (event) => {this.headingCheck(event)});
      this.editorPage.addEventListener('click', () => {this.removeForwardSlashCommandContainer()});
    }
}