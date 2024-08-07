import { CNode } from "../util/CNode.js";
import { getPassedTime } from "../util/date.js";

export class FlashcardDeck {
    constructor(deck, view) {
        this.view = view;
        this.deck = deck;
        this.name = deck.name;
        this.lastStudyDate = getPassedTime(deck.last_study);
        this.cardsCount = deck.flashcards.length;

        this.#initializeDomElements();
        this.#attachEventListeners();
        return this.#render();
    }

    #render() {
        this.DIV.append(this.LAST_STUDY, this.CARDS_PARAGRAPH);
        this.HOST.append(this.NAME, this.DIV);
        return this.HOST
    }

    #initializeDomElements() {
        this.HOST = CNode.create('div', {'class': 'flashcard-deck'});
        this.NAME = CNode.create('p', {'class': 'deck-name', 'textContent': this.name });
        this.DIV = CNode.create('div', {});
        this.LAST_STUDY = CNode.create('p', {'class': 'last-study-date', 'textContent': `Last studied ${this.lastStudyDate}`});
        this.CARDS_PARAGRAPH = CNode.create('p', {'class': 'card-count', 'innerHTML': `<span>${this.cardsCount}</span> Cards`});
    }


    #attachEventListeners() {
        this.HOST.addEventListener('click', () => {this.view.handleDeckCardClick(this.deck.id)})
    }
}


export class FlashcardProgression {
    constructor(deck, view) {
        this.view = view;
        this.deck = deck;
        this.name = deck.name;
        this.editIcon = '<i class="fa-solid fa-pen"></i>';
        this.studyIcon = '<i class="fa-solid fa-graduation-cap"></i>';

        this.#initializeDomElements();
        this.#calculateProgression();
        this.#attachEventListeners();
        return this.#render();
    }

    #calculateProgression() {
        this.PROGRESS_FILL.style.width = `${
            this.deck.progress.percentage
        }%`;
    }

    #render() {
        this.PROGRESS.append(this.PROGRESS_FILL);
        this.HOST.append(this.NAME, this.EDIT_BUTTON, this.STUDY_BUTTON, this.PROGRESS);
        return this.HOST
    }

    #initializeDomElements() {
        this.HOST = CNode.create('div', {'class': 'flashcard-deck-progression'});
        this.NAME = CNode.create('span', {'class': 'deck-name', 'textContent': this.name });
        this.EDIT_BUTTON = CNode.create('button', {'class': 'edit-deck-btn', 'innerHTML': `${this.editIcon} View`});
        this.STUDY_BUTTON = CNode.create('button', {'class': 'study-deck-btn', 'innerHTML': `${this.studyIcon} Study`});
        this.PROGRESS = CNode.create('div', {'class': 'progress'});
        this.PROGRESS_FILL = CNode.create('div', {'class': 'progress__fill'});
    }

    #attachEventListeners() {
        this.STUDY_BUTTON.addEventListener('click', () => {this.view.handleDeckCardClick(this.deck.id)})
    }
}