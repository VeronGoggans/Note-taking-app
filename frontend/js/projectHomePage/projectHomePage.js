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
const editNameButton = document.querySelector('.edit-project-name-button');
const editDescriptionButton = document.querySelector('.edit-project-description-button');


// Containers 


// Inputs


// EventListeners
document.addEventListener("DOMContentLoaded", collectProjectInfo);
sidebarBackButton.addEventListener('click', exitProject);
projectName.addEventListener('focus', projectNameFocus);
projectName.addEventListener('blur', projectNameBlur);
editDescriptionButton.addEventListener('click', toggleDescriptionEditable)


// Functions 
function exitProject() {
    window.sessionStorage.setItem('project-id', '');
    window.location.href = './projectCollectionPage.html';
}

function toggleDescriptionEditable() {
    const editAble = projectDescription.contentEditable === "true";
    // Toggle the contentEditable attribute
    projectDescription.contentEditable = editAble ? "false" : "true";
    editDescriptionButton.textContent = editAble ? "Edit" : "Save";
    projectDescription.style.borderColor = editAble ? "transparent" : "#669DFF";
}

function projectNameFocus() {
    editNameButton.style.visibility = 'visible';
    editNameButton.style.opacity = '100%';
    projectName.style.cursor = 'auto';
}

function projectNameBlur() {
    editNameButton.style.visibility = 'hidden';
    editNameButton.style.opacity = '0%';
    projectName.style.cursor = 'pointer';
}

async function collectProjectInfo() {
    id = window.sessionStorage.getItem('project-id');
    const response = await getById(id, ['name', 'description']);
    const name = response.Object['name'];
    const description = response.Object['description'];
    projectName.textContent = name;
    projectDescription.innerHTML = StringUtil.replaceNewlineWithBreak(description);
}
