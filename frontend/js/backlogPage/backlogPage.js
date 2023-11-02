// Sidebar buttons
const sidebarBackButton = document.querySelector('.projectbacklog-page-sidebar-back-button');


// Other
const newItemButton = document.querySelector('.new-backlog-item-button');


// Containers 
const cover = document.querySelector('.cover');


// Inputs


// EventListeners
sidebarBackButton.addEventListener('click', toProjectHomePage);
newItemButton.addEventListener('click', showOverlay);

cover.addEventListener('click', (event) => {
    if (
        !event.target.closest('.new-backlog-item-container')
        ) hideOverlay();
})

// Functions 

function toProjectHomePage() {
    window.location.href = './projectHomePage.html';
}

function showOverlay() {
    cover.style.visibility = 'visible';
    cover.style.top = '0%';
}

function hideOverlay() {
    cover.style.visibility = 'hidden';
    cover.style.top = '100%';
}