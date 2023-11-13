async function getSubDirectories(dir_id) {
    const response = await fetch(`/subDirectories/${dir_id}`);
    return await response.json();
}


async function addSubDirectory(dir_id, sub_dir_name) {
    const request_object = {'name': sub_dir_name}
    const response = await fetch(
        `/subDirectory/${dir_id}`,
        {method: "POST", 
        body: JSON.stringify(request_object),
        headers: {"Content-Type": "application/json"}})
    return await response.json();
}