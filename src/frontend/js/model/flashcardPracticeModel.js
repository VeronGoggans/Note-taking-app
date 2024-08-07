import { RequestOptionsBuilder } from "../util/builders/requestOptionsBuilder.js"
import { fetchData } from "../util/request/request.js";

export class FlashcardPracticeModel {

    async update(deckId, timeStudied, flashcards) {
        const options = RequestOptionsBuilder.buildPutOptions({'deck_id': deckId, 'time_studied': timeStudied, 'flashcards': flashcards});        
        return fetchData('/flashcardRatings', options)
    } 
}