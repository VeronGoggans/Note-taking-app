// __________________________________________ [NOTES] GET ____________________________________________

async function getNotes(categoryName, parent, rerender, noteType) {
    const response = await fetch(`/notes/${categoryName}/${parent}/${rerender}/${noteType}`);
    return await response.json();
}

async function getNoteById(parent, noteId) {
    const response = await fetch(`/noteById/${parent}/${noteId}`);
    return await response.json();
}

async function getNotePasswordCheck(id, password) {
    const response = await fetch(`/notePasswordCheck/${id}/${password}`)
    return await response.json();
}

// __________________________________________ [NOTES] POST ____________________________________________

async function addNote(categoryId, parent, noteObject) {
    const response = await fetch(`/note/${categoryId}/${parent}`, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(noteObject)})
    return await response.json();
}

async function addNotePassword(noteId, password, parent) {
    const response = await fetch(`/notePassword/${noteId}/${password}/${parent}`, {method: "POST", headers: {"Content-Type": "application/json"}})
    return await response.json();
}

// __________________________________________ [NOTES] DELETE ____________________________________________

async function deleteNote(noteId, childOfParent) {
    const respone = await fetch(`/note/${noteId}/${childOfParent}`, {method: "DELETE", headers: {"Content-Type": "application/json"}})
    return await respone.json();
}

async function deleteNotePassword(noteId, parent) {
    const response = await fetch(`/notePassword/${noteId}/${parent}`, {method: "DELETE", headers: {"Content-Type": "application/json"}})
    return await response.json();
}

// __________________________________________ [NOTES] UPDATE ____________________________________________

async function updateNote(noteId, parent, noteObject) {
    const response = await fetch(`/note/${noteId}/${parent}`, 
    {method: "PUT", 
    headers: {"Content-Type": "application/json"}, 
    body: JSON.stringify(noteObject)})
    return await response.json();
}

async function updateNoteLocation(noteId, categoryId, parent) {
    const response = await fetch(`/noteLocation/${noteId}/${categoryId}/${parent}`, {method: "PUT", headers: {"Content-Type": "application/json"}})
    return await response.json();
}