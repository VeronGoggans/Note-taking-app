// Bars button 
const sidebar = document.querySelector('.sidebar');
const sidebarBarsButton = sidebar.firstElementChild;
sidebarBarsButton.addEventListener('click', sidebarSlideIn);

// containers
const wrapper = document.querySelector('.wrapper');

// EventListeners
window.addEventListener('resize', screenWidth);


// This function is used to collapse the sidebar
let sidebarToggle = true;
function sidebarSlideIn() {
    if (sidebarToggle) {
        wrapper.style.gridTemplateColumns = '250px 1fr';
        window.sessionStorage.setItem('sidebar-status', 'large')
    }
    else {
        wrapper.style.gridTemplateColumns = '70px 1fr';
        window.sessionStorage.setItem('sidebar-status', 'small')
    }
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

function setSidbarSize() {
    const sidebarStatus = window.sessionStorage.getItem('sidebar-status')
    if (sidebarStatus === 'large') {wrapper.style.gridTemplateColumns = '250px 1fr'}
    if (sidebarStatus === 'small') {wrapper.style.gridTemplateColumns = '70px 1fr'}
}
setSidbarSize()