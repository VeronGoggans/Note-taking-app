import { KeyEventListener } from "../eventListeners/keyEventListener.js";
import { TextEditorEventListener } from "../eventListeners/textEditorEventListener.js";
import { DropdownHelper } from "../helpers/dropdownHelper.js";
import { TextFormatter } from "../textFormat/textFormatter.js"; 
import { formatDocumentLocation } from "../util/formatters.js";
import { TextBlockHandler } from "../textFormat/textBlockHandler.js";

export class TextEditorView {
  constructor(textEditorController, applicationController, dialog) {
    this.textEditorController = textEditorController;
    this.applicationController = applicationController;
    
    this.noteContent = '';
    this.dialog = dialog;
    this._initializeDOMElements();
    this._attachEventListeners();

    this.textBlockParser = new TextBlockHandler(this.page);
    this.dropdownHelper = new DropdownHelper(this);
    this.keyEventListener = new KeyEventListener(this);
    this.textEditorEventListener = new TextEditorEventListener(this.page, this.editor);
  }

  /**
   * This method opens a note or template 
   * inside the editor.
   * 
   * @param {Object} object - could be a Note or Template object
   */
  open(object, allFolderNames, allTemplateNames) {
    this.noteContent = object.content;
    this.page.innerHTML = object.content;
    this.noteNameInput.value = object.name;
    formatDocumentLocation(allFolderNames, this.documentLocation)
    TextFormatter.listenForLinkClicks(this.page);
    TextFormatter.listenForNoteLinkClicks(this.page, this.applicationController);
    this.textBlockParser.parse();
    this.show(allFolderNames, allTemplateNames);
  }

  /**
   * Saves the content of the editor.
   * @param {boolean} closeEditor - Indicates if the editor should be closed or not.
   * @param {boolean} checkForChanges - Indicates if changes should be checked.
   */
  async save(closeEditor = true, checkForChanges = true) {
    const name = this.noteNameInput.value || 'untitled';
    const content = this.page.innerHTML;
    await this.textEditorController.save(name, content);

    if (closeEditor) {
      this.closeEditor(checkForChanges);
    }
    else {
      this.noteContent = content;
    }
  }


  /**
   * This method will check for changes before closing the editor.
   * If changes have been found they will be saved. If no changes have been 
   * found the method just closes the editor. 
   * @param {Boolean} checkForChanges 
   */
  closeEditor(checkForChanges = true) {
    if (checkForChanges && this.noteContent !== this.page.innerHTML) {
      this.dialog.renderForgotSaveModal(this);
    } else {
      this._closeEditorAndClearStoredData();
    }
  } 


  /**
   * This method shows the text editor
   */
  show(allFolderNames, allTemplateNames) {
    formatDocumentLocation(allFolderNames, this.documentLocation);
    this.dropdownHelper.renderTemplatesDropdown(allTemplateNames);
    this.editor.scrollTop = 0;
    this.textEditor.style.visibility = 'visible';
    this.textEditor.style.top = '0%';
    this.page.focus();
  }


  async loadInTemplate(templateId) {
    const templateContent = await this.applicationController.getTemplateById(templateId);
    this.page.innerHTML = this.page.innerHTML += await templateContent.content;
  }


  async getSearchableNotes() {
    return await this.applicationController.getSearchObjects(); 
  }

  exitNoSave() {
    this._closeEditorAndClearStoredData();
    this.dialog.hide();
  }

  exitBySave() {
    this.noteContent = this.page.innerHTML;
    this.dialog.hide();
    this.save(true, false);
  }

  
  new() {
    this.save(false, true)
    this._clear();
  }

  /**
   * This method deletes a specific note from withing 
   * the text editor
   * 
   * This method is called when the confirm button 
   * inside the noteDeleteContainer is clicked.
   * 
   * @param {String} noteId 
   */
  async handleDeleteButtonClick(noteId) {
    await this.textEditorController.handleDeleteButtonClick(noteId);
    this._clear();
  }

  renderSearchModal() {
    this.dialog.renderSearchModal()
  }

  _getStoredNoteData() {
    return this.textEditorController.getStoredNoteData();
  }

  _close() {
    this.textEditor.style.top = '100%';
    this.textEditor.style.visibility = 'hidden';
  }

  /**
   * This method removes all the content in the editor.
   */
  _clear() {
    this.noteContent = '';
    this.page.innerHTML = '';
    this.noteNameInput.value = '';
    this.textEditorController.clearStoredNoteData();
  }


  _closeEditorAndClearStoredData() {
    this._close();
    this.dropdownHelper.closeDropdowns();
    this._clear();
    this.textEditorEventListener.removeToolbar();
  }



  _initializeDOMElements() {
    // toolbar top
    this.documentLocation = document.querySelector('.document-location');
    this.noteNameInput = document.querySelector('.note-name-input');
    this.exitButton = document.querySelector('#exit-editor-btn');
    this.saveButton = document.querySelector('.save-note-btn');
    this.findButton = document.querySelector('#editor-search-btn');

    this.noteDetailsSpan = document.querySelector('.note-details-span');
    this.deleteNoteSpan = document.querySelector('.delete-note-span');
    this.saveNoteSpan = document.querySelector('.save-note-span');
    this.newNoteSpan = document.querySelector('.new-note-span');
    // toolbar bottom
  

    // this.fontButton = document.querySelector('.font-button');
    // this.fontDropdown = document.querySelector('.font-dropdown');
    // this.fontDropdownOptions = document.querySelector('.font-options');
    
    this.linkButton = document.querySelector('.link-btn');
    this.codeBlockButton = document.querySelector('.code-block-btn');
    this.horizontalRuleButton = document.querySelector('.hr-btn');
    this.linkNoteButton = document.querySelector('.link-note-btn');
    this.removeFormattingButton = document.querySelector('.remove-formatting-btn');
    this.embedVideoButton = document.querySelector('.video-btn');
    this.foregroundColor = document.querySelector('.foreground-color-picker');
    this.backgroundColor = document.querySelector('.background-color-picker');
    // this.foregroundPalette = document.querySelector('.foreground-color-palette');
    // this.foregroundPaletteColors = this.foregroundPalette.querySelectorAll('.nature-colors button, .sunset-colors button, .neon-colors button, .text-colors button');
    // this.backgroundPalette = document.querySelector('.background-color-palette');
    // this.backgroundPaletteColors = this.backgroundPalette.querySelectorAll('.nature-colors button, .sunset-colors button, .neon-colors button, .text-colors button');

    // other
    this.textEditor = document.querySelector('.editor-wrapper');
    this.editor = document.querySelector('.editor');
    this.page = document.querySelector('.editor-paper');
  }


  _attachEventListeners() {
    this.noteDetailsSpan.addEventListener('click', () => {this.dialog.renderNoteDetailsModal(this._getStoredNoteData())});
    this.deleteNoteSpan.addEventListener('click', () => {this.dialog.renderDeleteModal(this._getStoredNoteData().id, this.noteNameInput.value, this)});
    this.saveNoteSpan.addEventListener('click', async () => {await this.save(false, false)});
    this.newNoteSpan.addEventListener('click', () => {this.new()});
  
    this.exitButton.addEventListener('click', () => {this.closeEditor()});
    this.saveButton.addEventListener('click', async () => { await this.save(true, false)});
    this.page.addEventListener('click', () => {this.dropdownHelper.closeDropdowns()});

    this.findButton.addEventListener('click', () => {this.renderSearchModal()});
    // this.linkButton.addEventListener('click', () => {TextFormatter.addLink()});
    // this.codeBlockButton.addEventListener('click', () => {TextFormatter.addCodeBlock()});
    // this.horizontalRuleButton.addEventListener('click', () => (TextFormatter.addHorizontalRule()));
    // this.linkNoteButton.addEventListener('click', async () => {this.dialog.renderNoteLinkModal(this, await this.getSearchableNotes(), this.page, this.applicationController, this.dialog)});
    // this.embedVideoButton.addEventListener('click', () => {TextFormatter.addEmbedVideo()});
    
    // this.foregroundPaletteColors.forEach(button => {
    //   button.addEventListener('click', () => {
    //       const COLOR = button.style.backgroundColor;
    //       TextFormatter.addColor(COLOR, 'forecolor');
    //       this._toggleVisibleDropdown(this.foregroundPalette);
    //   });
    // });

    // this.backgroundPaletteColors.forEach(button => {
    //   button.addEventListener('click', () => {
    //       // Get the data-color attribute of the clicked div
    //       let color = button.style.backgroundColor;
    //       if (color === '#ffffff') {
    //           color = 'transparent';
    //       }
    //       TextFormatter.addColor(color, 'BackColor');
    //       this._toggleVisibleDropdown(this.backgroundPalette);
    //   });
    // });    
  }
}