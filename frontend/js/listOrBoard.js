// function that returns to the main page
const backBtn = document.querySelector(".back_btn");
backBtn.addEventListener("click", ()=> {
    window.location.href = "../index.html"
})

const listCardContainer = document.querySelector(".list_card_container");
listCardContainer.addEventListener("click", ()=> {
    window.location.href = "../pages/todoListPage.html"
})