import { CNode } from "../../util/CNode.js";
import { TextFormatter } from "../../textFormat/textFormatter.js"; 


export class NoteLinkModal {
    constructor(view, noteSearchOptions, page, controller, dialog) {
        this.view = view;
        this.noteSearchOptions = noteSearchOptions.Notes;
        this.page = page;
        this.controller = controller;
        this.dialog = dialog;
        
        this.MODAL = CNode.create('div', {'class': 'note-link-modal'});
        this.H2 = CNode.create('h2', {'textContent': 'Note link'});
        this.LINK_ICON = CNode.create('i', {'id': 'link-icon', 'class': 'fa-solid fa-paperclip'});
        this.SEARCH_CONTAINER = CNode.create('div', {'class': 'search-note-link-container'});
        this.INPUT = CNode.create('input', {'placeholder': 'Search for notes', 'spellcheck': false});
        this.SEARCH_ICON = CNode.create('i', {'class': 'fa-solid fa-magnifying-glass'});
        this.NOTES_LIST = CNode.create('ul', {'class': 'linkable-notes-list'});
        this.INSERT_BUTTON = CNode.create('button', {'textContent': 'Insert'});
        this._attachEventListeners()
        return this._render()
    }

    _attachEventListeners() {
        this.INPUT.addEventListener('input', () => {
            this.handleSearchBarInput()
        });
        this.INSERT_BUTTON.addEventListener('click', () => {
            TextFormatter.addNoteLink(this.INPUT.getAttribute('data-note-id'), this.INPUT.value);
            TextFormatter.listenForNoteLinkClicks(this.page, this.controller);
            this.dialog.hide();
        });
    }

    /**
     * This method handles input in the searchbar
     * 
     * This method takes the current value of the searchbar 
     * and looks if that string takes place in any of the 
     * note names.
     * 
     * Then it rerenders the remaining notes
     * by calling the renderSearchOptions method
     */
    handleSearchBarInput() {
        this.NOTES_LIST.style.visibility = 'visible';
        const INPUT_VALUE = this.INPUT.value.toLowerCase();
        const FILTERED_OPTIONS = this.noteSearchOptions.filter(suggestion =>
          suggestion.name.toLowerCase().includes(INPUT_VALUE)
        );
        this.renderSearchOptions(FILTERED_OPTIONS);
    }

    /**
     * This method renders all the note names 
     * in the search options container
     * 
     * This method is called by the start method 
     * in the application controller.
     * @param {Array} options 
     */
    renderSearchOptions(options) { 
        const HTML = options.map(option => `<li contenteditable="false" id=${option.id}>${option.name}</li>`).join("");
        this.NOTES_LIST.innerHTML = HTML;
        this.listenForSearchClicks();
    }

    /**
     * This method listens for li element clicks 
     * within the noteOptionsList ul element
     * 
     * This method is called everytime the suggested 
     * notes are updated.
     * 
     * The suggested notes in the searchbar are updated 
     * when the user gives input.
     */
    listenForSearchClicks() {
        const SEARCHBAR_VALUES = this.NOTES_LIST.children;
        for (let i = 0; i < SEARCHBAR_VALUES.length; i++) {
            const ID = SEARCHBAR_VALUES[i].id;
            SEARCHBAR_VALUES[i].addEventListener('click', () => {
                // this.handleSearch(ID);
                this.INPUT.value = SEARCHBAR_VALUES[i].textContent;
                this.INPUT.dataset.noteId = SEARCHBAR_VALUES[i].id;
            });
        }
    }


    _render() {
        this.MODAL.appendChild(this.H2);
        this.MODAL.appendChild(this.LINK_ICON);
        this.MODAL.appendChild(this.SEARCH_CONTAINER);
        this.SEARCH_CONTAINER.appendChild(this.INPUT);
        this.SEARCH_CONTAINER.appendChild(this.SEARCH_ICON);
        this.SEARCH_CONTAINER.appendChild(this.NOTES_LIST);
        this.SEARCH_CONTAINER.appendChild(this.INSERT_BUTTON);
        this.renderSearchOptions(this.noteSearchOptions);
        return this.MODAL;
    }
}