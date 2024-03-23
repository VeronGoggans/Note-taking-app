import { SettingModel } from "../model/settingModel.js";
import { SettingView } from "../view/settingView.js";


export class SettingController {
    constructor() {
        this.settingModel = new SettingModel();
        this.settingView = new SettingView(this);
    }

    async getTheme() {
        const RESPONSE = await this.settingModel.getTheme('/settings/theme');
        return await RESPONSE.theme;
    }

    async updateTheme(theme) {
        const RESPONSE = await this.settingModel.updateTheme('/settings/theme', theme)
        return await RESPONSE.theme;
    }

    async getEditorPageStyle() {
        const RESPONSE = await this.settingModel.getEditorPageStyle('/settings/editor-page-style')
        return await RESPONSE.editor_page_style;
    }

    async updateEditorPageStyle(style) {
        const RESPONSE = await this.settingModel.updateEditorPageStyle('/settings/editor-page-style', style)
        return await RESPONSE.editor_page_style;
    }

    setTheme(init, theme) {
        this.settingView.setTheme(init, theme);
    }

    setEditorPageStyle(init, style) {
        this.settingView.setEditorPageStyle(init, style);
    }
}