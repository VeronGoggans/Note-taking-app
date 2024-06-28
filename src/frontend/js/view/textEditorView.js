import { KeyEventListener } from "../eventListeners/keyEventListener.js";
import { TextEditorEventListener } from "../eventListeners/textEditorEventListener.js";
import { TextFormatter } from "../textFormat/textFormatter.js"; 
import { getNoteHexColor } from "../util/backgroundColor.js";
import { formatDocumentLocation } from "../util/formatters.js";

export class TextEditorView {
  constructor(textEditorController, applicationController, dialog) {
    this.textEditorController = textEditorController;
    this.applicationController = applicationController;
    
    this.noteContent = '';
    this.dialog = dialog;
    this._initializeDOMElements();
    this._attachEventListeners();

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
    this.setEditorColor(object.color);
    this.show();
    this.page.focus();
    this._renderTemplatesOptions(allTemplateNames);
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

  async getSearchableNotes() {
    return await this.applicationController.getSearchObjects(); 
  }


  /**
   * This method will exit out of the editor 
   * without saving the user's prrogress
   * 
   * This method is called when the user has clicked 
   * on the exit button inside the 'You forgot to save warning modal'
   */
  exitNoSave() {
    this._closeEditorAndClearStoredData();
    this.dialog.hide();
  }

  /**
   * This method will exit ot of the editor 
   * after saving the the user's progres
   * 
   * This method is called when the user has clicked 
   * on the save button inside the 'You forgot to save warning modal'
   */
  exitBySave() {
    this.noteContent = this.page.innerHTML;
    this.dialog.hide();
    this.save(true, false);
  }

  /**
   * This method shows the text editor
   */
  show(allTemplateNames) {
    this.editor.scrollTop = 0;
    this.textEditor.style.visibility = 'visible';
    this.textEditor.style.top = '0%';
    this._renderTemplatesOptions(allTemplateNames);
  }

  
  new() {
    this.save(false, true)
    this._clear();
  }

  setEditorColor(color) {
    const colorObject = getNoteHexColor(color);
    if (colorObject !== null) {
      this.editor.style.backgroundColor = colorObject.editor;
      this.page.style.backgroundColor = colorObject.paper;
      this.page.style.borderColor = colorObject.paper;
      this.page.style.color = '#383838';
    } else {
      this._resetEditorColor();
    }
  }

  /**
   * This method will update the background color 
   * of the note currently in the editor.
   * 
   * The color is provided by the 'note background modal'
   * after a user clicks on a color.
   * 
   * @param {String} color 
   */
  async updateNoteColor(color) {
    this.setEditorColor(color);
    await this.textEditorController.updateNoteColor(color);
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

  /**
   * This method will toggle the page style.
   * from Original to Simple
   */
  async updatePageStyle() {
    await this.applicationController.setEditorPageStyle(false);
    this._toggleEditorStyleSpanName();
  }

  renderSearchModal() {
    this.dialog.renderSearchModal()
  }

  _renderTemplatesOptions(allTemplateNames) {
    console.log("nigga");
    let html = '';
    allTemplateNames.forEach(element => {
      html += `<li id=${element.id}>${element.name}</li>`;
    });
    this.templates.innerHTML = html;
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

  _resetEditorColor() {
    this.editor.style.cssText = "";
    this.page.style.cssText = "";
    this.page.style.cssText = "";
  }

  _closeEditorAndClearStoredData() {
    this._close();
    this._closeDropdowns();
    this._clear();
    this._resetEditorColor();
  }

  _toggleVisibleDropdown(dropdownOptions) {
    this._closeDropdowns(dropdownOptions);
    dropdownOptions.style.visibility = dropdownOptions.style.visibility === 'visible' ? 'hidden' : 'visible';
    dropdownOptions.style.opacity = dropdownOptions.style.opacity === '1' ? '0' : '1';
  }

  _toggleEditorStyleSpanName() {
    let currentStyle = this.editorPageStyleSpan.innerHTML;
    this.editorPageStyleSpan.innerHTML = currentStyle === 
    '<i class="fa-solid fa-pencil"></i>Original' ? 
    '<i class="fa-solid fa-pencil"></i>Simple' : 
    '<i class="fa-solid fa-pencil"></i>Original';
  }

  _closeDropdowns(target) {
    this.dropdownOptions.forEach((dropdown) => {
      if (dropdown !== target) {
        dropdown.style.visibility = 'hidden';
        dropdown.style.opacity = '0';
      }
    })
  }

  _initializeDOMElements() {
    // toolbar top
    this.documentLocation = document.querySelector('.document-location');
    this.noteNameInput = document.querySelector('.note-name-input');
    this.exitButton = document.querySelector('#exit-editor-btn');
    this.saveButton = document.querySelector('.save-note-btn');
    this.findButton = document.querySelector('#editor-search-btn');

    this.editorDropdown = document.querySelector('.editor-options-dropdown');
    this.editorDropdownOptions = this.editorDropdown.querySelector('.options');
    this.noteDetailsSpan = document.querySelector('.note-details-span');
    this.deleteNoteSpan = document.querySelector('.delete-note-span');
    this.saveNoteSpan = document.querySelector('.save-note-span');
    this.newNoteSpan = document.querySelector('.new-note-span');

    this.templateDropdown = document.querySelector('.templates-dropdown');
    this.templateDropdownOptions = this.templateDropdown.querySelector('.options');
    this.templates = document.querySelector('.templates-container');
    // this.noteBackgroundSpan = document.querySelector('.background-note-span');
    // this.editorPageStyleSpan = document.querySelector('.editor-page-style-span');

    // this.insertDropdown = document.querySelector('.insert-dropdown');
    // this.insertDropdownOptions = this.insertDropdown.querySelector('.options');

    // this.styleDropdown = document.querySelector('.style-dropdown');
    // this.styleDropdownOptions = this.styleDropdown.querySelector('.options');

    // toolbar bottom
    // this.headingButton = document.querySelector('.heading-button');
    // this.headingDropdown = document.querySelector('.heading-dropdown');
    // this.headingDropdownOptions = this.headingDropdown.querySelector('.options');

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
    this.dropdowns = [this.editorDropdown, this.templateDropdown]
    this.dropdownOptions = [this.editorDropdownOptions, this.templateDropdownOptions]
  }


  _attachEventListeners() {
    for (let i = 0; i < this.dropdowns.length; i++) {
      this.dropdowns[i].addEventListener('click', () => {this._toggleVisibleDropdown(this.dropdownOptions[i])});
    }

    this.noteDetailsSpan.addEventListener('click', () => {this.dialog.renderNoteDetailsModal(this._getStoredNoteData())});
    this.deleteNoteSpan.addEventListener('click', () => {this.dialog.renderDeleteModal(this._getStoredNoteData().id, this.noteNameInput.value, this)});
    this.saveNoteSpan.addEventListener('click', async () => {await this.save(false, false)});
    this.newNoteSpan.addEventListener('click', () => {this.new()});
    // this.noteBackgroundSpan.addEventListener('click', () => {this.dialog.renderNoteBackgroundModal(this._getStoredNoteData(), this)});
    // this.editorPageStyleSpan.addEventListener('click', () => {this.updatePageStyle()});
  
    this.exitButton.addEventListener('click', () => {this.closeEditor()});
    this.saveButton.addEventListener('click', async () => { await this.save(true, false)});
    this.page.addEventListener('click', () => {this._closeDropdowns()});

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