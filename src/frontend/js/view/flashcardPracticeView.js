import { AnimationHandler } from "../handlers/animation/animationHandler.js";
import { FlashcardObjectArray } from "../util/array.js";
import { getMinutesDifference } from "../util/date.js";

/**
 * Flashcard object has the following structure
 * id: @param {Number}
 * term: @param {String}
 * description: @param {String}
 * rating: @param {String}
 */

export class FlashcardPracticeView {
    constructor(controller, applicationController, deck, flashcards) {
        this.controller = controller;
        this.applicationController = applicationController;
        this.deck = deck;
        this.flashcards = new FlashcardObjectArray();

        for (let i = 0; i< flashcards.length; i++) {
            this.flashcards.add(flashcards[i])
        }

        this.currentCardNumber = 0;
        this.currentFlashcard = null;
        this.cardsHaveBeenChanged = false;

        this.flashcardMode = 'normal'; // Or flipped.
        this.currentlyShowing = 'term';

        // The time when the user started studying
        this.startDate = new Date();
        
        this.#initializeDomElements();
        this.#attachEventListeners();
        this.#init();
        AnimationHandler.fadeInFromSide(this.flashcardPracticeView);
    }

    #init() {
        this.deckNameHeading.textContent = this.deck.name;
        this.currentCardNumberSpan.textContent = `1 out of ${this.flashcards.size()}`
        this.setupNextCard();
    }


    setupNextCard() {
        // Start from the beginning if we reached the end of the deck.
        if (this.currentCardNumber === this.flashcards.size()) {
            this.#restart();
            return;
        }

        this.currentCardNumber += 1;
        this.#updateUIProgress();

        // Setup next card, 
        // as long as were not at the end of the deck
        this.#showCard(true);
    }


    setupPreviousCard() {
        // Setup the previous card,
        // as long as were not at the start of the deck
        if (this.currentCardNumber > 1) {
            this.currentCardNumber -= 1
            this.#updateUIProgress();
            // Show previous card
            this.#showCard(false);
        }
    }


    updateCardPerformance(rating) {
        if (!this.cardsHaveBeenChanged) {
            // Will only execute the first time a rating 
            // for a card has been changed.
            this.cardsHaveBeenChanged = true;
        }
        // Get current flashcard object
        const flashcard = this.flashcards.get(this.currentFlashcard.id);

        // Update the rating
        flashcard.rating = rating;       

        // Update the object inside the array
        this.flashcards.update(flashcard);

        // Get the next card
        this.setupNextCard();
    }
    
    /**
     * 
     * @param {Boolean} nextCard
     */
    #showCard(nextCard) {
        if (this.flashcardMode === 'normal') {
            this.#setCurrentFlashcard(nextCard);
            this.#adjustFont('term');

            // Get the term for the current card
            this.flashcardContent.innerHTML = 
            this.currentFlashcard.term;
            this.currentlyShowing = 'term';
        }

        if (this.flashcardMode === 'flipped') {
            this.#setCurrentFlashcard(nextCard);
            this.#adjustFont('description');
            
            // Get the description for the current card
            this.flashcardContent.innerHTML =
            this.currentFlashcard.description;
            this.currentlyShowing = 'description';
        }
    }


    flipCard() {
        if (this.currentlyShowing === 'term') {
            this.#adjustFont('description');

            this.flashcardContent.innerHTML = 
            this.currentFlashcard.description;

            // Indecating that the card is flipped.
            this.currentlyShowing = 'description';
            return;
        }
        if (this.currentlyShowing === 'description') {
            this.#adjustFont('term');

            this.flashcardContent.innerHTML = 
            this.currentFlashcard.term;

            // Indecating that the card is flipped.
            this.currentlyShowing = 'term';
            return;
        }
    }


    #updateUIProgress() {
        // Updating the current card number.
        this.currentCardNumberSpan.textContent = `${this.currentCardNumber} out of ${this.flashcards.size()}`;

        // Updating the progress bar.
        const currentProgress = this.currentCardNumber / this.flashcards.size() * 100;
        this.progress.style.width = `${currentProgress}%`;
    }


    /**
     * This method sets the currentFlashcard class variable
     * To the next card in the flashcard objects list
     * @param {Boolean} nextCard - indecating to set the next or previous 
     *                           - card of the deck to the currentFlashcard
     */
    #setCurrentFlashcard(nextCard) {
        // Only executes for the first flashcard.
        if (this.currentFlashcard === null) {
            this.currentFlashcard = this.flashcards.objects[0];
            return;
        }
        const previousCardId = this.currentFlashcard.id;
        this.currentFlashcard = this.flashcards.getNewCard(previousCardId, nextCard);        
    }

    /**
     * Based on wich side of the card is showing
     * adjust the font size and family.
     *
     * @param {String} showing 
     */
    #adjustFont(showing) {
        if (showing === 'term') {
            this.flashcardContent.style.fontFamily = 'sans-serif';
            this.flashcardContent.style.fontSize = '28px';
            this.flashcardContent.style.fontWeight = '600';
        }
        if (showing === 'description') {
            this.flashcardContent.style.fontWeight = '500';
            this.flashcardContent.style.fontSize = '20px';
        } 
    }


    #restart() {
        this.currentCardNumber = 0;
        this.currentCardNumberSpan.textContent = `1 out of ${this.flashcards.size()}`;
        this.currentFlashcard = null;
        this.setupNextCard();
    }


    #beforeClose() {
        if (this.cardsHaveBeenChanged) {
            const timeStudied = getMinutesDifference(
                this.startDate,
                new Date()
            )

            this.controller.updateFlashcards(
                this.deck.id,
                timeStudied,    
                this.flashcards.objects
            )
        } 

        else {
            this.controller.loadPreviousView()
        }
    }


    #initializeDomElements() {
        // The view
        this.flashcardPracticeView = document.querySelector('.flashcard-practice');
        
        // Deck related elements
        this.deckNameHeading = document.querySelector('.deck-name');
        this.currentCardNumberSpan = document.querySelector('.current-card-number');
        this.flashcard = document.querySelector('.flashcard');
        this.flashcardContent = document.querySelector('.flashcard-content');
        

        // Buttons
        this.backButton = document.querySelector('.flashcard-home-btn');
        this.correctButton = document.querySelector('#correct-btn');
        this.wrongButton = document.querySelector('#wrong-btn');
        this.restartButton = document.querySelector('#restart-btn');
        this.flipModeButton = document.querySelector('#forward-backward-btn');
        this.previousButton = document.querySelector('#previous-card-btn');
        this.nextButton = document.querySelector('#next-card-btn');

        // Progress bar
        this.progress = document.querySelector('.progress__fill');
    }

    #attachEventListeners() {
        this.flashcard.addEventListener('click', () => {this.flipCard()});

        // Button events
        this.backButton.addEventListener('click', () => {this.#beforeClose()});
        this.nextButton.addEventListener('click', () => {this.setupNextCard()});
        this.previousButton.addEventListener('click', () => {this.setupPreviousCard()});
        this.correctButton.addEventListener('click', () => {this.updateCardPerformance('correct')});
        this.wrongButton.addEventListener('click', () => {this.updateCardPerformance('wrong')});
        this.restartButton.addEventListener('click', () => {this.#restart()});
    }
}