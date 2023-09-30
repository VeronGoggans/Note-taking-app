async function collectCategories() {
    const response = await getCategories(rerender=false);
    const categories = response.category_names;
    if (response.status_code === 200) {renderNoteMoveContainer(categories)}
}


function renderNoteMoveContainer(categories) {
    // Creating the html elements
    const container = NodeCrafter.create('div', {'class': 'move-note-container'});
    const locationIcon = NodeCrafter.create('i', {'class': 'fa-solid fa-location-dot', 'id': 'location-icon'});
    const comboboxBox = NodeCrafter.create('div', {'class': 'move-note-container-combobox-box'});
    const dropdown = NodeCrafter.create('div', {'class': 'dropdown'});
    const select = NodeCrafter.create('div', {'class': 'select'});
    const caret = NodeCrafter.create('div', {'class': 'caret'});
    const menu = NodeCrafter.create('div', {'class': 'menu'});
    const options = []
    categories.forEach(category => {
        const option = NodeCrafter.create('li', {'textContent': category.name, 'id': category.id})
        options.push(option);
    })
    const selected = NodeCrafter.create('span', {'class': 'selected', 'textContent': 'Select a category'});
    const moveBtn = NodeCrafter.create('button', {'class': 'unlock-note-btn', 'textContent': 'Move'});

    // Adding event listeners
    select.addEventListener('click', ()=> {
        select.classList.toggle('select-clicked');
        caret.classList.toggle('caret-rotate');
        menu.classList.toggle('menu-open');
    })

    options.forEach(option => {
        option.addEventListener('click', ()=> {
            selected.innerText = option.innerText;
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');
            options.forEach(option => option.classList.remove('active'));
            option.classList.add('active');
        })
    })

    // Appending children
    container.appendChild(locationIcon);
    select.appendChild(selected);
    select.appendChild(caret);
    options.forEach(option => menu.appendChild(option));
    dropdown.appendChild(select);
    dropdown.appendChild(menu);
    comboboxBox.appendChild(dropdown);
    container.appendChild(comboboxBox);
    container.appendChild(moveBtn);
    cover1.appendChild(container);
}



// const dropdown = document.querySelector('.dropdown');
// const select = dropdown.querySelector('.select');
// const caret = dropdown.querySelector('.caret');
// const menu = dropdown.querySelector('.menu');
// const options = dropdown.querySelectorAll('.menu li');
// const selected = dropdown.querySelector('.selected');

// select.addEventListener('click', ()=> {
//     select.classList.toggle('select-clicked');
//     caret.classList.toggle('caret-rotate');
//     menu.classList.toggle('menu-open');
// })

// options.forEach(option => {
//     option.addEventListener('click', ()=> {
//         selected.innerText = option.innerText;
//         select.classList.remove('select-clicked');
//         caret.classList.remove('caret-rotate');
//         menu.classList.remove('menu-open');
//         options.forEach(option => {
//             option.classList.remove('active');
//         });
//         option.classList.add('active');
//     })
// })