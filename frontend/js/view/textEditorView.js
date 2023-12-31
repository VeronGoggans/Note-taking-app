import { NoteDetailContainer } from "../components/noteDetailContainer.js";

export class TextEditorView {
  constructor(textEditorController) {
    this.textEditorController = textEditorController;
    // toolbar top
    this.noteNameInput = document.querySelector('.note-name-input');

    // toolbar middle
    this.noteDropdown = document.querySelector('.file-dropdown');
    this.noteDropdownOptions = this.noteDropdown.querySelector('.options');
    this.noteDetailsSpan = document.querySelector('.note-details-span');

    this.exitButton = document.querySelector('.exit-text-editor-btn');
    this.saveButton = document.querySelector('.save-note-btn');

    // toolbar bottom
    this.headingButton = document.querySelector('.heading-button');
    this.headingDropdown = document.querySelector('.heading-dropdown');
    this.headingDropdownOptions = this.headingDropdown.querySelector('.options');
    this.pxUpButton = document.querySelector('.add-1px-btn');
    this.pxDownButton = document.querySelector('.subtract-1px-btn');
    this.fontSizeInput = document.querySelector('.font-size-input');

    // other
    this.textEditor = document.querySelector('.editor-wrapper');
    this.page = document.querySelector('.editor');
    this.dialog = document.querySelector('.dialog');

    this.attachEventListeners();
  }

  attachEventListeners() {
    this.noteDropdown.addEventListener('click', () => {this.toggleVisibleDropdown(this.noteDropdownOptions)});
    this.headingDropdown.addEventListener('click', () => {this.toggleVisibleDropdown(this.headingDropdownOptions)});
    this.noteDetailsSpan.addEventListener('click', () => {this.renderNoteDetails()});
    this.exitButton.addEventListener('click', () => {this.removeTextEditor()});
    this.saveButton.addEventListener('click', () => {this.handleSaveButtonClick()})
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
   * This method opens a note inside the text editor.
   * 
   * @param {String} content 
   * @param {String} name 
   */
  open(content, name) {
    this.page.innerHTML = content;
    this.noteNameInput.value = name;
    this.show();
  }

   /**
   * This method removes all the content in the text editor.
   */
   clear() {
    this.page.innerHTML = '';
    this.noteNameInput.value = '';
  }

  handleSaveButtonClick() {
    const CONTENT = this.page.innerHTML;
    let name = this.noteNameInput.value;
    if (name === '') name = 'untitled';
    this.removeTextEditor();
    this.textEditorController.handleSaveButtonClick(CONTENT, name);
  }

  /**
   * This method hides the text editor,
   * by setting the visibility style property to hidden
   */
  removeTextEditor() {
    // Turn text editor invisible
    this.textEditor.style.top = '100%';
    this.textEditor.style.visibility = 'hidden';
    this.clear();
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

  /**
   * This method surrounds the selected text with the selected heading value.
   * 
   * @param {String} heading the heading value the selected text should be. 
   */
  heading(heading) {
    // get the new heading value from the button
    this.headingButton.textContent = heading;

    // turn the human readable heading into the code version
    let headingFormat = this.headingFormat(heading);
    if (window.getSelection) {
      let selection = window.getSelection();
      if (selection.rangeCount > 0) {
        let range = selection.getRangeAt(0);
        
        // Create an h1 element
        let h1Element = document.createElement(headingFormat);
        
        // Surround the selected text with the h1 element
        range.surroundContents(h1Element);
        
        // Clear the selection (optional, depends on your use case)
        selection.removeAllRanges();
      }
    }
  }

  headingFormat(heading) {
    let headingFormat = '';
    if (heading === 'Heading 1') headingFormat = 'h1'
    else if (heading === 'Heading 2') headingFormat = 'h2';
    else if (heading === 'Heading 3') headingFormat = 'h3';
    else if (heading === 'Heading 4') headingFormat = 'h4';
    else if (heading === 'Heading 5') headingFormat = 'h5';
    else if (heading === 'Heading 6') headingFormat = 'h6';
    return headingFormat;
  }
}