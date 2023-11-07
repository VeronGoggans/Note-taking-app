// Sidebar buttons
const sidebarBackButton = document.querySelector('.projectbacklog-page-sidebar-back-button');


// Other
const newItemButton = document.querySelector('.new-backlog-item-button');


// Containers 
const projectCover = document.querySelector('.projectCover');


// Inputs


// EventListeners
sidebarBackButton.addEventListener('click', toProjectHomePage);
newItemButton.addEventListener('click', showOverlay);

projectCover.addEventListener('click', (event) => {
    if (
        !event.target.closest('.new-backlog-item-container')
        ) hideOverlay();
})

// Functions 

function toProjectHomePage() {
    window.location.href = './projectHomePage.html';
}

function showOverlay() {
    projectCover.style.visibility = 'visible';
    projectCover.style.top = '0%';
}

function hideOverlay() {
    projectCover.style.visibility = 'hidden';
    projectCover.style.top = '100%';
}