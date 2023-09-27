// function that returns to the main page
const backBtn = document.querySelector(".back_btn");
backBtn.addEventListener("click", ()=> {
    window.location.href = "../pages/listOrBoardPage.html"
})

const fancyCover = document.querySelector(".fancy_cover");
const c = document.querySelector(".todo_list_box")
c.addEventListener("click", () => {
    fancyCover.style.visibility = "visible";
    fancyCover.style.top = "0";
})

