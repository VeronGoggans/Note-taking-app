const cover = document.querySelector(".cover");



// function that returns to the main page
const backBtn = document.querySelector(".back_btn");
backBtn.addEventListener("click", ()=> {
    window.location.href = "../index.html"
})

// funtion that shows the cover
const addBtn = document.querySelector(".stage_one_add_btn");
addBtn.addEventListener("click", ()=> {
    cover.style.visibility = "visible";
    cover.style.top = "0";
})

// function that hides cover when clicking on it
cover.addEventListener("click", (event) => {
    if (!event.target.closest('.add_thought_container')) {
        cover.style.visibility = 'hidden';
        cover.style.top = '100%';
    }
})