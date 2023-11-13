async function getDirectories() {
    const response = await fetch(`/directories`);
    return await response.json();
}


async function addDirectory(dir_name) {
    const request_object = {'name': dir_name}
    const response = await fetch(
        '/directory', 
        {method: "POST", body: JSON.stringify(request_object),
        headers: {"Content-Type": "application/json"}})
    return await response.json();
}


async function updateDirectory(dir_id, new_dir_name) {
    const request_object = {'name': new_dir_name}
    const response = await fetch(
        `/category/${dir_id}`, 
        {method: "PUT", 
        body: JSON.stringify(request_object),
        headers: {"Content-Type": "application/json"}})
    return await response.json();
}


async function deleteDirectory(dir_id) {
    const response = await fetch(
        `/category/${dir_id}`,
        {method: "DELETE", 
        headers: {"Content-Type": "application/json"}})
    return await response.json();
}