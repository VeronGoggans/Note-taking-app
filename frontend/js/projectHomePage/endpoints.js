async function getProjects() {
    const response = await fetch('/projects');
    return await response.json();
}

async function getById(id, relevantData) {
    const requestObject = {
        "relevant_data": relevantData
    };
    const response = await fetch(`/projectById/${id}`, {
        method: "POST", 
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify(requestObject)
    });
    return await response.json();
}

async function addProject(name, description) {
    const projectRequestObject = {
        "name": name,
        "description": description
    };
    const response = await fetch(
        '/project', 
        {method: "POST", 
        body: JSON.stringify(projectRequestObject),
        headers: {"Content-Type": "application/json"}
    });
    return await response.json();   
}