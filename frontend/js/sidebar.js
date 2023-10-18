// Bars button 
const sidebar = document.querySelector('.sidebar');
const sidebarBarsButton = sidebar.firstElementChild;
sidebarBarsButton.addEventListener('click', sidebarSlideIn);

// containers
const wrapper = document.querySelector('.wrapper');

// EventListeners
window.addEventListener('resize', screenWidth);


// Get all filter buttons
const filterButtons = document.querySelectorAll('.filter-button');

// Add click event listeners to each button
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove the active class from all buttons
        filterButtons.forEach(btn => {
            btn.classList.remove('active-filter-button');
        });
        // Add the active class to the clicked button
        button.classList.add('active-filter-button');
    });
});

// This function is used to collapse the sidebar
let sidebarToggle = setSidebarToggle();
function sidebarSlideIn() {
    if (sidebarToggle) {
        wrapper.style.gridTemplateColumns = '250px 1fr';
        window.sessionStorage.setItem('sidebar-status', 'large');
    }
    else {
        wrapper.style.gridTemplateColumns = '70px 1fr';
        window.sessionStorage.setItem('sidebar-status', 'small');
    }
    sidebarToggle = !sidebarToggle;
}

// This function keeps track of the screen width 
function screenWidth() {
    const minScreenWidth = window.innerWidth;
    if (minScreenWidth < 595) {
        wrapper.style.gridTemplateColumns = '70px 1fr';
        sidebarToggle = true;
        window.sessionStorage.setItem('sidebar-status', 'small');
    }
}

function setSidebarToggle() {
    if (window.sessionStorage.getItem('sidebar-status') === 'small') return true;
    else return false;
}

function setSidebarSize() {
    const sidebarStatus = window.sessionStorage.getItem('sidebar-status')
    if (sidebarStatus === 'large') {wrapper.style.gridTemplateColumns = '250px 1fr'}
    if (sidebarStatus === 'small') {wrapper.style.gridTemplateColumns = '70px 1fr'}
}
setSidebarSize()