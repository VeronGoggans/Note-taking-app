import { headingsMap, arrowKeys } from "../constants/constants.js";


export class TextEditorEventListener {
    constructor(editorPage, editor) {
        this.editorPage = editorPage;
        editor.addEventListener('mouseup', () => {this.showToolbar()})
        this.editorPage.addEventListener('mouseup',  () => {this.showToolbar()});
        this.editorPage.addEventListener('keyup', () => {this.showToolbar()})
        document.querySelector('.editor').addEventListener('scroll', (e) => {this.removeToolbar(e)})
    }

    showToolbar() {
        const selection = window.getSelection();
          const container = document.querySelector('.rich-text-option-container');
          if (!selection.isCollapsed) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            container.style.top = `${rect.bottom + window.scrollY}px`;
            container.style.left = `${rect.left + window.scrollX}px`;
            container.style.display = 'flex';
          } else {
              container.style.display = 'none';
          }
      }
  
      removeToolbar() {
        const container = document.querySelector('.rich-text-option-container');
        container.style.display = 'none';
      }
}