const OK = 200;

// Sidebar buttons
const sidebarBackButton = document.querySelector(".project-home-page-sidebar-back-button");
const sidebarBoardButton = document.querySelector('.project-home-page-sidebar-project-board-button');
const sidebarBacklogButton = document.querySelector('.project-home-page-sidebar-product-backlog-button');
const sidebarUserStoryButton = document.querySelector('.project-home-page-sidebar-user-stories-button');
const sidebarSettingsButton = document.querySelector('.project-home-page-sidebar-settings-button');


// Other
const projectName = document.querySelector('.project-name');
const projectDescription = document.querySelector('.project-description');


// Containers 


// Inputs


// EventListeners
sidebarBackButton.addEventListener('click', exitProject);
document.addEventListener("DOMContentLoaded", collectProjectInfo);


// Functions 
function exitProject() {
    window.sessionStorage.setItem('project-id', '');
    window.location.href = './projectCollectionPage.html';
}

async function collectProjectInfo() {
    id = window.sessionStorage.getItem('project-id');
    const response = await getById(id, ['name', 'description']);
    const name = response.Object['name'];
    const description = response.Object['description'];
    projectName.textContent = name;
    projectDescription.innerHTML = StringUtil.replaceNewlineWithBreak(description);
}
