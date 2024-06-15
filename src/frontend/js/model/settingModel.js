import { RequestOptionsBuilder } from "../util/builders/requestOptionsBuilder.js";
import { fetchData } from "../util/request/request.js";

export class SettingModel {

    async getTheme(endpoint) {
        const OPTIONS = RequestOptionsBuilder.buildGetOptions();
        return fetchData(endpoint, OPTIONS)
    }

    async updateTheme(endpoint, theme) {
        const OPTIONS = RequestOptionsBuilder.buildPutOptions();
        return fetchData(`${endpoint}/${theme}`, OPTIONS)
    }

    async getEditorPageStyle(endpoint) {
        const OPTIONS = RequestOptionsBuilder.buildGetOptions();
        return fetchData(endpoint, OPTIONS)
    }

    async updateEditorPageStyle(endpoint, style) {
        const OPTIONS = RequestOptionsBuilder.buildPutOptions();
        fetchData(`${endpoint}/${style}`, OPTIONS)
    }
}