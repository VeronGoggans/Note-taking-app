// This function gets triggert if the category settings button in the top right corner gets clicked.
// This function will render the category settings container
// This container contains two buttons.
// Button 1 - Add subcategory
// Button 2 - Delete category
// ____________________________________ RenderCategorySettingsContainer ____________________________________
function renderCategorySettingsContainer() {
    cover1.style.visibility = "visible";
    cover1.style.top = "0";

    // Creating the html elements
    const container = NodeCrafter.create('div', {'class': 'category_settings_container'});
    const button1 = NodeCrafter.create('button', {'class': 'add_subcategory_btn', 'textContent': 'Add subcategory'});
    const button2 = NodeCrafter.create('button', {'class': 'update_category_name_btn', 'textContent': 'Update category'});
    const button3 = NodeCrafter.create('button', {'class': 'delete_subcategory_btn', 'textContent': 'Delete category'});

    // Adding event listeners
    button1.addEventListener('click', ()=> {
        renderSubcategoryContainer('add-subcategory')
    });
    button2.addEventListener('click', ()=> {
        renderSubcategoryContainer('change-category-name')
    });
    button3.addEventListener('click', renderCategoryDeleteContainer);

    // Appending children
    container.appendChild(button1);
    container.appendChild(button2);
    container.appendChild(button3);
    cover1.appendChild(container);
}
// ____________________________________ Behavior ________________________________________________




// This function gets triggert when the Add subgategory button gets clicked.
// And creates a new subcategory inside the parent category. 
function renderSubcategoryContainer(action) {
    clearCover1()
    // Creating the html elements
    const container = NodeCrafter.create('div', {'class': 'add_category_container'});
    const inputBox = NodeCrafter.create('div', {'class': 'add_category_input_box'});
    let input = null;
    const p = NodeCrafter.create('p', {'class': 'new_category_char_count', 'textContent': '0/25'});
    let i = null;
    const button = NodeCrafter.create('button', {'class': 'add_category_btn'});

    if (action === 'add-subcategory') {
        input = NodeCrafter.create('input', {'class': 'category_name_input', 'placeholder': 'Subcategory name'});
        input.maxLength = '25';
        input.type = 'text';
        i = NodeCrafter.create('i', {'class': 'fa-solid fa-plus'});
    }
    if (action === 'change-category-name') {
        input = NodeCrafter.create('input', {'class': 'category_name_input', 'placeholder': 'Category name'});
        input.maxLength = '25';
        input.type = 'text';
        i = NodeCrafter.create('i', {'class': 'fa-solid fa-pen'})
    }

    // adding event listeners
    input.addEventListener("input", (event) => {
        const charCount = document.querySelector(".new_category_char_count");
        charCount.textContent = `${event.target.value.length}/25`;
    })

    if (action === 'add-subcategory') {

    }
    if (action === 'change-category-name') {
        button.addEventListener('click', async()=> {
            requestUpdateCategory(input.value)
        })
    }


    // Appending children
    inputBox.appendChild(input);
    button.appendChild(i);
    container.appendChild(inputBox);
    container.appendChild(p);
    container.appendChild(button);
    cover1.appendChild(container);
}
// ____________________________________ Behavior ________________________________________________
async function requestUpdateCategory(categoryName) {
    const categoryId = MySessionStorage.get('categoryId');
    const response = await updateCategory(categoryId, categoryName);
    if (response.status_code === 200) {
        document.querySelector('.tab_title').textContent = categoryName;
        MySessionStorage.set('categoryName', categoryName)
        cover1.style.top = '100%';
        clearCover1()
    }
}


// ____________________________________ RenderCategoryDeleteContainer ____________________________________
// This function gets triggert if the Delete category button gets clicked.
// And uses two functions to complete its usecase
// function 1 - clearCover1()
// The clearCover1 function removes all child html elements from the cover1 element.
// function 2 - requestDeleteCategory()
// The requestDeleteCategory function will delete the current category from the backend. 
function renderCategoryDeleteContainer() {
    clearCover1()
    const container = NodeCrafter.create('div', {'class': 'confirm_category_delete_container'})
    const categoryName = window.sessionStorage.getItem('categoryName');

    const span = NodeCrafter.create('span', {'textContent': categoryName})
    const deleteMessage1 = 'Deleting ';
    const deleteMessage2 = ' will pirmenantly delete all notes inside it';
    const p1 = NodeCrafter.create('p', {'textContent': deleteMessage1, 'class': 'delete_info_message'});
    const p2 = NodeCrafter.create('p', {'textContent': deleteMessage2});
    const button = NodeCrafter.create('button', {'class': 'confirm_delete_category_btn', 'textContent': 'Delete'});

    button.addEventListener('click', requestDeleteCategory);

    p1.appendChild(span);
    p1.appendChild(p2);
    container.appendChild(p1);
    container.appendChild(button);
    cover1.appendChild(container);
}

// ____________________________________ Behavior ________________________________________________
// This function will delete a category from the backend.
// And then return to the categories page. 
async function requestDeleteCategory() {
    const categoryId = window.sessionStorage.getItem('categoryId');
    const response = await deletecategory(categoryId)
    if (response.status_code === 200) {
        returnToCategoryPage();
    }
}