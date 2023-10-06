const cover = document.querySelector(".cover");
const categoryContainer = document.querySelector(".category_container");
const addCategoryBtn = document.querySelector(".add_category_btn");
const addCategoryInput = document.querySelector(".category_name_input");
const addBtn = document.querySelector(".stage_one_add_btn");
const backBtn = document.querySelector(".back_btn");
const CATEGORY_CONTAINER = document.querySelector(".category_container");
document.addEventListener("DOMContentLoaded", () => {collectCategories(rerender=false)});



// function that returns to the main page
backBtn.addEventListener("click", ()=> window.location.href = "../../index.html");


// funtion that shows the cover
addBtn.addEventListener("click", ()=> {
    cover.style.visibility = "visible";
    cover.style.top = "0";
    addCategoryInput.focus();
})


function hideCover() {
    cover.style.visibility = 'hidden';
    cover.style.top = '100%';
    addCategoryInput.value = ""
    document.querySelector(".new_category_char_count").textContent = "0/25"
}


// function that hides cover when clicking on it
cover.addEventListener("click", (event) => {
    if (!event.target.closest('.add_category_container')) {
        cover.style.visibility = 'hidden';
        cover.style.top = '100%';
    }
})


// function that tells the user how manny characters they have left 
// for their category name. 
document.querySelector(".category_name_input").addEventListener("input", (event) => {
    const charCount = document.querySelector(".new_category_char_count");
    charCount.textContent = `${event.target.value.length}/25`;
})


// function that handles the category card click
// setting the category in the session storage
// and relocating to the notesPage 
function handleCategoryCardClick(categoryName, categoryId) {
    window.sessionStorage.setItem("categoryName", categoryName);
    window.sessionStorage.setItem("categoryId", categoryId);
    window.location.href = "./notesPage.html";
}


// functions that collects all the category names from the server
// and for each category name it creates a card
async function collectCategories(rerender) {
    if (!rerender) {
        const response = await getCategories(rerender);
        const categories = response.category_names;
        if (response.status_code === 200) {
            for (let i = 0; i < categories.length; i++) {
                const categoryId = categories[i].id;
                const categoryName = categories[i].name;
                categoryCard(categoryId, categoryName);
            }
        }
    } else {
        const response = await getCategories(rerender)
        if (response.status_code === 200) {
            const categoryObject = response.category_names
            const categoryId = categoryObject[0].id;
            const categoryName = categoryObject[0].name;
            categoryCard(categoryId, categoryName)
        }
    }
}


// function that creates a category card 
function categoryCard(categoryId, categoryName) {
    const categoryCard = NodeCrafter.create('div', {'class': 'category_card', 'id': categoryId})
    const categoryNameHeading = NodeCrafter.create('div', {'textContent': categoryName})
    const folderIcon = NodeCrafter.create('i', {'class': 'fa-regular fa-folder'})
    folderIcon.style.marginLeft = "5px";

    // adding event listeners 
    categoryCard.addEventListener("click", ()=> handleCategoryCardClick(categoryName, categoryId))
    
    // Appending all the children to their parents
    categoryCard.appendChild(categoryNameHeading);
    categoryCard.appendChild(folderIcon);
    categoryContainer.appendChild(categoryCard);
}


// function that takes the category name given by the user and 
// sends it so the server which will add the category to the json file
// and finally creates a new category card fr that new category
addCategoryBtn.addEventListener("click", async() => {
    const categoryName = addCategoryInput.value;
    const response = await addCategory(categoryName);
    if (response.status_code === 200) {
        hideCover();
        collectCategories(true);
    } else {
        alert("Error 500")
    }
})