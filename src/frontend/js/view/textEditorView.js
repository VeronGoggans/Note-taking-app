import { KeyEventListener } from "../eventListeners/keyEventListener.js";
import { TextEditorEventListener } from "../eventListeners/textEditorEventListener.js";
import { DropdownHelper } from "../helpers/dropdownHelper.js";
import { TextFormatter } from "../textFormat/textFormatter.js"; 
import { formatDocumentLocation } from "../util/formatters.js";
import { TextBlockHandler } from "../textFormat/textBlockHandler.js";
import { SlashCommand } from "../textFormat/slashCommand.js";

export class TextEditorView {
  constructor(controller, applicationController, dialog) {
    this.controller = controller;
    this.applicationController = applicationController;
    
    this.editorContent = '';
    this.dialog = dialog;
    this.#initializeDOMElements();
    this.#attachEventListeners();

    this.textFormatter = new TextFormatter();
    this.slashCommand = new SlashCommand(this, this.textFormatter);
    this.textBlockParser = new TextBlockHandler(this.page);
    this.dropdownHelper = new DropdownHelper(this);
    this.keyEventListener = new KeyEventListener(this);
    this.textEditorEventListener = new TextEditorEventListener(this.page, this.editor, this.slashCommand);
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
    this.textFormatter.listenForLinkClicks(this.page);
    TextFormatter.listenForNoteLinkClicks(this.page, this.applicationController);
    this.show(allFolderNames, allTemplateNames);
  }

  /**
   * Saves the content of the editor.
   * @param {boolean} closeEditor - Indicates if the editor should be closed or not.
   * @param {boolean} checkForChanges - Indicates if changes should be checked.
   */
  async save(closeEditor = true, checkForChanges = true) {
    const name = this.documentNameInput.value || 'untitled';
    const content = this.page.innerHTML;
    await this.controller.save(name, content);

    if (closeEditor) {
      this.closeEditor(checkForChanges);
    }
    else {
      this.editorContent = content;
    }
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
    } else {
      this.controller.loadPreviousView()
    }
  } 

  /**
   * This method shows the text editor
   */
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
    this.dialog.hide();
    this.controller.loadPreviousView();
  }

  exitBySave() {
    this.editorContent = this.page.innerHTML;
    this.dialog.hide();
    this.save(true, false);
  }

  new() {
    this.save(false, true)
    this.#clear();
  }

  async handleDeleteButtonClick(noteId) {
    await this.controller.handleDeleteButtonClick(noteId);
    this.#clear();
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

    this.noteDetailsSpan = document.querySelector('.note-details-span');
    this.deleteNoteSpan = document.querySelector('.delete-note-span');
    this.saveNoteSpan = document.querySelector('.save-note-span');
    this.newNoteSpan = document.querySelector('.new-note-span');

    // this.fontButton = document.querySelector('.font-button');
    // this.fontDropdown = document.querySelector('.font-dropdown');
    // this.fontDropdownOptions = document.querySelector('.font-options');
    
    this.linkButton = document.querySelector('.link-btn');
    this.codeBlockButton = document.querySelector('.code-block-btn');
    this.horizontalRuleButton = document.querySelector('.hr-btn');
    this.linkNoteButton = document.querySelector('.link-note-btn');
    this.removeFormattingButton = document.querySelector('.remove-formatting-btn');
    this.embedVideoButton = document.querySelector('.video-btn');
    this.foregroundColor = document.querySelector('.foreground-color-picker');
    this.backgroundColor = document.querySelector('.background-color-picker');
    // this.foregroundPalette = document.querySelector('.foreground-color-palette');
    // this.foregroundPaletteColors = this.foregroundPalette.querySelectorAll('.nature-colors button, .sunset-colors button, .neon-colors button, .text-colors button');
    // this.backgroundPalette = document.querySelector('.background-color-palette');
    // this.backgroundPaletteColors = this.backgroundPalette.querySelectorAll('.nature-colors button, .sunset-colors button, .neon-colors button, .text-colors button');

    // other
    this.textEditor = document.querySelector('.editor-wrapper');
    this.editor = document.querySelector('.editor');
    this.page = document.querySelector('.editor-paper');
    this.toolbar = document.querySelector('.toolbar')
  }


  #attachEventListeners() {
    this.noteDetailsSpan.addEventListener('click', () => {this.dialog.renderNoteDetailsModal(this.#getStoredEditorObject())});
    this.deleteNoteSpan.addEventListener('click', () => {this.dialog.renderDeleteModal(this.#getStoredEditorObject().id, this.documentNameInput.value, this)});
    this.saveNoteSpan.addEventListener('click', async () => {await this.save(false, false)});
    this.newNoteSpan.addEventListener('click', () => {this.new()});
  
    this.exitButton.addEventListener('click', () => {this.closeEditor()});
    this.saveButton.addEventListener('click', async () => { await this.save(true, false)});
    this.page.addEventListener('click', () => {this.dropdownHelper.closeDropdowns()});

    this.findButton.addEventListener('click', () => {this.dialog.renderSearchModal(this.toolbar)});    
  }
}