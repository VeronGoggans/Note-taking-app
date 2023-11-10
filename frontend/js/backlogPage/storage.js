function storeItemData(name, description, priority) {
    window.sessionStorage.setItem('item-name', name);
    window.sessionStorage.setItem('item-description', description);
    window.sessionStorage.setItem('item-priority', priority);
}


function retrieveItemData() {
    const name = window.sessionStorage.getItem('item-name');
    const description = window.sessionStorage.getItem('item-description');
    const priority = window.sessionStorage.getItem('item-priority');
    return [name, description, priority];
}