export class Dialog {
    constructor() {
        this.dialog = document.querySelector('.dialog');
    }

    show() {
        this.dialog.style.visibility = 'visible';
        this.dialog.style.top = '0%';
    }

    hide() {
        this.dialog.style.visibility = 'hidden';
        this.dialog.style.top = '100%';
        this.dialog.removeChild(this.dialog.firstChild);
    }

    addChild(child) {
        this.dialog.appendChild(child);
    }
}