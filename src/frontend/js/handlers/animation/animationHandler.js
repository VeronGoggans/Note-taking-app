export class AnimationHandler {

    /**
     * @param {HTML} card 
     */
    static fadeInFromBottom(card) {
        setTimeout(() => {
            card.classList.add('fadeInFromBottom');
        }, 30);
    }

    /**
     * @param {HTML} card 
     */
    static fadeInFromSide(card) {
        setTimeout(() => {
            card.classList.add('fadeInFromSide');
        }, 30);
    }

    /**
     * @param {HTML} card 
     */
    static fadeOutToBottom(card) {
        card.classList.remove('fadeInFromBottom');
    }

    /**
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