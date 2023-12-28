import { NoteDetailContainer } from "../components/noteDetailContainer.js";

export class TextEditorView {
  constructor() {
    this.fileDropdown = document.querySelector('.file-dropdown');
    this.fileDropdownOptions = this.fileDropdown.querySelector('.options');
    this.headingDropdown = document.querySelector('.heading-dropdown');
    this.headingDropdownOptions = this.headingDropdown.querySelector('.options');
    this.exitButton = document.querySelector('.exit-text-editor-btn');
    this.textEditor = document.querySelector('.editor-wrapper');
    this.page = document.querySelector('.editor');
    this.dialog = document.querySelector('.dialog');

    // File dropdown spans
    this.noteDetailsSpan = document.querySelector('.note-details-span');
    this.attachEventListeners();
  }

  attachEventListeners() {
    this.fileDropdown.addEventListener('click', () => {this.toggleVisibleDropdown(this.fileDropdownOptions)});
    this.headingDropdown.addEventListener('click', () => {this.toggleVisibleDropdown(this.headingDropdownOptions)});
    this.noteDetailsSpan.addEventListener('click', () => {this.renderNoteDetails()});
    this.exitButton.addEventListener('click', () => {this.removeTextEditor()});
  }

  /**
   * This method toggles the visibility of a specified dropdown,
   * by toggling the visibility style property.
   */
  toggleVisibleDropdown(dropdownOptions) {
    // Toggle visibility.
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
   * This method hides the text editor,
   * by setting the visibility style property to hidden
   */
  removeTextEditor() {
    // Turn text editor invisible
    this.textEditor.style.top = '100%';
    this.textEditor.style.visibility = 'hidden';
  }

  // The following methods are related to the file dropdown menu.
  /**
   * This method renders the note details container showing the following.
   * 1. Word count.
   * 2. When the note was created.
   * 3. The last time the not was edited.
   */
  renderNoteDetails() {
    this.dialog.appendChild(new NoteDetailContainer())
    this.renderDialog();
  }

  /**
     * This method renders the dialog.
     */
  renderDialog() {
    this.dialog.style.visibility = 'visible';
    this.dialog.style.top = '0%';
  }

  /**
   * This method removes the child of the dialog and the dialog itself from the UI.
   */
  removeDialog() {
      this.dialog.style.visibility = 'hidden';
      this.dialog.style.top = '100%';
      const CHILD = this.dialog.firstChild;
      this.dialog.removeChild(CHILD);
  }
}