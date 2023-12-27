export class TextEditorView {
  constructor() {
    this.fileDropdown = document.querySelector('.file-dropdown');
    this.fileDropdownOptions = this.fileDropdown.querySelector('.options');
    this.headingDropdown = document.querySelector('.heading-dropdown');
    this.headingDropdownOptions = this.headingDropdown.querySelector('.options');
    this.exitButton = document.querySelector('.exit-text-editor-btn');
    this.textEditor = document.querySelector('.editor-wrapper');

    this.attachEventListeners();
  }

  attachEventListeners() {
    this.fileDropdown.addEventListener('click', () => {this.toggleVisibleDropdown(this.fileDropdownOptions)});
    this.headingDropdown.addEventListener('click', () => {this.toggleVisibleDropdown(this.headingDropdownOptions)});
    this.exitButton.addEventListener('click', () => {this.removeTextEditor()});
  }

  /**
   * This method toggles the visibility of a specified dropdown,
   * by toggling the visibility style property.
   */
  toggleVisibleDropdown(dropdownOptions) {
    // Toggle visibility.
    console.log(dropdownOptions);
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
}