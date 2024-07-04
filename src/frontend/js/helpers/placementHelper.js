export class PlacementHelper {
    constructor() {
        this.formatBarWidth = 471.6 //Pixels
        this.formatBarHeigth = 51.6 // Pixels
        this.commandBarHeigth = 241.6 //Pixels
        this.commandBarWidth = 269.78 // Pixels
        this.paddingY = 10 //Pixels

        this.editor = document.querySelector('.editor');
        this.formatBar = document.querySelector('.rich-text-option-container');
        this.forwardSlashCommandContainer = document.querySelector('.foreward-slash-command-container');
    }


    placeFormatBar(selection) {
        const rect = selection.getRangeAt(0).getBoundingClientRect();

        const xPosition = this.#checkForWidthOverflow(rect, this.formatBarWidth);
        this.formatBar.style.top = `${rect.top + window.scrollY - this.formatBarHeigth - this.paddingY}px`;
        this.formatBar.style.left = `${xPosition}px`;
    }


    placeCommandBar(selection) {
        const rect = selection.getRangeAt(0).getBoundingClientRect();

        const xPosition = this.#checkForWidthOverflow(rect, this.commandBarWidth);
        const overflow = this.#checkForHeightOverflow(rect);
        if (overflow) {
            this.forwardSlashCommandContainer.style.top = `${rect.bottom + window.scrollY + this.paddingY}px`;
        } else {
            this.forwardSlashCommandContainer.style.top = `${rect.top + window.scrollY - this.commandBarHeigth - this.paddingY}px`;
        }
        this.forwardSlashCommandContainer.style.left = `${xPosition}px`;
    }


    #checkForWidthOverflow(rect, width) {
        const padding = 20; //Pixels
        const screenWidth = window.innerWidth;
        const spawnPoint = rect.left + window.scrollX;
        const totalWidth = spawnPoint + width;

        if (totalWidth > screenWidth) {
            const pixelOverflow = totalWidth - screenWidth;
            return spawnPoint - pixelOverflow - padding;
        }
        return spawnPoint;
    }

    #checkForHeightOverflow(rect) {
        const spawnPoint = rect.top + window.scrollY;
        const totalHeigth = spawnPoint - this.commandBarHeigth; 
        if (totalHeigth <= 10) return true
        return false
    }
}