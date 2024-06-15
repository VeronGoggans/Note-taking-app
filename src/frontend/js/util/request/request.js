export async function fetchData(endpoint, options) {
    try {
        const response = await fetch(`${endpoint}`, options);
        if (!response.ok) throw new Error(`HTTP error Status: ${response.status}`)
        return await response.json();
    } catch (error) {
        console.error('Error fetching data: ', error.message);
        throw error;
    }
}