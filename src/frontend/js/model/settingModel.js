import { RequestOptionsBuilder } from "../util/builders/requestOptionsBuilder.js";

export class SettingModel {

    async getTheme(endpoint) {
        const OPTIONS = RequestOptionsBuilder.buildGetOptions();
        return this.#fetchData(endpoint, OPTIONS)
    }

    async updateTheme(endpoint, theme) {
        const OPTIONS = RequestOptionsBuilder.buildPutOptions({'theme': theme});
        return this.#fetchData(endpoint, OPTIONS)
    }

    async getEditorPageStyle(endpoint) {
        const OPTIONS = RequestOptionsBuilder.buildGetOptions();
        return this.#fetchData(endpoint, OPTIONS)
    }

    async updateEditorPageStyle(endpoint, style) {
        const OPTIONS = RequestOptionsBuilder.buildPutOptions({'style': style});
        this.#fetchData(endpoint, OPTIONS)
    }

    async #fetchData(endpoint, options) {
        try {
            const RESPONSE = await fetch(`${endpoint}`, options);
            if (!RESPONSE.ok) throw new Error(`HTTP error Status: ${RESPONSE.status}`)
            return await RESPONSE.json();
        } catch (error) {
            console.error('Error fetching data: ', error.message);
            throw error;
        }
    }
}