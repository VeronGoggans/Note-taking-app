export class TextEditorView {
  constructor() {
    this.fileDropdown = document.querySelector('.file-dropdown');
    this.fileDropdownOptions = this.fileDropdown.querySelector('.options');
    this.headingDropdown = document.querySelector('.heading-dropdown');
    this.headingDropdownOptions = this.headingDropdown.querySelector('.options');
    this.textEditor = document.querySelector('.editor-wrapper');

    this.attachEventListeners();
  }

  attachEventListeners() {
    this.fileDropdown.addEventListener('click', () => {this.toggleVisibleDropdown(this.fileDropdownOptions)});
    this.headingDropdown.addEventListener('click', () => {this.toggleVisibleDropdown(this.headingDropdownOptions)});
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
   * by making the visibility style property visible
   */
  show() {
    // Make visible
    this.textEditor.style.visibility = 'visible';
  }
}