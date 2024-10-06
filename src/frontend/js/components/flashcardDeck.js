import { AnimationHandler } from "../handlers/animation/animationHandler.js";
import { CNode } from "../util/CNode.js";
import { getPassedTime } from "../util/date.js";
import { capitalizeFirstLetter } from "../util/formatters.js";

export class FlashcardDeck {
    constructor(deck, stats, view) {
        this.view = view;
        this.deck = deck;
        this.name = deck.name;
        this.lastStudyDate = getPassedTime(deck.last_study);
        this.cardsCount = stats.flashcards;

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
        this.HOST = CNode.create('div', {'class': 'flashcard-deck', 'id': this.deck.id});
        this.NAME = CNode.create('p', {'class': 'deck-name', 'textContent': this.name });
        this.DIV = CNode.create('div', {});
        this.LAST_STUDY = CNode.create('p', {'class': 'last-study-date', 'textContent': this.lastStudyDate});
        this.CARDS_PARAGRAPH = CNode.create('p', {'class': 'card-count', 'innerHTML': `<span>${this.cardsCount}</span><i class="bi bi-files"></i>`});
    }


    #attachEventListeners() {
        this.HOST.addEventListener('click', () => {this.view.handleDeckCardClick(this.deck.id)})
    }
}


export class FlashcardProgression {
    constructor(deck, stats, view) {
        this.view = view;
        this.deck = deck;
        this.stats = stats;
        this.name = deck.name;

        this.#initializeDomElements();
        this.#attachEventListeners();
        return this.#render();
    }

    #render() {
        this.PROGRESS.append(this.PROGRESS_FILL);
        this.HOST.append(this.NAME, this.PROGRESS, this.PERCENTAGE_CORRECT, this.EDIT_BUTTON, this.DELETE_BUTTON);
        return this.HOST
    }

    #initializeDomElements() {
        this.HOST = CNode.create('div', {'class': 'flashcard-deck-progression', 'id': this.deck.id});
        this.NAME = CNode.create('span', {'class': 'deck-name', 'textContent': this.name});
        this.EDIT_BUTTON = CNode.create('button', {'class': 'edit-deck-btn', 'innerHTML': '<i class="fa-solid fa-pen"></i>'});
        this.DELETE_BUTTON = CNode.create('button', {'class': 'delete-deck-btn', 'innerHTML': '<i class="fa-solid fa-trash"></i>'});
        this.PROGRESS = CNode.create('div', {'class': 'progress'});
        this.PROGRESS_FILL = CNode.create('div', {'class': 'progress__fill', 'style': `width: ${this.stats.progression}%;`});
        this.PERCENTAGE_CORRECT = CNode.create('span', {'textContent': `${this.stats.progression}% Correct`});
    }

    #attachEventListeners() {
        this.EDIT_BUTTON.addEventListener('click', () => {this.view.handleEditButtonClick(this.deck.id)});
        this.DELETE_BUTTON.addEventListener('click', () => {this.view.renderDeleteModal(this.deck.id, this.deck.name)});
    }
}

export class Flashcard {
    constructor(flashcard, dialog, controller, unsaved = false) {
        this.flashcard = flashcard;
        this.dialog = dialog;
        this.controller = controller;
        this.unsaved = unsaved;

        this.#initializeDomElements();
        this.#applyRatingStyle();
        this.#attachEventListeners();
        return this.#render();
    }

    #applyRatingStyle() {
        if (this.flashcard.rating === 'wrong') {
            this.RATING_CONTAINER.style.backgroundColor = '#ff8c8c';
        }
        if (this.flashcard.rating === 'idle') {
            this.RATING_CONTAINER.style.backgroundColor = '#9d9eaf';
        }
    }

    #render() {
        this.RATING_CONTAINER.appendChild(this.RATING);
        this.UTIL_BAR.append(this.DELETE_BUTTON);
        this.HOST.append(this.NAME, this.RATING_CONTAINER, this.UTIL_BAR);
        return this.HOST
    }

    #initializeDomElements() {
        this.HOST = CNode.create('div', {'class': 'flashcard', 'id': this.flashcard.id});
        if (this.unsaved) {
            this.HOST.dataset = 'unsaved-flashcard'
        }
        this.NAME = CNode.create('h3', {'textContent': this.flashcard.term});
        this.UTIL_BAR = CNode.create('div', {'class': 'util-bar'});
        this.DELETE_BUTTON = CNode.create('button', {'class': 'delete-flashcard-btn', 'innerHTML': '<i class="fa-solid fa-trash"></i>'});
        this.RATING_CONTAINER = CNode.create('div', {'class': 'rating'});
        this.RATING = CNode.create('span', {'textContent': capitalizeFirstLetter(this.flashcard.rating)});
    }

    #attachEventListeners() {
        this.HOST.addEventListener('click', () => {this.dialog.renderEditFlashcardModal(this.controller, this.flashcard)});
        this.DELETE_BUTTON.addEventListener('click', () => {
            AnimationHandler.fadeOutCard(this.HOST);

            // Check if the flashcard being deleted is saved (Known/stored by the backend)
            if (Object.keys(this.HOST.dataset).length === 0) {
                this.controller.deleteFlashcard(this.flashcard.id)
            }
        });
    }
}