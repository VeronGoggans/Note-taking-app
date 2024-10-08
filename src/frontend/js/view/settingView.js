import { AnimationHandler } from "../handlers/animation/animationHandler.js";
import { DropdownHelper } from "../helpers/dropdownHelper.js";
import { capitalizeFirstLetter } from "../util/formatters.js";

export class SettingView {
    constructor(controller, applicationController) {
        this.controller = controller;
        this.applicationController = applicationController;
        this.#initElements();
        this.#eventListeners();
        this.dropdownHelper = new DropdownHelper(this, this.dropdowns, this.dropdownOptions);
        AnimationHandler.fadeInFromSide(this.settingsView);
    }

    setDropdownStates(settings) {
        this.themeInput.value = capitalizeFirstLetter(settings.theme);
        this.sidebarColorInput.value = capitalizeFirstLetter(settings.sidebarColor);
    }


    async #lightMode() {
        this.dropdownHelper.closeDropdowns();
        this.themeInput.value = 'Light';
        document.body.classList.remove('dark');
        document.body.classList.add('light');
        await this.controller.updateTheme('light');
    }
    
    async #darkmode() {
        this.dropdownHelper.closeDropdowns();
        this.themeInput.value = 'Dark';
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        await this.controller.updateTheme('dark');
    }

    async #originalColor() {
        this.dropdownHelper.closeDropdowns();
        this.sidebarColorInput.value = 'Original';
        this.sidebar.classList.remove('soft');
        await this.controller.updateSidebarColor('original');
    }

    async #softColor() {
        this.dropdownHelper.closeDropdowns();
        this.sidebarColorInput.value = 'Soft';
        if (!this.sidebar.classList.contains('soft')) {
            this.sidebar.classList.add('soft');
            await this.controller.updateSidebarColor('soft');
        }
    }


    #initElements() {
        this.settingsView = document.querySelector('.settings');
        this.sidebar = document.querySelector('.sidebar');
        this.themeInput = document.querySelector('.theme-dropdown input');
        this.sidebarColorInput = document.querySelector('.sidebar-color-dropdown input');
        this.sidebarOptions = document.querySelector('.sidebar-color-dropdown ul');
        this.themeOptions = document.querySelector('.theme-dropdown ul');

        this.darkTheme = this.themeOptions.querySelector('li[theme="dark"]');
        this.lightTheme = this.themeOptions.querySelector('li[theme="light"]');

        this.originalSidebar = this.sidebarOptions.querySelector('li[color="original"]');
        this.softSidebar = this.sidebarOptions.querySelector('li[color="soft"]');

        this.dropdowns = [this.themeInput, this.sidebarColorInput];
        this.dropdownOptions = [this.themeOptions, this.sidebarOptions];
    }

    #eventListeners() {
        this.lightTheme.addEventListener('click', () => {this.#lightMode()});
        this.darkTheme.addEventListener('click', () => {this.#darkmode()});
        this.originalSidebar.addEventListener('click', () => {this.#originalColor()});
        this.softSidebar.addEventListener('click', () => {this.#softColor()});
        this.settingsView.addEventListener('click', (event) => {
            const excludedContainers = ['.theme-dropdown','.sidebar-color-dropdown'];

            // Check if the click was on a dropdown.
            if (excludedContainers.some(selector => event.target.closest(selector))) {
                return;
            } this.dropdownHelper.closeDropdowns();
        });
    }
}