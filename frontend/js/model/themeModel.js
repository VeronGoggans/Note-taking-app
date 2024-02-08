export class ThemeModel {
    constructor() {

    }

    async getTheme(endpoint) {
        try {
            const RESPONSE = await fetch(`${endpoint}`);
            if (!RESPONSE.ok) throw new Error(`HTTP error Status: ${RESPONSE.status}`);
            return await RESPONSE.json();
        } catch(error) {
            console.error('Error fetching data: ', error.message);
            throw error;
        }
    }

    async updateTheme(endpoint, theme) {
        const PUT_THEME_OBJECT = {
            'theme': theme
        }
        const OPTIONS = {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(PUT_THEME_OBJECT)
        }
        try {
            const RESPONSE = await fetch(`${endpoint}`, OPTIONS);
            if (!RESPONSE.ok) throw new Error(`HTTP error Status: ${RESPONSE.status}`);
            return await RESPONSE.json();
        } catch (error) {
            console.error('Error fetching data: ', error.message);
            throw error;
        }
    }
}