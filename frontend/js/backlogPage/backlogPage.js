const OK = 200;
const projectId = window.sessionStorage.getItem('project-id');


// Sidebar buttons
const sidebarBackButton = document.querySelector('.projectbacklog-page-sidebar-back-button');


// Other
const newItemButton = document.querySelector('.new-backlog-item-button');
const editItemNameButton = document.querySelector('.edit-item-name-button');
const editItemDescriptionButton = document.querySelector('.edit-item-description-button');
const applyItemChangesButton = document.querySelector('.apply-changes-to-item-button');
const deleteItemButton = document.querySelector('.delete-item-button');


// Containers 
const projectCover = document.querySelector('.projectCover');
const backlogContainer = document.querySelector('.product-backlog');
const backlogItemContainer = document.querySelector('.product-backlog-item-container');


// Inputs
const itemNameInput = document.querySelector('.backlog-item-name-input');
const itemDescriptionTextarea = document.querySelector('.backlog-item-description-textarea');
const itemPriorityInput = document.querySelector('.item-priority-input');
const newItemNameInput = document.querySelector('.new-backlog-item-input');


// EventListeners
document.addEventListener("DOMContentLoaded", collectBacklogItems);
sidebarBackButton.addEventListener('click', toProjectHomePage);
newItemButton.addEventListener('click', showNewItemNameInput);
editItemNameButton.addEventListener('click', toggleItemNameReadOnly);
editItemDescriptionButton.addEventListener('click', toggleItemDescriptionReadOnly);
applyItemChangesButton.addEventListener('click', requestUpdateBacklogItem);
newItemNameInput.addEventListener('keypress', async function(event) {
    if (event.key === 'Enter' || event.key === 13) {requestAddBacklogItem()}
})
projectCover.addEventListener('click', (event) => {
    if (!event.target.closest('.new-backlog-item-container')) {hideOverlay()}
})


function renderUpdateBacklogItemCard(itemId, name, description, priority) {
    // Creating HTML element.
    const item = document.querySelector(`#${itemId}`);
    const itemName = item.querySelector('h4');
    const itemDescription = item.querySelector('p');

    // Adding new data
    itemName.value = name;
    itemDescription = description;
}


function renderBacklogItemCard(id, name, description) {
    // Creating HTML elements.
    const item = NodeCrafter.create('div', {'class': 'product-backlog-item', 'id': id});
    const itemName = NodeCrafter.create('h3', {'textContent': name});
    const itemDescription = NodeCrafter.create('p', {'textContent': description});

    // Eventlisteners
    itemName.addEventListener('click', () => {showOverlay(id, name, description)});

    // Appending children
    item.appendChild(itemName);
    item.appendChild(itemDescription);
    backlogItemContainer.appendChild(item);
}


function removeBacklogItemCard(id) {
    const deletedItem = document.querySelector(`#${id}`);
    deletedItem.remove();
}


async function requestAddBacklogItem() {
    const name = newItemNameInput.value;
    const description = '';
    const priority = 'None';
    const response = await addBacklogItem(projectId, name, description, priority);
    if (response.Status_code === OK) {
        const item = response.Object;
        const itemId = item.id;
        const name = item.name;
        hideNewItemNameInput();
        renderBacklogItemCard(itemId, name, description);
    }
}


async function requestUpdateBacklogItem() {
    const itemId = window.sessionStorage.getItem('backlog-item');
    const name = itemNameInput.value;
    const description = itemDescriptionTextarea.value;
    const priority = 'None';
    const response = await updateBacklogItem(projectId, itemId, name, description, priority);
    if (response.Status_code === OK) {
        const item = response.Object;
        const name = item.name;
        const description = item.description;
        const priority = item.priority;
        renderUpdateBacklogItemCard(itemId, name, description, priority);
    }
}


async function collectBacklogItems() {
    const response = await getBacklogItems(projectId);
    if (response.Status_code === OK) {
        const items = response.Objects;
        console.log(items)
        for (let i = 0; i < items.length; i++) {
            const itemId = items[i].id;
            const name = items[i].name;
            const description = items[i].description;
            const priority = items[i].priority;
            renderBacklogItemCard(itemId, name, description);
        }
    }
}