// Sidebar buttons
const sidebarBarsButton = document.querySelector('.home-page-sidebar-bars-button');
const sidebarNotesButton = document.querySelector('.home-page-sidebar-notes-button');
const sidebarProjectsButton = document.querySelector('.home-page-sidebar-projects-button');
const sidebarSettingsButton = document.querySelector('.home-page-sidebar-settings-button');

// Icons


// containers
const wrapper = document.querySelector('.wrapper');


// eventListeners
sidebarBarsButton.addEventListener('click', collapseSidebar);
sidebarNotesButton.addEventListener('click', ()=> {window.location.href='frontend/pages/categoryPage.html'})



// functions
// This function is used to collapse the sidebar
let sidebarToggle = false;
function collapseSidebar() {
    if (sidebarToggle) {
        wrapper.style.gridTemplateColumns = '300px 1fr';
    }
    else {
        wrapper.style.gridTemplateColumns = '70px 1fr';
    }
    sidebarToggle = !sidebarToggle;
}
