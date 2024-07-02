import { RequestOptionsBuilder } from "../util/builders/requestOptionsBuilder.js"
import { fetchData } from "../util/request/request.js";


export class FlashcardModel {
    
    async get(endpoint) {
        const options = RequestOptionsBuilder.buildGetOptions();
        return fetchData(endpoint, options);
    }

    async getById(endpoint, flashcardId) {
        const options = RequestOptionsBuilder.buildGetOptions();
        return fetchData(`${endpoint}/${flashcardId}`, options);
    }

    async add(endpoint) {
        
    }

    async update(endpoint) {
    
    }

    async delete(endpoint, flashcardId) {
        const options = RequestOptionsBuilder.buildDeleteOptions();
        return fetchData(`${endpoint}/${flashcardId}`, options);
    }
}