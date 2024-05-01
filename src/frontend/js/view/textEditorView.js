import { KeyEventListener } from "../eventListeners/keyEventListener.js";
import { DropdownHelper } from "../helpers/dropdownHelper.js";
import { TextFormatter } from "../textFormat/textFormatter.js"; 
import { getNoteHexColor } from "../util/backgroundColor.js";

export class TextEditorView {
  constructor(textEditorController, dialog) {
    this.textEditorController = textEditorController;
    
    this.noteContent = '';
    this.dialog = dialog;
    this.keyEventListener = new KeyEventListener(this);
    this.dropdownHelper = new DropdownHelper();

    this._initializeDOMElements();
    this._attachEventListeners();
  }

  /**
   * This method opens a note inside the editor.
   * 
   * @param {String} content - The content of the note 
   * @param {String} name - The name of the note
   * @param {String} color - the background colo of the note
   */
  open(content, name, color) {
    this.noteContent = content;
    this.page.innerHTML = content;
    this.noteNameInput.value = name;
    TextFormatter.listenForLinkClicks(this.page);
    this.setEditorColor(color);
    this.show();
    this.page.focus();
  }

  /**
   * Saves the content of the editor.
   * @param {boolean} closeEditor - Indicates if the editor should be closed or not.
   * @param {boolean} checkForChanges - Indicates if changes should be checked.
   */
  async save(closeEditor = true, checkForChanges = true) {
    const noteData = this._collectNoteData();
    const { content, name, bookmark, color } = noteData;    
    await this.textEditorController.save(content, name, bookmark, color);
    if (closeEditor) {
      this.closeEditor(checkForChanges);
    }
    else {
      this.noteContent = this.page.innerHTML;
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
  show() {
    // Turn text editor visible
    this.textEditor.style.visibility = 'visible';
    this.textEditor.style.top = '0%';
  }

  /**
   * This method clears data from the current note 
   * and clears the editor for a new note
   */
  new() {
    this.textEditorController.clearStoredNoteData();
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
  async handleConfirmButtonClick(noteId) {
    await this.textEditorController.clearStoredNoteData();
    await this.textEditorController.handleConfirmButtonClick(noteId);
    this._clear();
  }

  /**
   * This method will toggle the page style.
   * from Original to Simple
   */
  async updatePageStyle() {
    await this.textEditorController.changeEditorPageStyle(false);
    this._toggleEditorStyleSpanName();
  }

  async exportNote(format) {
    const NAME = this.noteNameInput.value;
    let content = null;
    if (format === 'txt') {
      content = this.page.innerText;
    } else {
      content = this.page.innerHTML;
    }
    await this.textEditorController.exportNote(format, NAME, content);
    this.dialog.hide();
  }

  /**
   * @returns a list of note data stored in the text editor model
   */
  _getNoteData() {
    return this.textEditorController.getStoredNoteData();
  }

  _collectNoteData() {
    const storedNoteData = this._getNoteData();
    return {
      content: this.page.innerHTML,
      name: this.noteNameInput.value || 'untitled',
      bookmark: storedNoteData[3],
      color: storedNoteData[4]
  };
  }

  /**
   * This method closes the editor
   */
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
  }

  _resetEditorColor() {
    this.editor.style.cssText = "";
    this.page.style.cssText = "";
    this.page.style.cssText = "";
  }

  /**
   * This method closes the editor and clears all the data 
   */
  _closeEditorAndClearStoredData() {
    this._close();
    this._closeDropdowns();
    this._clear();
    this._resetEditorColor();
    this.textEditorController.clearStoredNoteData();
  }

  /**
   * This method toggles the visibility of a specified dropdown,
   * by toggling the visibility style property.
   */
  _toggleVisibleDropdown(dropdownOptions) {
    dropdownOptions.style.visibility = dropdownOptions.style.visibility === 'visible' ? 'hidden' : 'visible';
    dropdownOptions.style.opacity = dropdownOptions.style.opacity === '1' ? '0' : '1';
  }

  _toggleEditorStyleSpanName() {
    let currentStyle = this.editorPageStyleSpan.innerHTML;
    this.editorPageStyleSpan.innerHTML = currentStyle === '<i class="fa-solid fa-pencil"></i>Original' ? '<i class="fa-solid fa-pencil"></i>Simple' : '<i class="fa-solid fa-pencil"></i>Original';
  }

  _closeDropdowns() {
    this.dropdowns.forEach((dropdown) => {
      dropdown.style.visibility = 'hidden';
      dropdown.style.opacity = '0';
    })
  }

  _initializeDOMElements() {
    // toolbar top
    this.noteNameInput = document.querySelector('.note-name-input');
    this.exitButton = document.querySelector('.exit-text-editor-btn');
    this.saveButton = document.querySelector('.save-note-btn');
    this.exportButton = document.querySelector('.export-note-button');

    this.noteDropdown = document.querySelector('.file-dropdown');
    this.noteDropdownOptions = this.noteDropdown.querySelector('.options');
    this.noteDetailsSpan = document.querySelector('.note-details-span');
    this.deleteNoteSpan = document.querySelector('.delete-note-span');
    this.saveNoteSpan = document.querySelector('.save-note-span');
    this.newNoteSpan = document.querySelector('.new-note-span');
    this.noteBackgroundSpan = document.querySelector('.background-note-span');
    this.editorPageStyleSpan = document.querySelector('.editor-page-style-span');

    // toolbar bottom
    this.headingButton = document.querySelector('.heading-button');
    this.headingDropdown = document.querySelector('.heading-dropdown');
    this.headingDropdownOptions = this.headingDropdown.querySelector('.options');

    this.fontButton = document.querySelector('.font-button');
    this.fontDropdown = document.querySelector('.font-dropdown');
    this.fontDropdownOptions = document.querySelector('.font-options');
    
    this.linkButton = document.querySelector('.link-btn');
    this.codeBlockButton = document.querySelector('.code-block-btn');
    this.removeFormattingButton = document.querySelector('.remove-formatting-btn');
    this.embedVideoButton = document.querySelector('.video-btn');
    this.foregroundColor = document.querySelector('.foreground-color-picker');
    this.backgroundColor = document.querySelector('.background-color-picker');
    this.foregroundPalette = document.querySelector('.foreground-color-palette');
    this.foregroundPaletteColors = this.foregroundPalette.querySelectorAll('.nature-colors button, .sunset-colors button, .neon-colors button, .text-colors button');
    this.backgroundPalette = document.querySelector('.background-color-palette');
    this.backgroundPaletteColors = this.backgroundPalette.querySelectorAll('.nature-colors button, .sunset-colors button, .neon-colors button, .text-colors button');

    // other
    this.textEditor = document.querySelector('.editor-wrapper');
    this.editor = document.querySelector('.editor');
    this.page = document.querySelector('.editor-paper');
    this.dropdowns = [this.noteDropdownOptions, this.headingDropdownOptions, this.fontDropdownOptions, this.foregroundPalette, this.backgroundPalette]
  }


  _attachEventListeners() {
    this.noteDropdown.addEventListener('click', () => {this._toggleVisibleDropdown(this.noteDropdownOptions)});
    this.headingDropdown.addEventListener('click', () => {this._toggleVisibleDropdown(this.headingDropdownOptions)});
    this.fontDropdown.addEventListener('click', () => {this._toggleVisibleDropdown(this.fontDropdownOptions)});

    this.noteDetailsSpan.addEventListener('click', () => {this.dialog.renderNoteDetailsModal(this._getNoteData())});
    this.deleteNoteSpan.addEventListener('click', () => {this.dialog.renderNoteDeleteModal(this._getNoteData()[0], this.noteNameInput.value, this)});
    this.saveNoteSpan.addEventListener('click', async () => {await this.save(false, false)});
    this.newNoteSpan.addEventListener('click', () => {this.new()});
    this.noteBackgroundSpan.addEventListener('click', () => {this.dialog.renderNoteBackgroundModal(this._getNoteData()[0], this._getNoteData()[4], this)});
    this.editorPageStyleSpan.addEventListener('click', () => {this.updatePageStyle()});
  
    this.exitButton.addEventListener('click', () => {this.closeEditor()});
    this.saveButton.addEventListener('click', async () => { await this.save(true, false)});
    this.exportButton.addEventListener('click', () => {this.dialog.renderNoteExportModal(this)});
    this.page.addEventListener('click', () => {this._closeDropdowns()});

    this.linkButton.addEventListener('click', () => {TextFormatter.addLink()});
    this.codeBlockButton.addEventListener('click', () => {TextFormatter.addCodeBlock()});
    this.removeFormattingButton.addEventListener('click', () => {TextFormatter.removeFormatting()});
    this.embedVideoButton.addEventListener('click', () => {TextFormatter.addEmbedVideo()});
    this.foregroundColor.addEventListener('click', () => {this._toggleVisibleDropdown(this.foregroundPalette)});
    this.backgroundColor.addEventListener('click', () => {this._toggleVisibleDropdown(this.backgroundPalette)});
    this.foregroundPaletteColors.forEach(button => {
      button.addEventListener('click', () => {
          const COLOR = button.getAttribute('data-color');
          TextFormatter.addColor(COLOR, 'forecolor');
          this._toggleVisibleDropdown(this.foregroundPalette);
      });
    });

    this.backgroundPaletteColors.forEach(button => {
      button.addEventListener('click', () => {
          // Get the data-color attribute of the clicked div
          let color = button.getAttribute('data-color');
          if (color === '#ffffff') {
              color = 'transparent';
          }
          TextFormatter.addColor(color, 'BackColor');
          this._toggleVisibleDropdown(this.backgroundPalette);
      });
    });    
  }
}