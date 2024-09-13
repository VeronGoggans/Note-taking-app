import { BadRequest_400, NotFound_404, InternalServerError_500 } from "./exceptions.js";

export async function fetchData(endpoint, options) {
    try {

        const backendResponse = await fetch(`http://127.0.0.1:8000${endpoint}`, options);

        if (backendResponse.status === 400) {
            throw new BadRequest_400('Your input is invalid or incomplete')
        }
        if (backendResponse.status === 404) {
            throw new NotFound_404('The specified source you are looking and or refering to could not be found')
        }
        if (backendResponse.status === 500) {
            throw new InternalServerError_500('The server could not handle this request.')
        }
        if (!backendResponse.ok) {
            throw new Error(`HTTP error status: ${backendResponse.status}`)
        }
        return await backendResponse.json();
    }
    catch(error) {
        if (error instanceof BadRequest_400) {
            console.error("BadRequest_400 Error: ", error.message);
        } else if (error instanceof NotFound_404) {
            console.error("NotFound_404 Error: ", error.message);
        } else if (error instanceof InternalServerError_500) {
            console.error("InternalServerError_500 Error: ", error.message);
        } else {
            console.error("General Error: ", error.message);
        }

        // Optionally rethrow the error if you want it to propagate further
        throw error;
    }
    
}