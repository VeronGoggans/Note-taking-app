import { RequestOptionsBuilder } from "../util/builders/requestOptionsBuilder.js"
import { fetchData } from "../util/request/request.js";


export class TemplateModel {

    async get(endpoint) {
        const options = RequestOptionsBuilder.buildGetOptions();
        return fetchData(endpoint, options);
    }

    async getById(endpoint, templateId) {
        const options = RequestOptionsBuilder.buildGetOptions();
        return fetchData(`${endpoint}/${templateId}`, options);
    }

    async add(endpoint, name, content) {
        const options = RequestOptionsBuilder.buildPostOptions({
            'name': name,
            'content': content
        })
        return fetchData(endpoint, options)
    }

    async update(endpoint, name, content) {
        const options = RequestOptionsBuilder.buildPutOptions({
            'name': name,
            'content': content
        })
        return fetchData(endpoint, options)
    }

    async delete(endpoint, templateId) {
        const options = RequestOptionsBuilder.buildDeleteOptions();
        return fetchData(`${endpoint}/${templateId}`, options);
    }
}