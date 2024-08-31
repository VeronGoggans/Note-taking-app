import { KeyEventListener } from "../eventListeners/keyEventListener.js";
import { TextEditorEventListener } from "../eventListeners/textEditorEventListener.js";
import { DropdownHelper } from "../helpers/dropdownHelper.js";
import { TextFormatter } from "../textFormat/textFormatter.js"; 
import { formatDocumentLocation } from "../util/formatters.js";
import { TextBlockHandler } from "../textFormat/textBlockHandler.js";
import { SlashCommand } from "../textFormat/slashCommand.js";
import { AnimationHandler } from "../handlers/animation/animationHandler.js";
import { BaseView } from "../view/baseView.js"

export class TextEditorView extends BaseView {
  constructor(controller, applicationController) {
    super(controller);
    this.controller = controller;
    this.applicationController = applicationController;
    
    this.editorContent = '';
    this.#initializeDOMElements();
    this.#attachEventListeners();

    this.textFormatter = new TextFormatter();
    this.textBlockHandler = new TextBlockHandler(this.page);
    this.slashCommand = new SlashCommand(this, this.textFormatter);
    this.dropdownHelper = new DropdownHelper(this, this.dropdowns, this.dropdownOptions, this.templateList);
    this.keyEventListener = new KeyEventListener(this);
    this.textEditorEventListener = new TextEditorEventListener(this.page, this.editor, this.slashCommand);
    AnimationHandler.fadeInFromSide(this.textEditor)
  }

  /**
   * This method opens a note or template 
   * inside the editor.
   * 
   * @param {Object} object - could be a Note or Template object
   */
  open(object, allFolderNames, allTemplateNames) {
    this.editorContent = object.content;
    this.page.innerHTML = object.content;
    this.documentNameInput.value = object.name;

    formatDocumentLocation(allFolderNames, this.documentLocation)
    this.show(allFolderNames, allTemplateNames);
    this.textBlockHandler.parse();
  }

  /**
   * Saves the content of the editor.
   * @param {boolean} closeEditor - Indicates if the editor should be closed or not.
   * @param {boolean} checkForChanges - Indicates if changes should be checked.
   */
  async save(closeEditor = true, checkForChanges = true, notify = false, clearEditorObject = true) {
    const name = this.documentNameInput.value || 'untitled';
    const content = this.page.innerHTML;
    await this.controller.save(name, content, notify, clearEditorObject);

    if (closeEditor) {
      this.closeEditor(checkForChanges);
      return;
    }
    this.editorContent = content;
  }

  /**
   * This method will check for changes before closing the editor.
   * If changes have been found they will be saved. If no changes have been 
   * found the method just closes the editor. 
   * @param {Boolean} checkForChanges 
   */
  closeEditor(checkForChanges = true) {
    if (checkForChanges && this.editorContent !== this.page.innerHTML) {
      this.dialog.renderForgotSaveModal(this);
    } 
    else {
      this.controller.loadPreviousView()
    }
  } 


  show(allFolderNames, allTemplateNames) {
    formatDocumentLocation(allFolderNames, this.documentLocation);
    this.dropdownHelper.renderTemplatesDropdown(allTemplateNames);
    this.editor.scrollTop = 0;
    this.page.focus();
  }


  async loadInTemplate(templateId) {
    const templateContent = await this.applicationController.getTemplateById(templateId, true);
    this.page.innerHTML = this.page.innerHTML += templateContent.content;
  }

  async getSearchableNotes() {
    return await this.applicationController.getSearchObjects(); 
  }

  exitNoSave() {
    this.closeDialog();
    this.controller.loadPreviousView();
  }

  exitBySave() {
    this.editorContent = this.page.innerHTML;
    this.closeDialog();
    this.save(true, false);
  }

  new() {
    this.save(false, true)
    this.#clear();
  }

  async handleDeleteButtonClick(editorObjectId) {
    await this.controller.handleDeleteButtonClick(editorObjectId);
    this.#clear();
  }

  saveFlashcard(flashcard) {
    this.controller.saveCardToModel(flashcard);
  }

  /**
   * Temporarely stores the deck name
   * 
   * @param {Object} flashcard 
   */
  saveDeckName(deckName) {
    this.controller.saveDeckName(deckName)
  }

  #getStoredEditorObject() {
    const storedEditorData = this.controller.getStoredObject();
    return storedEditorData.editorObject;
  }

  /**
   * This method removes all the content in the editor.
   */
  #clear() {
    this.editorContent = '';
    this.page.innerHTML = '';
    this.documentNameInput.value = '';
    this.controller.clearStoredObject();
  }

  #initializeDOMElements() {
    // toolbar top
    this.documentLocation = document.querySelector('.document-location');
    this.documentNameInput = document.querySelector('.note-name-input');
    this.exitButton = document.querySelector('#exit-editor-btn');
    this.saveButton = document.querySelector('.save-note-btn');
    this.findButton = document.querySelector('#editor-search-btn');
    this.deckButton = document.querySelector('#editor-flashcard-set-btn');
    this.colorButton = document.querySelector('.color-dropdown button');

    this.noteDetailsSpan = document.querySelector('.note-details-span');
    this.deleteNoteSpan = document.querySelector('.delete-note-span');
    this.saveNoteSpan = document.querySelector('.save-note-span');
    this.newNoteSpan = document.querySelector('.new-note-span');

    // other
    this.textEditor = document.querySelector('.editor-wrapper');
    this.editor = document.querySelector('.editor');
    this.page = document.querySelector('.editor-paper');
    this.toolbar = document.querySelector('.toolbar')

    // dropdowns
    this.colorDropdown = document.querySelector('.color-dropdown ul');
    this.colorDropdownOptions = this.colorDropdown.querySelectorAll('ul li');
    this.templateDropdown = document.querySelector('.templates-dropdown');
    this.templateDropdownOptions = this.templateDropdown.querySelector('.options');
    this.templateList = this.templateDropdownOptions.querySelector('.templates-container');
    this.editorDropdown = document.querySelector('.editor-options-dropdown');
    this.editorDropdownOptions = this.editorDropdown.querySelector('.options');
    this.dropdowns = [this.editorDropdown, this.templateDropdown]
    this.dropdownOptions = [this.editorDropdownOptions, this.templateDropdownOptions]
  }


  #attachEventListeners() {
    this.noteDetailsSpan.addEventListener('click', () => {this.dialog.renderNoteDetailsModal(this.#getStoredEditorObject())});
    this.deleteNoteSpan.addEventListener('click', () => {this.renderDeleteModal(this.#getStoredEditorObject().id, this.documentNameInput.value, this)});
    this.saveNoteSpan.addEventListener('click', async () => {await this.save(false, false, true, false)});
    this.newNoteSpan.addEventListener('click', () => {this.new()});
  
    this.exitButton.addEventListener('click', () => {this.closeEditor()});
    this.saveButton.addEventListener('click', async () => { await this.save(true, false)});
    this.page.addEventListener('click', () => {this.dropdownHelper.closeDropdowns()});

    this.findButton.addEventListener('click', () => {this.dialog.renderSearchModal(this.toolbar)});  
    this.colorButton.addEventListener('click', () => {this.dropdownHelper.toggleDropdown(this.colorDropdown)})
    this.deckButton.addEventListener('click', () => {
      // Get currently stored cards
      const { flashcards, deckName } = this.controller.getStoredDeckInfo();
      this.dialog.renderNewDeckModal(this.controller, flashcards, deckName)});  

    this.colorDropdownOptions.forEach(colorDiv => {
      colorDiv.addEventListener('click', () => {
        this.textFormatter.addColor(colorDiv.style.backgroundColor, 'foreColor')
      })
      
    })
  }
}