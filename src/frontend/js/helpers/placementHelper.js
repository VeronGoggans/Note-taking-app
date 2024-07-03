export class PlacementHelper {
    constructor() {
        this.formatBarWidth = 471.6 //Pixels

        this.formatBar = document.querySelector('.rich-text-option-container');
    }


    placeFormatBar(selection) {
        const rect = selection.getRangeAt(0).getBoundingClientRect();

        const xPostion = this.#checkWidthForOverflow(rect);
        this.formatBar.style.top = `${rect.bottom + window.scrollY}px`;
        this.formatBar.style.left = `${xPostion}px`;
    }

    placeCommandBar() {

    }


    #checkWidthForOverflow(rect) {
        const padding = 20; //Pixels
        const screenWidth = window.innerWidth;
        const spawnPoint = rect.left + window.scrollX;
        const totalWidth = rect.left + window.scrollX + this.formatBarWidth;

        if (totalWidth > screenWidth) {
            const pixelOverflow = totalWidth - screenWidth;
            return spawnPoint - pixelOverflow - padding;
        }
        return spawnPoint;
    }
}