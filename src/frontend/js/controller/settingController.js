import { SettingModel } from "../model/settingModel.js";
import { SettingView } from "../view/settingView.js";


export class SettingController {
    constructor(applicationController) {
        this.model = new SettingModel();
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
        const response = await this.model.getTheme('/settings/theme');
        return await response.theme;
    }

    async updateTheme(theme) {
        const response = await this.model.updateTheme('/settings/theme', theme)
        return await response.theme;
    }

    setTheme(init, theme) {
        this.view.setTheme(init, theme);
    }
}