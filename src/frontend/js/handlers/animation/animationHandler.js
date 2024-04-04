export class AnimationHandler {

    /**
     * This method will show a new card on the UI with a slide animation
     * This method is called whenever a new note/folder/subfolder 
     * has been created.
     * 
     * This animation is used for the cards inside the main view
     * @param {HTML} card 
     */
    static fadeInFromBottom(card) {
        setTimeout(() => {
            card.classList.add('fadeInFromBottom');
        }, 50);
    }

    /**
     * This method will show a new card on the UI with a slide animation
     * This method is called whenever a new note/folder/subfolder 
     * has been created.
     * 
     * This animation is used for the cards inside the folder overview
     * @param {HTML} card 
     */
    static fadeInFromSide(card) {
        setTimeout(() => {
            card.classList.add('fadeInFromSide');
        }, 50);
    }

    /**
     * This method will fade out a card from the UI
     * This method is called whenever a note/folder/subfolder
     * has been deleted
     * 
     * THis animation is used for both folder overview cards 
     * and the cards inside the main view
     * @param {HTML} card 
     */
    static fadeOutCard(card) { 
        card.classList.add('fadeOut');
    }
}