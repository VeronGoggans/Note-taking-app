const notesCard = document.querySelector("#notes_card");
const projectsCard = document.querySelector("#project_card");
const thoughtsCard = document.querySelector("#thoughts_card");
const todosCard = document.querySelector("#todo_card");

const currentYear = new Date().getFullYear();
document.querySelector(".copyright_date").textContent = `Copyright © ${currentYear}`;


thoughtsCard.addEventListener("click", ()=> {
    window.location.href = "./frontend/pages/thoughtsPage.html"
})
notesCard.addEventListener("click", ()=> {
    window.location.href = "./frontend/pages/categoryPage.html"
})
todosCard.addEventListener("click", ()=> {
    window.location.href = "./frontend/pages/listOrBoardPage.html"
})

