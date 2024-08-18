import { fetchData } from "../util/request/request.js";
import { RequestOptionsBuilder } from "../util/builders/requestOptionsBuilder.js";

export class HttpModel {

    async add(endpoint, object) {
        const options = RequestOptionsBuilder.buildPostOptions(object)
        return fetchData(endpoint, options)
    }

    /**
     * Specifiy the endpoint you want to reach.
     * @param {String} endpoint - May include a Id of some sort 
     */
    async get(endpoint) {
        const options = RequestOptionsBuilder.buildGetOptions();
        return fetchData(endpoint, options)
    }

    async update(endpoint, object) {
        const options = RequestOptionsBuilder.buildPutOptions(object)
        return fetchData(endpoint, options)
    }

    /**
     * 
     * Specifiy the endpoint you want to reach.
     * @param {String} endpoint - May include a Id of some sort
     */
    async delete(endpoint, object = null) {
        const options = RequestOptionsBuilder.buildDeleteOptions(object);
        return fetchData(endpoint, options)
    }

    async patch(endpoint) {
        const options = RequestOptionsBuilder.buildPatchOptions()
        return fetchData(endpoint, options)
    }
}