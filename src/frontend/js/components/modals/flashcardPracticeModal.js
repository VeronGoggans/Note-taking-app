import { CNode } from "../../util/CNode.js";


export class FlashcardPracticeModal {
    constructor(deck, view, dialog) {
        console.log(deck);
        
        this.view = view;
        this.deck = deck;
        this.flashcards = deck.flashcards;
        this.dialog = dialog;
        this.#initializeDomElements();
        this.#attachEventListeners();
        return this.#render();
    }

    #render() {
        this.FLASHCARD.append(this.FLASHCARD_CONTENT);
        this.PROGRESS_BAR.append(this.PROGRESS);
        this.BUTTON_BAR.append(this.RESTART_BTN, this.FLIP_BTN, this.WRONG_BTN, this.CORRECT_BTN);
        this.HOST.append(this.DECK_NAME, this.CARD_COUNT, this.FLASHCARD, this.PROGRESS_BAR, this.BUTTON_BAR);
        return this.HOST
    }

    #initializeDomElements() {
        this.HOST = CNode.create('div', {'class': 'flashcard-practice-modal'});
        this.DECK_NAME = CNode.create('h3', { 'class': 'deck-name','textContent': this.deck.name});
        this.CARD_COUNT = CNode.create('span', {'textContent': `1/${this.flashcards.length}`});
        this.FLASHCARD = CNode.create('div', {'class': 'flashcard'});
        this.FLASHCARD_CONTENT = CNode.create('p', {'class': 'flashcard-content', 'innerHTML': this.flashcards[9].description});
        this.PROGRESS_BAR = CNode.create('div', {'class': 'progress'});
        this.PROGRESS = CNode.create('div', {'class': 'progress__fill'});
        this.BUTTON_BAR = CNode.create('div', {'class': 'button-bar'});
        this.RESTART_BTN = CNode.create('i', {'id': 'restart-btn', 'class': 'fa-solid fa-repeat'});
        this.FLIP_BTN = CNode.create('i', {'id': 'forward-backward-btn', 'class': 'fa-solid fa-arrows-rotate'});
        this.WRONG_BTN = CNode.create('i', {'id': 'wrong-btn', 'class': 'fa-solid fa-xmark'});
        this.CORRECT_BTN = CNode.create('i', {'id': 'correct-btn', 'class': 'fa-solid fa-check'});
    }

    #attachEventListeners() {

    }

    #updateDeckProgress() {

    }
    
}