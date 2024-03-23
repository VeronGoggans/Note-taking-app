export class SettingModel {

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

    async getEditorPageStyle(endpoint) {
        try {
            const RESPONSE = await fetch(`${endpoint}`);
            if (!RESPONSE.ok) throw new Error(`HTTP error Status: ${RESPONSE.status}`);
            return await RESPONSE.json();
        } catch(error) {
            console.error('Error fetching data: ', error.message);
            throw error;
        }
    }

    async updateEditorPageStyle(endpoint, style) {
        const PUT_EDITOR_PAGE_STYLE_OBJECT = {
            'style': style
        }
        const OPTIONS = {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(PUT_EDITOR_PAGE_STYLE_OBJECT)
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