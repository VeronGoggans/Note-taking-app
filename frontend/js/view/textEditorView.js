import { NoteDetailContainer } from "../components/noteDetailContainer.js";
import { DeleteContainer } from "../components/deleteContainer.js";
import { CNode } from "../util/CNode.js";

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
    this.palette = document.querySelector('.color-palette');
    this.paletteColors = this.palette.querySelectorAll('.soft-colors button, .dark-colors button');

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
    this.deleteNoteSpan.addEventListener('click', () => {this.renderNoteDeleteContainer()});
    this.saveNoteSpan.addEventListener('click', () => {this.save()});
    this.newNoteSpan.addEventListener('click', () => {this.save(false)});
    this.exitButton.addEventListener('click', () => {this.removeTextEditor()});
    this.saveButton.addEventListener('click', () => {this.save()});
    this.linkButton.addEventListener('click', () => {this.addLink()});
    this.paragrapghButton.addEventListener('click', () => {this.addParagraph()});
    this.lineBreakButton.addEventListener('click', () => {this.addLineBreak()});
    this.embedVideoButton.addEventListener('click', () => {this.addEmbedInput()});
    this.foregroundColor.addEventListener('click', () => {this.toggleVisibleDropdown(this.palette)});
    this.paletteColors.forEach(button => {
      button.addEventListener('click', () => {
          // Get the data-color attribute of the clicked div
          const COLOR = button.getAttribute('data-color');

          // Call the applyColor method with the color
          this.applyColor(COLOR);
          this.toggleVisibleDropdown(this.palette);
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
    console.log(name);
    this.page.innerHTML = content;
    this.noteNameInput.value = name;
    this.listenForLinkClicks();
    this.show();
  }

   /**
   * This method removes all the content in the text editor.
   */
  clear() {
    this.page.innerHTML = '';
    this.noteNameInput.value = '';
  }

  /**
   * This method handles the save button click 
   * inside the text editor
   * 
   * This method communicates with the text editor controller 
   * that the save button has been clicked. 
   * @param {Boolean} closeEditor indicates if the editor should be closed or not.
   */
  save(closeEditor = true) {
    // Collect the content inside the text editor
    const CONTENT = this.page.innerHTML;

    // Collecting the notes bookmark value
    const STORED_NOTE_DATA = this.getNoteData();
    const BOOKMARK = STORED_NOTE_DATA[3];

    let name = this.noteNameInput.value;
    if (name === '') name = 'untitled';

    // Communicate with the text editor controller.
    this.textEditorController.save(CONTENT, name, BOOKMARK);
    if (closeEditor) this.removeTextEditor();
    if (!closeEditor) {
      this.textEditorController.clearStoredNoteData();
      this.clear();
    }
  }

  // The following methods are related to the file dropdown menu.

  /**
   * This method renders the note details container showing the following.
   * 1. Word count.
   * 2. When the note was created.
   * 3. The last time the not was edited.
   */
  renderNoteDetails() {
    const NOTE_DATA = this.getNoteData();
    console.log(NOTE_DATA);
    this.dialog.appendChild(new NoteDetailContainer(NOTE_DATA[1], NOTE_DATA[2]))
    this.renderDialog();
  }

  /**
   * This method renders the delete container from within the editor.
   */
  renderNoteDeleteContainer() {
    const NOTE_DATA = this.getNoteData();
    const ID = NOTE_DATA[0];
    this.dialog.appendChild(new DeleteContainer(ID, this.noteNameInput.value, this))
    this.renderDialog();
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
    await this.textEditorController.handleConfirmButtonClick(noteId);
    // clear the text editor.
    this.clear();
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

  // Methods communicating with the text editor controller.
  // Communicating <---


  /**
   * 
   * @returns a list of note data stored in the text editor model
   */
  getNoteData() {
    return this.textEditorController.getStoredNoteData();
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
    this.textEditorController.clearStoredNoteData();
  }


  // Toolbar button functionality 

  /**
   * This method listens for link clicks.
   * 
   * This method is usefull for when a note has <a> tags in them.
   * Because the <a> tags dont have eventlisteners on them when loaded in.
   * This method creates that event listener.
   */
  listenForLinkClicks() {
    const LINKS = this.page.querySelectorAll('a');
    LINKS.forEach(function(LINK) {
      LINK.addEventListener('click', () => {window.open(LINK.href)})
    });
  }

  addLink() {
    // Get the current selection 
    const SELECTION = window.getSelection();

    // Get the range of the selection
    const RANGE = SELECTION.getRangeAt(0);

    // Create a <a> element
    const LINK = document.createElement('a');

    LINK.addEventListener('click', () => {window.open(RANGE)});

    LINK.href = RANGE;

    // Surround the selected text with a <a> tag
    RANGE.surroundContents(LINK);

    SELECTION.removeRange(RANGE);
  }


  addParagraph() {
    // Get the current selection 
    const SELECTION = window.getSelection();

    // Get the range of the selection
    const RANGE = SELECTION.getRangeAt(0);

    // Create a <div> tag 
    const PARAGRAPH = document.createElement('div');
    PARAGRAPH.classList.add('paragraph');

    // Create a <p> tag
    const P = document.createElement('p');
    P.textContent = RANGE;
    PARAGRAPH.appendChild(P);

    // Creating a <br> tag to put below the <pre> tag.
    const BREAK = document.createElement('br');

    RANGE.insertNode(BREAK);
    RANGE.insertNode(PARAGRAPH);

    // Collapse the range
    RANGE.collapse(false);
  }


  addLineBreak() {
    // Get the current selection 
    const SELECTION = window.getSelection();

    // Get the range of the selection
    const RANGE = SELECTION.getRangeAt(0);

    const HR = document.createElement('hr');

    // Creating a <br> tag to put below the <pre> tag.
    const BREAK = document.createElement('br');

    RANGE.insertNode(BREAK);
    RANGE.insertNode(HR);

    // Collapse the range
    RANGE.collapse(false);
  }

  applyColor(color) {
    // Use document.execCommand to change text color
    document.execCommand('styleWithCSS', false, true);
    document.execCommand('foreColor', false, color);
  }


  addEmbedInput() {
    // Get the current selection 
    const SELECTION = window.getSelection();
    console.log(SELECTION);

    // Get the range of the selection
    const RANGE = SELECTION.getRangeAt(0);

    const EMBED_CONTAINER = CNode.create('div', {'class': 'insert-video-container'});
    const EMBED_INPUT = CNode.create('input', {'placeholder': 'Insert embed link here', 'type': 'text'});

    EMBED_CONTAINER.appendChild(EMBED_INPUT);

    EMBED_INPUT.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        RANGE.deleteContents();
        this.addEmbedVideo(EMBED_INPUT.value, RANGE);
      }
    })

    RANGE.insertNode(EMBED_CONTAINER);
    EMBED_CONTAINER.style.opacity = '100'
  }


  addEmbedVideo(embedLink, range) {
    const NO_COOKIES = 'youtube-nocookie';
    const IFRAME_CONTAINER = document.createElement('div');

    // adding nocookies text to the embed link for reduced cookies
    let iframeArray = embedLink.split('youtube');
    iframeArray.splice(1, 0, NO_COOKIES);

    const NO_COOKIE_IFRAME = iframeArray.join('');

    IFRAME_CONTAINER.innerHTML = NO_COOKIE_IFRAME;
    range.insertNode(IFRAME_CONTAINER);
  }
}