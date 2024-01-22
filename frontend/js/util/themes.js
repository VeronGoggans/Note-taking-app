export class Themes {
    constructor(currentTheme) {
        this.currentTheme = currentTheme;
        this.setTheme(true);
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
    setTheme(init = false) {
        if (init) {
            if (this.currentTheme === 'light') this.#lightMode();
            else this.#darkmode();
        } else {
            if (this.currentTheme === 'light') this.#darkmode();
            else this.#lightMode();
        }
    }

    #lightMode() {
        document.body.classList.remove('dark')
        document.body.classList.add('light');
        this.currentTheme = 'light';
        window.localStorage.setItem('theme', 'light');
    }

    #darkmode() {
        document.body.classList.remove('light')
        document.body.classList.add('dark');
        this.currentTheme = 'dark';
        window.localStorage.setItem('theme', 'dark');
    }
}