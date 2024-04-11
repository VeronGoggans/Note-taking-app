export class DragAndDrop {
    constructor(view) {
        this.view = view;
    }
    
    allowDrop(event) {
        event.preventDefault();
    }

    drag(event) {
        event.dataTransfer.setData("text", event.target.id);
    }

    drop(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData("text");
        const draggedCard = document.getElementById(data);
        const folder = event.target;

        if (folder.classList.contains("droppable")) {
            this.view.handleNoteDrop(draggedCard.id, folder.id)
        }
    }
}