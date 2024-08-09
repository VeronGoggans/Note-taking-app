import { HttpModel } from "../model/httpModel.js";
import { SettingView } from "../view/settingView.js";


export class SettingController {
    constructor(applicationController) {
        this.model = new HttpModel();
        this.applicationController = applicationController;
    }

    async init() {
        const currentTheme = await this.getTheme();
        this.view = new SettingView(this, this.applicationController);
        this.view.setThemeDropdownState(currentTheme);
    }

    async loadCurrentTheme() {
        const currentTheme = await this.getTheme();
        if (currentTheme === 'light') {
            document.body.classList.add('light')
        }
        else if (currentTheme === 'dark') {
            document.body.classList.add('dark');
        }
    }

    async getTheme() {
        const response = await this.model.get('/settings/theme');
        return response.theme;
    }

    async updateTheme(theme) {
        const response = await this.model.update(`/settings/theme/${theme}`, null);
        return response.theme;
    }

    setTheme(init, theme) {
        this.view.setTheme(init, theme);
    }
}