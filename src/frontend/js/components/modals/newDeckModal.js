import { CNode } from "../../util/CNode.js";

export class NewDeckModal {
    constructor(view) {
        this.view = view;

        this.HOST = CNode.create('div', {'class': 'create-deck-modal'});
        this.MODAL_TITLE = CNode.create('h2', {'textContent': 'Creating a new deck'});
        this.DECK_NAME_INPUT = CNode.create('input', {'type': 'text', 'class': 'deck-name-input', 'placeholder': 'Deck name'});
        this.CARD_TERM = CNode.create('input', {'type': 'text', 'class': 'term-input', 'placeholder': 'Card term'});
        this.DESCRIPTION_SECTION = CNode.create('div', {'class': 'description-section'});
        this.RICH_TEXT_OPTIONS = CNode.create('div', {'class': 'rich-text-options'});
        this.BOLD_BTN = CNode.create('button', {'innerHTML': '<i class="fa-solid fa-bold"></i>'});
        this.ITALIC_BTN = CNode.create('button', {'innerHTML': '<i class="fa-solid fa-italic"></i>'});
        this.UNDERLINE_BTN = CNode.create('button', {'innerHTML': '<i class="fa-solid fa-underline"></i>'});
        this.STRIKE_BTN = CNode.create('button', {'innerHTML': '<i class="fa-solid fa-strikethrough"></i>'});
        this.LIST1_BTN = CNode.create('button', {'innerHTML': '<i class="fa-solid fa-list-ul"></i>'});
        this.LIST2_BTN = CNode.create('button', {'innerHTML': '<i class="fa-solid fa-list-ol"></i>'});
        this.CARD_DECSRIPTION = CNode.create('textarea', {'class': 'card-description', 'placeholder': 'Card description'});
        this.NEXT_BTN = CNode.create('button', {'class': 'next-card-btn', 'textContent': 'Next'});
        this.SAVE_BTN = CNode.create('button', {'class': 'save-deck-btn', 'textContent': 'Save'});

        this.#attachEventListeners();
        return this.#render();
    }

    #attachEventListeners() {
    }

    #render() {
        this.RICH_TEXT_OPTIONS.append(this.BOLD_BTN, this.ITALIC_BTN, this.UNDERLINE_BTN, this.STRIKE_BTN, this.LIST1_BTN, this.LIST2_BTN);
        this.DESCRIPTION_SECTION.append(this.RICH_TEXT_OPTIONS, this.CARD_DECSRIPTION);
        this.HOST.append(this.MODAL_TITLE, this.DECK_NAME_INPUT, this.CARD_TERM, this.DESCRIPTION_SECTION, this.NEXT_BTN, this.SAVE_BTN);
        return this.HOST;
    }
}