import { KeyEventListener } from "../eventListeners/keyEventListener.js";
import { TextFormatter } from "../textFormat/textFormatter.js"; 

export class TextEditorView {
  constructor(textEditorController, dialog) {
    this.textEditorController = textEditorController;
    // toolbar top
    this.noteNameInput = document.querySelector('.note-name-input');
    this.exitButton = document.querySelector('.exit-text-editor-btn');
    this.saveButton = document.querySelector('.save-note-btn');

    this.noteDropdown = document.querySelector('.file-dropdown');
    this.noteDropdownOptions = this.noteDropdown.querySelector('.options');
    this.noteDetailsSpan = document.querySelector('.note-details-span');
    this.deleteNoteSpan = document.querySelector('.delete-note-span');
    this.saveNoteSpan = document.querySelector('.save-note-span');
    this.newNoteSpan = document.querySelector('.new-note-span');
    this.editorPageStyleSpan = document.querySelector('.editor-page-style-span');

    // toolbar bottom
    this.headingButton = document.querySelector('.heading-button');
    this.headingDropdown = document.querySelector('.heading-dropdown');
    this.headingDropdownOptions = this.headingDropdown.querySelector('.options');

    this.fontButton = document.querySelector('.font-button');
    this.fontDropdown = document.querySelector('.font-dropdown');
    this.fontDropdownOptions = document.querySelector('.font-options');
    
    this.linkButton = document.querySelector('.link-btn');
    this.paragrapghButton = document.querySelector('.paragraph-btn');
    this.lineBreakButton = document.querySelector('.hr-btn');
    this.embedVideoButton = document.querySelector('.video-btn');
    this.foregroundColor = document.querySelector('.foreground-color-picker');
    this.backgroundColor = document.querySelector('.background-color-picker');
    this.foregroundPalette = document.querySelector('.foreground-color-palette');
    this.foregroundPaletteColors = this.foregroundPalette.querySelectorAll('.nature-colors button, .sunset-colors button, .neon-colors button, .text-colors button');
    this.backgroundPalette = document.querySelector('.background-color-palette');
    this.backgroundPaletteColors = this.backgroundPalette.querySelectorAll('.nature-colors button, .sunset-colors button, .neon-colors button, .text-colors button');

    // other
    this.textEditor = document.querySelector('.editor-wrapper');
    this.page = document.querySelector('.editor-paper');
    this.noteContent = '';
    this.dialog = dialog;
    this.keyEventListener = new KeyEventListener(this);

    this.attachEventListeners();
  }

  attachEventListeners() {
    this.noteDropdown.addEventListener('click', () => {this.toggleVisibleDropdown(this.noteDropdownOptions)});
    this.headingDropdown.addEventListener('click', () => {this.toggleVisibleDropdown(this.headingDropdownOptions)});
    this.fontDropdown.addEventListener('click', () => {this.toggleVisibleDropdown(this.fontDropdownOptions)});

    this.noteDetailsSpan.addEventListener('click', () => {this.dialog.renderNoteDetails(this.#getNoteData())});
    this.deleteNoteSpan.addEventListener('click', () => {this.dialog.renderNoteDeleteContainer(this.#getNoteData()[0], this.noteNameInput.value, this)});
    this.saveNoteSpan.addEventListener('click', () => {this.save(false, false)});
    this.newNoteSpan.addEventListener('click', () => {this.new()});
    this.editorPageStyleSpan.addEventListener('click', () => {this.updatePageStyle()});
  
    this.exitButton.addEventListener('click', () => {this.closeEditor()});
    this.saveButton.addEventListener('click', () => {this.save(true, false)});

    this.linkButton.addEventListener('click', () => {TextFormatter.addLink()});
    this.paragrapghButton.addEventListener('click', () => {TextFormatter.addParagraph()});
    this.lineBreakButton.addEventListener('click', () => {TextFormatter.addLine()});
    this.embedVideoButton.addEventListener('click', () => {TextFormatter.addEmbedVideo()});
    this.foregroundColor.addEventListener('click', () => {this.toggleVisibleDropdown(this.foregroundPalette)});
    this.backgroundColor.addEventListener('click', () => {this.toggleVisibleDropdown(this.backgroundPalette)});
    this.foregroundPaletteColors.forEach(button => {
      button.addEventListener('click', () => {
          // Get the data-color attribute of the clicked div
          const COLOR = button.getAttribute('data-color');

          // Call the applyColor method with the color
          TextFormatter.addColor(COLOR, 'forecolor');
          this.toggleVisibleDropdown(this.foregroundPalette);
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
          this.toggleVisibleDropdown(this.backgroundPalette);
      });
    });
  }



  /**
   * This method toggles the visibility of a specified dropdown,
   * by toggling the visibility style property.
   */
  toggleVisibleDropdown(dropdownOptions) {
    dropdownOptions.style.visibility = dropdownOptions.style.visibility === 'visible' ? 'hidden' : 'visible';
  }

  toggleEditorStyleSpanName() {
    let currentStyle = this.editorPageStyleSpan.innerHTML;
    this.editorPageStyleSpan.innerHTML = currentStyle === '<i class="fa-regular fa-file"></i>Original' ? '<i class="fa-regular fa-file"></i>Simplist' : '<i class="fa-regular fa-file"></i>Original';
  }

  closeDropdowns() {
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
  close() {
    this.textEditor.style.top = '100%';
    this.textEditor.style.visibility = 'hidden';
  }

  /**
   * This method removes all the content in the editor.
   */
  clear() {
    this.noteContent = '';
    this.page.innerHTML = '';
    this.noteNameInput.value = '';
  }

  /**
   * This method closes the editor and clears all the data 
   */
  closeAndClear() {
    this.close();
    this.closeDropdowns();
    this.clear();
    this.textEditorController.clearStoredNoteData();
  }

  /**
   * This method clears data from the previous note 
   * and clears the editor
   */
  new() {
    this.textEditorController.clearStoredNoteData();
    this.clear();
  }

  /**
   * This method opens a note inside the editor.
   * 
   * @param {String} content 
   * @param {String} name 
   */
  open(content, name) {
    this.noteContent = content;
    this.page.innerHTML = content;
    this.noteNameInput.value = name;
    TextFormatter.listenForLinkClicks(this.page);
    this.show();
  }

  /**
   *
   * @param {Boolean} closeEditor - 
   * indicates if the editor should be closed or not.
   */
  save(closeEditor = true, checkForChanges = true) {
    // Collect the content inside the text editor
    const content = this.page.innerHTML;
    const name = this.noteNameInput.value || 'untitled';
    const bookmark = this.#getNoteData()[3];
    
    this.textEditorController.save(content, name, bookmark);
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
        this.closeAndClear();
        this.closeDropdowns();
      } else {
        // If changes have been made notify the user.
        this.dialog.renderForgotSaveContainer(this);
      }
    } else {
      this.closeAndClear();
      this.closeDropdowns();
    }
  }

  exitNoSave() {
    this.closeAndClear();
    this.dialog.hide();
  }

  exitBySave() {
    this.noteContent = this.page.innerHTML;
    this.dialog.hide();
    this.save(true, false);
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
    this.clear();
  }

  async updatePageStyle() {
    await this.textEditorController.changeEditorPageStyle(false);
    this.toggleEditorStyleSpanName();
  }
}