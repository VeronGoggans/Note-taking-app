// Bars button 
const sidebar = document.querySelector('.sidebar');
const sidebarBarsButton = sidebar.firstElementChild;
sidebarBarsButton.addEventListener('click', collapseSidebar);

// containers
const wrapper = document.querySelector('.wrapper');

// EventListeners
window.addEventListener('resize', screenWidth);


// This function is used to collapse the sidebar
let sidebarToggle = false;
function collapseSidebar() {
    if (sidebarToggle) {wrapper.style.gridTemplateColumns = '250px 1fr';}
    else {wrapper.style.gridTemplateColumns = '70px 1fr';}
    sidebarToggle = !sidebarToggle;
}

// This function keeps track of the screen width 
function screenWidth() {
    const minScreenWidth = window.innerWidth;
    if (minScreenWidth < 595) {
        wrapper.style.gridTemplateColumns = '70px 1fr';
        sidebarToggle = true;
    }
}

// This function will send the sidebar status to the sessionStorage
// so that if collapsed in one page it stays collapsed in the other page. 
function saveSidebarStatus() {

}