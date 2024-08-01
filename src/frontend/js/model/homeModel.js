import { RequestOptionsBuilder } from "../util/builders/requestOptionsBuilder.js";
import { fetchData } from "../util/request/request.js";

export class HomeModel {
    constructor() {

    }

    getRecent(endpoint) {
        const options = RequestOptionsBuilder.buildGetOptions()
        return fetchData(endpoint, options);
    }
}