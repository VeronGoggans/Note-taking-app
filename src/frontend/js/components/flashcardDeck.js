import { CNode } from "../util/CNode.js";
import { getPassedTime } from "../util/date.js";

export class FlashcardDeck {
    constructor(deck, view) {
        this.view = view;
        this.deck = deck;
        this.name = deck.name;
        this.linkedNote = deck.linked_note;
        this.lastStudyDate = getPassedTime(deck.last_study);
        this.cardsCount = deck.flashcards.length;

        this.#initializeDomElements();
        this.#attachEventListeners();
        return this.#render();
    }

    #render() {
        this.DIV.append(this.LAST_STUDY, this.CARDS_PARAGRAPH);
        this.HOST.append(this.NAME, this.LINKED, this.DIV);
        return this.HOST
    }

    #initializeDomElements() {
        this.HOST = CNode.create('div', {'class': 'flashcard-deck'});
        this.NAME = CNode.create('p', {'class': 'deck-name', 'textContent': this.name });
        this.LINKED = CNode.create('p', {'class': 'linked-note', 'textContent': this.linkedNote })
        this.DIV = CNode.create('div', {});
        this.LAST_STUDY = CNode.create('p', {'class': 'last-study-date', 'textContent': `Last studied ${this.lastStudyDate}`});
        this.CARDS_PARAGRAPH = CNode.create('p', {'class': 'card-count', 'innerHTML': `<span>${this.cardsCount}</span> Cards`});
    }


    #attachEventListeners() {
        this.HOST.addEventListener('click', () => {this.view.renderFlashcardPracticeModal(this.deck)})
    }
}