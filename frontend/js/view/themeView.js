export class ThemeView {
    constructor(themeController) {
        this.themeController = themeController
    }
    /**
     * This method sets the nesecary theme 
     * 
     * @param {Boolean} init A boolean value indicating if 
     * the app is starting or not
     * 
     * If init is set to true @link setTheme will set 
     * the theme to the theme inside the local storage.
     * 
     * If init is set to it's defualt value @link setTheme will
     * set the theme to the oposite theme that is inside the local storage, 
     * and update the theme value. 
     */
    async setTheme(init = false, theme) {
        if (init) {
            if (theme === 'light') await this.#lightMode();
            else await this.#darkmode();
        } else {
            if (theme === 'light') await this.#darkmode();
            else await this.#lightMode();
        }
    }

    async #lightMode() {
        document.body.classList.remove('dark')
        document.body.classList.add('light');
        await this.themeController.updateTheme('light')
    }

    async #darkmode() {
        document.body.classList.remove('light')
        document.body.classList.add('dark');
        await this.themeController.updateTheme('dark')
    }
}