import { ThemeModel } from "../model/themeModel.js";
import { ThemeView } from "../view/themeView.js";


export class ThemeController {
    constructor() {
        this.themeModel = new ThemeModel();
        this.themeView = new ThemeView(this);
    }

    async getTheme() {
        const RESPONSE = await this.themeModel.getTheme('/theme');
        const THEME = await RESPONSE.theme;
        return THEME
    }

    async updateTheme(theme) {
        const RESPONSE = await this.themeModel.updateTheme('/theme', theme)
        const THEME = await RESPONSE.theme;
        return THEME
    }

    setTheme(init, theme) {
        this.themeView.setTheme(init, theme);
    }
}