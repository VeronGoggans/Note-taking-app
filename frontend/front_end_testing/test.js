const ul = document.querySelector("ul");
const addTaskBtn = document.querySelector(".addTodoBtn");
const todoInput = document.querySelector("#todo_input");
todoInput.se

function element(elName) {return document.createElement(elName);}


addTaskBtn.addEventListener("click", ()=> {
    if (todoInput.value !== "") {
        const todo = element("li");
        todo.innerHTML = todoInput.value;
        todoInput.value = "";
        ul.appendChild(todo);

        const span = element("span");
        const icon = element("i");
        icon.setAttribute("class", "fa-solid fa-xmark");
        span.appendChild(icon);
        todo.appendChild(span);
    }
})