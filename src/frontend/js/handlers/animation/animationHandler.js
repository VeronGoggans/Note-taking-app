export class AnimationHandler {

    /**
     * This method is called whenever a new note/folder/subfolder 
     * has been created.
     * 
     * @param {HTML} card 
     */
    static fadeInFromBottom(card) {
        setTimeout(() => {
            card.classList.add('fadeInFromBottom');
        }, 30);
    }

    /**
     * This method is called whenever a new note/folder/subfolder 
     * has been created.
     * 
     * @param {HTML} card 
     */
    static fadeInFromSide(card) {
        setTimeout(() => {
            card.classList.add('fadeInFromSide');
        }, 30);
    }

    /**
     * This method is called whenever a note/folder/subfolder
     * has been deleted
     * 
     * @param {HTML} card 
     */
    static fadeOutCard(card, uiParentElement) { 
        card.classList.add('fadeOut');
        setTimeout(() => {
            uiParentElement.removeChild(card);
        }, 700);
    }

    /**
     * 
     * @param {Node} node 
     */
    static fadeIn(node) {
        node.classList.add('fadeIn');
    }

    /**
     * 
     * @param {Node} node 
     */
    static fadeOut(node) {
        node.classList.remove('fadeIn');
        setTimeout(() => {
            node.style.display = 'none';
        }, 150);
    }
}