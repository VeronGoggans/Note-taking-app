import { AnimationHandler } from "../handlers/animation/animationHandler.js";

export class SettingView {
    constructor(controller, applicationController) {
        this.controller = controller;
        this.applicationController = applicationController;
        this.#initializeDomElements();
        this.#attachEventListeners();
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
        this.closeDropdowns();
        this.setThemeDropdownState('Light');
        document.body.classList.remove('dark');
        document.body.classList.add('light');
        await this.controller.updateTheme('light');
    }
    
    async #darkmode() {
        this.closeDropdowns();
        this.setThemeDropdownState('Dark');
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        await this.controller.updateTheme('dark');
    }

    toggleDropdown(dropdownItems) {
        this.closeDropdowns(dropdownItems);
        dropdownItems.style.visibility = dropdownItems.style.visibility === 'visible' ? 'hidden' : 'visible';
        dropdownItems.style.opacity = dropdownItems.style.opacity === '1' ? '0' : '1';
    }

    closeDropdowns(targetDropdown) {
        this.dropdowns.forEach((dropdown) => {
            if (dropdown !== targetDropdown) {
              dropdown.style.visibility = 'hidden';
              dropdown.style.opacity = '0';
            }
        });
    }

    #initializeDomElements() {
        this.settingsView = document.querySelector('.settings');
        this.themeInput = document.querySelector('.theme-dropdown input');
        this.themeDropdown = document.querySelector('.theme-dropdown ul')
        this.languageInput = document.querySelector('.language-dropdown input');
        this.languageDropdown = document.querySelector('.language-dropdown ul');
        this.dropdowns = [this.themeDropdown, this.languageDropdown];
        this.darkThemeOption = document.querySelector('.theme-dropdown ul li[theme="dark"]');
        this.lightThemeOption = document.querySelector('.theme-dropdown ul li[theme="light"]');
    }

    #attachEventListeners() {
        this.themeInput.addEventListener('click', () => {this.toggleDropdown(this.themeDropdown)});
        this.languageInput.addEventListener('click', () => {this.toggleDropdown(this.languageDropdown)});
        this.lightThemeOption.addEventListener('click', () => {this.#lightMode()});
        this.darkThemeOption.addEventListener('click', () => {this.#darkmode()});
        this.settingsView.addEventListener('click', (event) => {
            const excludedContainers = ['.theme-dropdown','.language-dropdown'];

            // Check if the click was on a dropdown.
            if (excludedContainers.some(selector => event.target.closest(selector))) {
                return;
            } this.closeDropdowns();
        });
    }
}