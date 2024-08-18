import { CNode } from "../../util/CNode.js";

export class EditFlashcardModal {
    constructor(controller, dialog, flashcard = null) {
        this.flashcard = flashcard;
        this.controller = controller;   
        this.dialog = dialog;     

        this.action = 'add';
        this.HOST = CNode.create('div', {'class': 'edit-flashcard-modal'});
        this.MODAL_TITLE = CNode.create('h2', {'textContent': 'Edit flashcard'});
        this.CARD_TERM = CNode.create('input', {'type': 'text', 'class': 'term-input', 'placeholder': 'Card term'});
        this.DESCRIPTION_SECTION = CNode.create('div', {'class': 'description-section'});
        this.RICH_TEXT_OPTIONS = CNode.create('div', {'class': 'rich-text-options'});
        this.BOLD_BTN = CNode.create('button', {'innerHTML': '<i class="fa-solid fa-bold"></i>', 'onclick' : "formatText('bold')", 'id': 'boldBtn'});
        this.ITALIC_BTN = CNode.create('button', {'innerHTML': '<i class="fa-solid fa-italic"></i>', 'onclick' : "formatText('italic')", 'id': 'italicBtn'});
        this.UNDERLINE_BTN = CNode.create('button', {'innerHTML': '<i class="fa-solid fa-underline"></i>', 'onclick' : "formatText('underline')", 'id': 'underlineBtn'});
        this.STRIKE_BTN = CNode.create('button', {'innerHTML': '<i class="fa-solid fa-strikethrough"></i>', 'onclick' : "formatText('strikethrough')", 'id': 'strikeBtn'});
        this.LIST1_BTN = CNode.create('button', {'innerHTML': '<i class="fa-solid fa-list-ul"></i>', 'onclick' : "formatText('insertUnorderedList')"});
        this.LIST2_BTN = CNode.create('button', {'innerHTML': '<i class="fa-solid fa-list-ol"></i>', 'onclick' : "formatText('insertOrderedList')"});
        this.SELECT_BTN = CNode.create('button', {'class': 'select-text-btn', 'textContent': 'Select text'});
        this.CARD_DECSRIPTION = CNode.create('div', {'class': 'card-description', 'contentEditable': true, 'spellCheck': false});
        this.SAVE_BTN = CNode.create('button', {'class': 'save-flashcard-btn', 'textContent': 'Add flashcard'});

        if (flashcard !== null) {
            this.#setFlashcardInfo();
        }

        this.#attachEventListeners();
        return this.#render();
    }

    #setFlashcardInfo() {
        this.SAVE_BTN.textContent = 'Save Changes';
        this.action = 'update';
        this.CARD_TERM.value = this.flashcard.term
        this.CARD_DECSRIPTION.innerHTML = this.flashcard.description
    }

    #attachEventListeners() {
        this.SAVE_BTN.addEventListener('click', () => {
            // Updating the flashcard object with the updated data.
            const cardTerm = this.CARD_TERM.value.trim() === '' ? 'Untitled' : this.CARD_TERM.value;
            const cardDescription = this.CARD_DECSRIPTION.innerHTML.trim() === '' ? 'No description' : this.CARD_DECSRIPTION.innerHTML;

            // this.flashcard is null 
            if (this.action === 'add') {
                this.controller.addFlashcard({'term': cardTerm, 'description': cardDescription})
            }
            // this.flashcard is not null
            else {
                this.flashcard.term = cardTerm;
                this.flashcard.description = cardDescription;
                this.controller.updateFlashcard(this.flashcard)
            }
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