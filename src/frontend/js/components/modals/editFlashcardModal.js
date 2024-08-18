import { CNode } from "../../util/CNode.js";

export class EditFlashcardModal {
    constructor(flashcard, controller, dialog) {
        this.flashcard = flashcard;
        this.controller = controller;   
        this.dialog = dialog;     
        this.HOST = CNode.create('div', {'class': 'edit-flashcard-modal'});
        this.MODAL_TITLE = CNode.create('h2', {'textContent': 'Edit flashcard'});
        this.CARD_TERM = CNode.create('input', {'type': 'text', 'class': 'term-input', 'placeholder': 'Card term', 'value': flashcard.term});
        this.DESCRIPTION_SECTION = CNode.create('div', {'class': 'description-section'});
        this.RICH_TEXT_OPTIONS = CNode.create('div', {'class': 'rich-text-options'});
        this.BOLD_BTN = CNode.create('button', {'innerHTML': '<i class="fa-solid fa-bold"></i>', 'onclick' : "formatText('bold')", 'id': 'boldBtn'});
        this.ITALIC_BTN = CNode.create('button', {'innerHTML': '<i class="fa-solid fa-italic"></i>', 'onclick' : "formatText('italic')", 'id': 'italicBtn'});
        this.UNDERLINE_BTN = CNode.create('button', {'innerHTML': '<i class="fa-solid fa-underline"></i>', 'onclick' : "formatText('underline')", 'id': 'underlineBtn'});
        this.STRIKE_BTN = CNode.create('button', {'innerHTML': '<i class="fa-solid fa-strikethrough"></i>', 'onclick' : "formatText('strikethrough')", 'id': 'strikeBtn'});
        this.LIST1_BTN = CNode.create('button', {'innerHTML': '<i class="fa-solid fa-list-ul"></i>', 'onclick' : "formatText('insertUnorderedList')"});
        this.LIST2_BTN = CNode.create('button', {'innerHTML': '<i class="fa-solid fa-list-ol"></i>', 'onclick' : "formatText('insertOrderedList')"});
        this.SELECT_BTN = CNode.create('button', {'class': 'select-text-btn', 'textContent': 'Select text'});
        this.CARD_DECSRIPTION = CNode.create('div', {'class': 'card-description', 'contentEditable': true, 'spellCheck': false, 'innerHTML': flashcard.description});
        this.SAVE_BTN = CNode.create('button', {'class': 'save-flashcard-btn', 'textContent': 'Save flashcard'});

        this.#attachEventListeners();
        return this.#render();
    }

    #attachEventListeners() {
        this.SAVE_BTN.addEventListener('click', () => {
            // Updating the flashcard object with the updated data.
            this.flashcard.term = this.CARD_TERM.value.trim() === '' ? 'Untitled' : this.CARD_TERM.value;
            this.flashcard.description = this.CARD_DECSRIPTION.innerHTML.trim() === '' ? 'No description' : this.CARD_DECSRIPTION.innerHTML;

            this.controller.updateFlashcard(this.flashcard)
            this.dialog.hide();
        })
    }


    #render() {
        this.RICH_TEXT_OPTIONS.append(this.BOLD_BTN, this.ITALIC_BTN, this.UNDERLINE_BTN, this.STRIKE_BTN, this.LIST1_BTN, this.LIST2_BTN);
        this.DESCRIPTION_SECTION.append(this.RICH_TEXT_OPTIONS, this.CARD_DECSRIPTION);
        this.HOST.append(this.MODAL_TITLE, this.CARD_TERM, this.DESCRIPTION_SECTION, this.SAVE_BTN);
        return this.HOST;
    }
}