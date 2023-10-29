const OK = 200;

// Sidebar buttons
const sidebarBackButton = document.querySelector(".projects-page-sidebar-back-button");
const sidebarSettingsButton = document.querySelector('.projects-page-sidebar-settings-button');

// Other
const newProjectButton = document.querySelector('.new-project-button');
const addProjectButton = document.querySelector('.add-project-button');

// Containers 
const projectsContainer = document.querySelector(".projects-container");
const newProjectForm = document.querySelector('.new-project-info-container');
const cover = document.querySelector('.cover');

// Inputs
const projectNameInput = document.querySelector('.project-name-input');
const projectDescriptionInput = document.querySelector('.project-description-textarea');

// EventListeners
sidebarBackButton.addEventListener('click', () => {window.location.href = '../../index.html'});
newProjectButton.addEventListener('click', showCover);
newProjectForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const name = newProjectForm.elements.projectName.value;
    const description = newProjectForm.elements.projectDescription.value;
    const response = await addProject(name, description);
    if (response.Status_code === OK) {
        const id = response.Return_object.id;
        const name = response.Return_object.name;
        hideCover();
        clearProjectFrom()
        renderProjectCard(id, name);
    }
})
document.addEventListener("DOMContentLoaded", () => {collectProjects()});
cover.addEventListener("click", (event) => {if (!event.target.closest('.new-project-container')) hideCover()});



// Functions
async function collectProjects() {
    const response = await getProjects();
    const projects = response.Objects
    if (response.Status_code === OK) {
        for (let i = 0; i < projects.length; i++) {
            renderProjectCard(projects[i].id, projects[i].name)
        }
    }
}

function handleProjectCardClick(projectId) {
    window.sessionStorage.setItem('project-id', projectId);
    window.location.href = './projectHomePage.html';
}

function renderProjectCard(id, name) {
    // Creating HTML elements
    const projectCard = NodeCrafter.create('div', {'class': 'project-card', 'id': id});
    const projectName = NodeCrafter.create('p', {'textContent': name});
    const projectIcon = NodeCrafter.create('i', {'class': 'fa-solid fa-code-commit'});

    // adding event listeners 
    projectCard.addEventListener('click', ()=> handleProjectCardClick(id))

    // Appending children
    projectCard.appendChild(projectName);
    projectCard.appendChild(projectIcon);
    projectsContainer.appendChild(projectCard);
}

function hideCover() {
    cover.style.visibility = 'hidden';
    cover.style.top = '100%';
}

function showCover() {
    cover.style.visibility = 'visible';
    cover.style.top = '0%';
}

function clearProjectFrom() {
    projectNameInput.value = '';
    projectDescriptionInput.value = '';
}