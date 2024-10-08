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
                    <button onclick="formatText('bold')" id="boldBtn"><i class="bi bi-type-bold"></i></button>
                    <button onclick="formatText('italic')" id="italicBtn"><i class="bi bi-type-italic"></i></button>
                    <button onclick="formatText('underline')" id="underlineBtn"><i class="bi bi-type-underline"></i></button>
                    <button onclick="formatText('strikethrough')" id="strikeBtn"><i class="bi bi-type-strikethrough"></i></button>
                    <button onclick="formatText('insertUnorderedList')"><i class="bi bi-list-task"></i></button>
                    <button onclick="formatText('insertOrderedList')"><i class="bi bi-list-ol"></i></button>
                </div>
                <div class="card-description" contenteditable="true" spellcheck="false"></div>
            </div>
            <button class="save-flashcard-btn">Add flashcard</button>
        `
        this.#initElements();

        if (flashcard !== null) {
            this.#setFlashcardInfo();
        }
        this.#eventListeners();
        return this.HOST
    }

    #initElements() {
        this.SAVE_BTN = this.HOST.querySelector('.save-flashcard-btn')        
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

    #eventListeners() {
        /**
         * Logic for adding and updating flashcards
         */
        this.HOST.querySelector('.save-flashcard-btn').addEventListener('click', async () => {
            const cardTerm = this.CARD_TERM.value.trim() === '' ? 'Untitled' : this.CARD_TERM.value;
            const cardDescription = this.CARD_DESCRIPTION.innerHTML.trim() === '' ? 'No description' : this.CARD_DESCRIPTION.innerHTML;

            if (this.action === 'add') {
                await this.controller.addFlashcard({
                    'term': cardTerm, 
                    'description': cardDescription
                });
            }

            if (this.action === 'update') {               
                this.flashcard.term = cardTerm;
                this.flashcard.description = cardDescription;
                
                await this.controller.updateFlashcard(this.flashcard);
            }
            this.dialog.hide();
        })
    }
}