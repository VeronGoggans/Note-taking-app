import { CNode } from "./CNode.js";

export function removeContent(contentDiv) {
    while (contentDiv.firstChild) 
        contentDiv.removeChild(contentDiv.firstChild);
}

export function decrementString(string) {
    let num = Number(string);
    num--
    return String(num)
}

export function addDraggImage(event, draggedElement, imageType) {
    // Adding the dragging style to the dragged alement
    draggedElement.classList.add('dragging')

    // Adding the drag image to the body
    const dragImage = new DragImage(imageType);
    document.body.appendChild(dragImage);
    event.dataTransfer.setDragImage(dragImage, 0, 0)
}

class DragImage {
    constructor(type) {
        /**
         * type is either ( folder ) or ( file ) or ( thumbtack )
         * representing the fontAwesome icon class of 
         * ( fa-solid fa-folder ) or ( fa-solid fa-file ) or ( fa-solid fa-thumbtack )
        */
        this.HOST = CNode.create('div', {'class': 'drag-image'});
        this.ICON = CNode.create('i', {'class': `fa-solid fa-${type}`})
        this.HOST.appendChild(this.ICON);
        return this.HOST
    }
}