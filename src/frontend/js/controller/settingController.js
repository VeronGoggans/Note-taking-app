import { HttpModel } from "../model/httpModel.js";
import { SettingView } from "../view/settingView.js";


export class SettingController {
    constructor(applicationController) {
        this.model = new HttpModel();
        this.applicationController = applicationController;
    }

    async init() {
        const settings = await this.getSettings();
        this.view = new SettingView(this, this.applicationController);
        this.view.setDropdownStates(settings);
    }

    async loadSettings() {
        const settings = await this.getSettings();
        document.body.classList.add(settings.theme);
        if (settings.sidebarColor === 'soft') {
            document.querySelector('.sidebar').classList.add(settings.sidebarColor);
        }
    }

    async getSettings() {
        const { settings } = await this.model.get('/settings');
        return settings;
    }

    async updateTheme(newTheme) {
        const { theme } = await this.model.update(`/settings/theme/${newTheme}`);
        return theme;
    }

    async updateSidebarColor(newColor) {
        const { color } = await this.model.update(`/settings/sidebarColor/${newColor}`);
        return color;

    }
}