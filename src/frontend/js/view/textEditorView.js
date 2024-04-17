import { KeyEventListener } from "../eventListeners/keyEventListener.js";
import { TextFormatter } from "../textFormat/textFormatter.js"; 
import { getNoteHexColor } from "../util/backgroundColor.js";

export class TextEditorView {
  constructor(textEditorController, dialog) {
    this.textEditorController = textEditorController;
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
    this.noteContent = '';
    this.dialog = dialog;
    this.keyEventListener = new KeyEventListener(this);

    this.#attachEventListeners();
  }

  #attachEventListeners() {
    this.noteDropdown.addEventListener('click', () => {this.#toggleVisibleDropdown(this.noteDropdownOptions)});
    this.headingDropdown.addEventListener('click', () => {this.#toggleVisibleDropdown(this.headingDropdownOptions)});
    this.fontDropdown.addEventListener('click', () => {this.#toggleVisibleDropdown(this.fontDropdownOptions)});

    this.noteDetailsSpan.addEventListener('click', () => {this.dialog.renderNoteDetailsModal(this.#getNoteData())});
    this.deleteNoteSpan.addEventListener('click', () => {this.dialog.renderNoteDeleteModal(this.#getNoteData()[0], this.noteNameInput.value, this)});
    this.saveNoteSpan.addEventListener('click', () => {this.save(false, false)});
    this.newNoteSpan.addEventListener('click', () => {this.new()});
    this.noteBackgroundSpan.addEventListener('click', () => {this.dialog.renderNoteBackgroundModal(this.#getNoteData()[0], this.#getNoteData()[4], this)});
    this.editorPageStyleSpan.addEventListener('click', () => {this.updatePageStyle()});
  
    this.exitButton.addEventListener('click', () => {this.closeEditor()});
    this.saveButton.addEventListener('click', () => {this.save(true, false)});
    this.exportButton.addEventListener('click', () => {this.dialog.renderNoteExportModal(this)});

    this.linkButton.addEventListener('click', () => {TextFormatter.addLink()});
    this.codeBlockButton.addEventListener('click', () => {TextFormatter.addCodeBlock()});
    this.removeFormattingButton.addEventListener('click', () => {TextFormatter.removeFormatting()});
    this.embedVideoButton.addEventListener('click', () => {TextFormatter.addEmbedVideo()});
    this.foregroundColor.addEventListener('click', () => {this.#toggleVisibleDropdown(this.foregroundPalette)});
    this.backgroundColor.addEventListener('click', () => {this.#toggleVisibleDropdown(this.backgroundPalette)});
    this.foregroundPaletteColors.forEach(button => {
      button.addEventListener('click', () => {
          // Get the data-color attribute of the clicked div
          const COLOR = button.getAttribute('data-color');

          // Call the applyColor method with the color
          TextFormatter.addColor(COLOR, 'forecolor');
          this.#toggleVisibleDropdown(this.foregroundPalette);
      });
    });

    this.backgroundPaletteColors.forEach(button => {
      button.addEventListener('click', () => {
          // Get the data-color attribute of the clicked div
          let color = button.getAttribute('data-color');
          if (color === '#ffffff') {
              color = 'transparent';
          }

          // Call the applyColor method with the color
          TextFormatter.addColor(color, 'BackColor');
          this.#toggleVisibleDropdown(this.backgroundPalette);
      });
    });
  }



  /**
   * This method toggles the visibility of a specified dropdown,
   * by toggling the visibility style property.
   */
  #toggleVisibleDropdown(dropdownOptions) {
    dropdownOptions.style.visibility = dropdownOptions.style.visibility === 'visible' ? 'hidden' : 'visible';
  }

  #toggleEditorStyleSpanName() {
    let currentStyle = this.editorPageStyleSpan.innerHTML;
    this.editorPageStyleSpan.innerHTML = currentStyle === '<i class="fa-solid fa-pencil"></i>Original' ? '<i class="fa-solid fa-pencil"></i>Simple' : '<i class="fa-solid fa-pencil"></i>Original';
  }

  #closeDropdowns() {
    this.backgroundPalette.style.visibility = 'hidden';
    this.foregroundPalette.style.visibility = 'hidden';
    this.headingDropdownOptions.style.visibility = 'hidden';
    this.fontDropdownOptions.style.visibility = 'hidden';
    this.noteDropdownOptions.style.visibility = 'hidden';
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
   * This method closes the editor
   */
  #close() {
    this.textEditor.style.top = '100%';
    this.textEditor.style.visibility = 'hidden';
  }

  /**
   * This method removes all the content in the editor.
   */
  #clear() {
    this.noteContent = '';
    this.page.innerHTML = '';
    this.noteNameInput.value = '';
  }

  #resetEditorColor() {
    this.editor.style.cssText = "";
    this.page.style.cssText = "";
    this.page.style.cssText = "";
  }

  /**
   * This method closes the editor and clears all the data 
   */
  #closeAndClear() {
    this.#close();
    this.#closeDropdowns();
    this.#clear();
    this.#resetEditorColor();
    this.textEditorController.clearStoredNoteData();
  }

  /**
   * This method clears data from the current note 
   * and clears the editor for a new note
   */
  new() {
    this.textEditorController.clearStoredNoteData();
    this.#clear();
  }

  /**
   * This method opens a note inside the editor.
   * 
   * @param {String} content 
   * @param {String} name 
   */
  open(content, name, color) {
    this.noteContent = content;
    this.page.innerHTML = content;
    this.noteNameInput.value = name;
    this.noteNameInput.focus()
    TextFormatter.listenForLinkClicks(this.page);
    this.setEditorColor(color);
    this.show();
  }

  /**
   * Saves the content of the editor.
   * @param {boolean} closeEditor - Indicates if the editor should be closed or not.
   * @param {boolean} checkForChanges - Indicates if changes should be checked.
   */
  save(closeEditor = true, checkForChanges = true) {
    // Collect the content inside the text editor
    const noteData = this.#getNoteData();
    const content = this.page.innerHTML;
    const name = this.noteNameInput.value || 'untitled';
    const bookmark = noteData[3];
    const color = noteData[4];
    
    this.textEditorController.save(content, name, bookmark, color);
    if (closeEditor) {
      this.closeEditor(checkForChanges);
    } else {
      this.noteContent = this.page.innerHTML;
    }
  }

  /**
   * @returns a list of note data stored in the text editor model
   */
  #getNoteData() {
    return this.textEditorController.getStoredNoteData();
  }

  /**
   * This method hides the text editor,
   * by setting the visibility style property to hidden
   */
  closeEditor(checkForChanges = true) {
    if (checkForChanges) {
      // If no changes have been made, exit the editor
      if (this.noteContent === this.page.innerHTML) {
        this.#closeAndClear();
      } 
      else {
        // If changes have been made notify the user.
        this.dialog.renderForgotSaveModal(this);
      }
    } 
    else {
      this.#closeAndClear();
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
    this.#closeAndClear();
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

  setEditorColor(color) {
    const COLOR_OBJECT = getNoteHexColor(color);
    if (COLOR_OBJECT !== null) {
      this.editor.style.backgroundColor = COLOR_OBJECT.editor;
      this.page.style.backgroundColor = COLOR_OBJECT.paper;
      this.page.style.borderColor = COLOR_OBJECT.paper;
      this.page.style.color = '#383838';
    } else {
      this.#resetEditorColor();
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
    this.#clear();
  }

  /**
   * This method will toggle the page style.
   * from Original to Simple
   */
  async updatePageStyle() {
    await this.textEditorController.changeEditorPageStyle(false);
    this.#toggleEditorStyleSpanName();
  }
}