import { TextFormatter } from "../textFormat/textFormatter.js"; 
import { Dialog } from "../util/dialog.js"; 

export class TextEditorView {
  constructor(textEditorController) {
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

    // toolbar bottom
    this.headingButton = document.querySelector('.heading-button');
    this.headingDropdown = document.querySelector('.heading-dropdown');
    this.headingDropdownOptions = this.headingDropdown.querySelector('.options');
    
    this.linkButton = document.querySelector('.link-btn');
    this.paragrapghButton = document.querySelector('.paragraph-btn');
    this.lineBreakButton = document.querySelector('.hr-btn');
    this.embedVideoButton = document.querySelector('.video-btn');
    this.foregroundColor = document.querySelector('.foreground-color-picker');
    this.backgroundColor = document.querySelector('.background-color-picker');
    this.foregroundPalette = document.querySelector('.foreground-color-palette');
    this.foregroundPaletteColors = this.foregroundPalette.querySelectorAll('.soft-colors button, .dark-colors button');
    this.backgroundPalette = document.querySelector('.background-color-palette');
    this.backgroundPaletteColors = this.backgroundPalette.querySelectorAll('.soft-colors button, .dark-colors button');

    // other
    this.textEditor = document.querySelector('.editor-wrapper');
    this.page = document.querySelector('.editor');
    this.noteContent = '';
    this.dialog = new Dialog();

    this.attachEventListeners();
  }

  attachEventListeners() {
    this.noteDropdown.addEventListener('click', () => {this.toggleVisibleDropdown(this.noteDropdownOptions)});
    this.headingDropdown.addEventListener('click', () => {this.toggleVisibleDropdown(this.headingDropdownOptions)});


    this.noteDetailsSpan.addEventListener('click', () => {this.dialog.renderNoteDetails(this.#getNoteData())});
    this.deleteNoteSpan.addEventListener('click', () => {this.renderNoteDeleteContainer()});
    this.saveNoteSpan.addEventListener('click', () => {this.save()});
    this.newNoteSpan.addEventListener('click', () => {this.save(false)});

  
    this.exitButton.addEventListener('click', () => {this.removeTextEditor()});
    this.saveButton.addEventListener('click', () => {this.save()});


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
    // Key bindings
    //  document.addEventListener('keydown', (event) => {
    //   if (event.key === 's' && event.ctrlKey) {
    //     if (this.textEditor.style.top === '0%') {
    //       this.save();
    //     }
    //   }
    // });
  }



  /**
   * This method toggles the visibility of a specified dropdown,
   * by toggling the visibility style property.
   */
  toggleVisibleDropdown(dropdownOptions) {
    dropdownOptions.style.visibility = dropdownOptions.style.visibility === 'visible' ? 'hidden' : 'visible';
  }

  /**
   * This method shows the text editor,
   * by setting the visibility style property to visible
   */
  show() {
    // Turn text editor visible
    this.textEditor.style.visibility = 'visible';
    this.textEditor.style.top = '0%';
  }

  /**
   * This method opens a note inside the text editor.
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
   * This method removes all the content in the text editor.
   */
  clear() {
    this.noteContent = '';
    this.page.innerHTML = '';
    this.noteNameInput.value = '';
  }

  /**
   *
   * @param {Boolean} closeEditor - 
   * indicates if the editor should be closed or not.
   */
  save(closeEditor = true) {
    // Collect the content inside the text editor
    const content = this.page.innerHTML;
    const name = this.noteNameInput.value || 'untitled';
    const bookmark = this.#getNoteData()[3];

    // Communicate with the text editor controller.
    this.textEditorController.save(content, name, bookmark);
    if (closeEditor) {
      this.removeTextEditor();
    } else {
      this.textEditorController.clearStoredNoteData();
      this.clear();
    }
  }

  renderNoteDeleteContainer() {
    const NOTE_DATA = this.#getNoteData();
    const ID = NOTE_DATA[0];
    this.dialog.addChild(new DeleteContainer(ID, this.noteNameInput.value, this))
    this.dialog.show();
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

  /**
   * 
   * @returns a list of note data stored in the text editor model
   */
  #getNoteData() {
    return this.textEditorController.getStoredNoteData();
  }

  /**
   * This method hides the text editor,
   * by setting the visibility style property to hidden
   */
  removeTextEditor() {
    // Turn text editor invisible
    if (this.noteContent === this.page.innerHTML) {
      this.textEditor.style.top = '100%';
      this.textEditor.style.visibility = 'hidden';
      this.clear();
      this.textEditorController.clearStoredNoteData();
    } else {
      this.dialog.renderForgotSaveContainer(this);
    }
  }

  exitNoSave() {
    this.textEditor.style.top = '100%';
    this.textEditor.style.visibility = 'hidden';
    this.clear();
    this.textEditorController.clearStoredNoteData();
    this.dialog.hide();
    this.noteContent = '';
  }

  exitBySave() {
    this.noteContent = this.page.innerHTML;
    this.dialog.hide();
    this.save();
  }
}