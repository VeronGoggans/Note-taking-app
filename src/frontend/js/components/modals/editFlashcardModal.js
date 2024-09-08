import { CNode } from "../../util/CNode.js";

export class EditFlashcardModal {
    constructor(controller, dialog, flashcard = null) {
        this.flashcard = flashcard;
        this.controller = controller;   
        this.dialog = dialog;     

        this.action = 'add';
        this.HOST = CNode.create('div', {'class': 'edit-flashcard-modal'});
        this.HOST.innerHTML = `
            <h2>Add a flashcard</h2>
            <input type="text" placeholder="Card term goes here..." spellcheck="false">
            <div class="description-section">
                <div class="rich-text-options">
                    <button onclick="formatText('bold')" id="boldBtn"><i class="fa-solid fa-bold"></i></button>
                    <button onclick="formatText('italic')" id="italicBtn"><i class="fa-solid fa-italic"></i></button>
                    <button onclick="formatText('underline')" id="underlineBtn"><i class="fa-solid fa-underline"></i></button>
                    <button onclick="formatText('strikethrough')" id="strikeBtn"><i class="fa-solid fa-strikethrough"></i></button>
                    <button onclick="formatText('insertUnorderedList')"><i class="fa-solid fa-list-ul"></i></button>
                    <button onclick="formatText('insertOrderedList')"><i class="fa-solid fa-list-ol"></i></button>
                </div>
                <div class="card-description" contenteditable="true" spellcheck="false"></div>
            </div>
            <button class="save-flashcard-btn">Add flashcard</button>
        `
        this.#setVariables();

        if (flashcard !== null) this.#setFlashcardInfo();
        
        this.#attachEventListeners();
        return this.HOST
    }

    #setVariables() {
        this.SAVE_BTN = this.HOST.querySelector('.save-flashcard-btn')
        console.log(this.SAVE_BTN);
        
        this.CARD_TERM = this.HOST.querySelector('input')
        this.CARD_DESCRIPTION = this.HOST.querySelector('.card-description')
    }

    #setFlashcardInfo() {
        this.SAVE_BTN.textContent = 'Save Changes';
        this.HOST.querySelector('h2').textContent = 'Edit flashcard';
        this.action = 'update';
        this.CARD_TERM.value = this.flashcard.term
        this.CARD_DESCRIPTION.innerHTML = this.flashcard.description
    }

    #attachEventListeners() {
        this.HOST.querySelector('.save-flashcard-btn').addEventListener('click', () => {
            // Updating the flashcard object with the updated data.
            const cardTerm = this.CARD_TERM.value.trim() === '' ? 'Untitled' : this.CARD_TERM.value;
            const cardDescription = this.CARD_DESCRIPTION.innerHTML.trim() === '' ? 'No description' : this.CARD_DESCRIPTION.innerHTML;

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
}