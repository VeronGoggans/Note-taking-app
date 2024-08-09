import { AnimationHandler } from "../handlers/animation/animationHandler.js";
import { DropdownHelper } from "../helpers/dropdownHelper.js";

export class SettingView {
    constructor(controller, applicationController) {
        this.controller = controller;
        this.applicationController = applicationController;
        this.#initializeDomElements();
        this.#attachEventListeners();
        this.dropdownHelper = new DropdownHelper(this, this.dropdowns, this.dropdownOptions);
        AnimationHandler.fadeInFromSide(this.settingsView);
    }

    setThemeDropdownState(currentTheme) {
        // Capitalize the first letter. 
        this.themeInput.value = currentTheme.charAt(0).toUpperCase() + 
        currentTheme.slice(1);
    }

    setLanguageDropdownState(currentLanguage) {
        // Capitalize the first letter. 
        this.languageInput.value = currentLanguage.charAt(0).toUpperCase() + 
        currentLanguage.slice(1);
    }

    async #lightMode() {
        this.dropdownHelper.closeDropdowns();
        this.setThemeDropdownState('Light');
        document.body.classList.remove('dark');
        document.body.classList.add('light');
        await this.controller.updateTheme('light');
    }
    
    async #darkmode() {
        this.dropdownHelper.closeDropdowns();
        this.setThemeDropdownState('Dark');
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        await this.controller.updateTheme('dark');
    }


    #initializeDomElements() {
        this.settingsView = document.querySelector('.settings');
        this.themeInput = document.querySelector('.theme-dropdown input');
        this.themeDropdownOptions = document.querySelector('.theme-dropdown ul');
        this.darkThemeOption = document.querySelector('.theme-dropdown ul li[theme="dark"]');
        this.lightThemeOption = document.querySelector('.theme-dropdown ul li[theme="light"]');

        this.languageInput = document.querySelector('.language-dropdown input');
        this.languageDropdownOptions = document.querySelector('.language-dropdown ul');

        this.dropdowns = [this.themeInput, this.languageInput];
        this.dropdownOptions = [this.themeDropdownOptions, this.languageDropdownOptions]
    }

    #attachEventListeners() {
        this.lightThemeOption.addEventListener('click', () => {this.#lightMode()});
        this.darkThemeOption.addEventListener('click', () => {this.#darkmode()});
        this.settingsView.addEventListener('click', (event) => {
            const excludedContainers = ['.theme-dropdown','.language-dropdown'];

            // Check if the click was on a dropdown.
            if (excludedContainers.some(selector => event.target.closest(selector))) {
                return;
            } this.dropdownHelper.closeDropdowns();
        });
    }
}