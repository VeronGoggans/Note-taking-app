import { PlacementHelper } from "../helpers/placementHelper.js";

export class TextEditorEventListener {
    constructor(editorPage, editor) {
      this.placementHelper = new PlacementHelper();
      this.formatBar = document.querySelector('.rich-text-option-container');
      this.editor = editor;
      this.editorPage = editorPage;

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
  
    removeToolbar() {
      this.formatBar.style.display = 'none';
    }


    #eventListeners() {
      this.editor.addEventListener('mouseup', () => {this.showToolbar()});
      this.editor.addEventListener('scroll', (e) => {this.removeToolbar(e)});
      this.editorPage.addEventListener('mouseup',  () => {this.showToolbar()});
      this.editorPage.addEventListener('keyup', () => {this.showToolbar()});
    }
}