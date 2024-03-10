export class AnimationHandler {

    static fadeInFromBottom(card) {
        setTimeout(() => {
            card.classList.add('fadeInFromBottom');
        }, 50);
    }

    static fadeInFromSide(card) {
        setTimeout(() => {
            card.classList.add('fadeInFromSide');
        }, 50);
    }

    static fadeOutCard(card) { 
        card.classList.add('fadeOut');
    }
}