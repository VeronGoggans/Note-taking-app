// Functions 
function toProjectHomePage() {
    window.location.href = './projectHomePage.html';
}

function showNewItemNameInput() {
    newItemNameInput.style.visibility = 'visible';
    backlogContainer.style.gridTemplateRows = '50px 1fr 40px 50px';
}

function hideNewItemNameInput() {
    newItemNameInput.style.visibility = 'hidden';
    newItemNameInput.value = '';
    backlogContainer.style.gridTemplateRows = '50px 1fr 0px 50px';
}

function showOverlay(itemId, name, description) {
    // Styling changes
    projectCover.style.visibility = 'visible';
    projectCover.style.top = '0%';

    // Data functionality
    window.sessionStorage.setItem('backlog-item', itemId);
    itemNameInput.value = name;
    itemDescriptionTextarea.value = description;
}

function hideOverlay() {
    projectCover.style.visibility = 'hidden';
    projectCover.style.top = '100%';
}

function toggleItemNameReadOnly(event) {
    event.preventDefault();
    itemNameInput.readOnly = !itemNameInput.readOnly;
    editItemNameButton.textContent = itemNameInput.readOnly ? "Edit" : "Save";
    itemNameInput.style.borderColor = itemNameInput.readOnly ? "transparent" : "#669DFF";
}

function toggleItemDescriptionReadOnly(event) {
    event.preventDefault();
    itemDescriptionTextarea.readOnly = !itemDescriptionTextarea.readOnly;
    editItemDescriptionButton.textContent = itemDescriptionTextarea.readOnly ? "Edit" : "Save";
    itemDescriptionTextarea.style.borderColor = itemDescriptionTextarea.readOnly ? "transparent" : "#669DFF";
}