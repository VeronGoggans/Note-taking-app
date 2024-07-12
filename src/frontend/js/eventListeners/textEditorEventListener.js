import { PlacementHelper } from "../helpers/placementHelper.js";
import { AnimationHandler } from "../handlers/animation/animationHandler.js";

export class TextEditorEventListener {
    constructor(editorPage, editor, slashCommand) {
      this.placementHelper = new PlacementHelper();
      this.slashCommand = slashCommand;
      this.formatBar = document.querySelector('.rich-text-option-container');
      this.forwardSlashCommandContainer = document.querySelector('.foreward-slash-command-container');
      this.commandInputField = this.forwardSlashCommandContainer.querySelector('input'); 
      this.editor = editor;
      this.editorPage = editorPage;

      this.#eventListeners();
    }


    showToolbar() {
      const selection = window.getSelection();
      if (!selection.isCollapsed) {
        this.placementHelper.placeFormatBar(selection);
        AnimationHandler.fadeIn(this.formatBar);
      } else {
        AnimationHandler.fadeOut(this.formatBar);
      }
    }


    showForwardSlashCommandContainer() {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      
      if (selection.isCollapsed) {
        this.slashCommand.rememberRange(range);
        this.placementHelper.placeCommandBar(selection);
        AnimationHandler.fadeIn(this.forwardSlashCommandContainer);
        this.#deleteForwardSlash(range);
        this.commandInputField.focus();
      } else {
        AnimationHandler.fadeOut(this.forwardSlashCommandContainer)
      }
    }


    removeToolbar() {
      this.formatBar.style.display = 'none';
    }


    removeSpawnables() {
      AnimationHandler.fadeOut(this.forwardSlashCommandContainer)
      this.removeToolbar();
    }


    checkForForwardSlash(event) {
      if (event.key === '/') {
        this.showForwardSlashCommandContainer();
      }
    }

    /**
     * This method will check if the Enter key is pressed inside 
     * of a Heading. If so, this method will step out of the heading.
     * If not the method will insert a <br> tag to got to the next line 
     */
    headingCheck(event) {
      if (event.key === 'Enter') {
        const range = window.getSelection().getRangeAt(0);
        let node = range.startContainer;

        // Traverse up the DOM to check if any parent is a header
        while (node) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (/^H[1-6]$/.test(node.nodeName) || node.nodeName === 'OL' || node.nodeName === 'UL') {
              return
            }
          }
          node = node.parentNode;
        }
        document.execCommand('insertLineBreak')
        event.preventDefault();
      }
    }

    #deleteForwardSlash(range) {
      const caretNode = range.startContainer;
      const caretOffset = range.startOffset;
    
      // Check if caretNode is a text node and there is a character before the caret
      if (caretNode.nodeType === Node.TEXT_NODE && caretOffset > 0) {
        const textContent = caretNode.textContent;
        
        // Check if the character before the caret is a forward slash
        if (textContent[caretOffset - 1] === '/') {
          // Create a new range to select the forward slash
          const deleteRange = document.createRange();
          deleteRange.setStart(caretNode, caretOffset - 1);
          deleteRange.setEnd(caretNode, caretOffset);
    
          // Remove the forward slash
          deleteRange.deleteContents();
        }
      }
    }


    #eventListeners() {
      this.editor.addEventListener('mouseup', () => {this.showToolbar()});
      this.editor.addEventListener('scroll', () => {this.removeSpawnables()});
      this.editorPage.addEventListener('mouseup',  () => {this.showToolbar()});
      this.editorPage.addEventListener('keyup', () => {this.showToolbar()});
      this.editorPage.addEventListener('keyup', (event) => {this.checkForForwardSlash(event)});
      this.editorPage.addEventListener('keydown', (event) => {this.headingCheck(event)});
      this.editorPage.addEventListener('click', () => {AnimationHandler.fadeOut(this.forwardSlashCommandContainer)});
    }
}