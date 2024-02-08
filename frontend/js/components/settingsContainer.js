import { CNode } from "../util/CNode.js";

export class SettingsContainer {
    constructor(view) {
        this.view = view;

        this.themeIconLight = 'fa-solid fa-circle-half-stroke fa-flip-horizontal';
        this.themeIconDark = 'fa-solid fa-circle fa-flip-horizontal';

        // Creating HTMl elements
        this.HOST = CNode.create('div', {'class': 'settings-container'});
        this.UPPER = CNode.create('div', {'class': 'settings-container-upper'});
        this.LOWER = CNode.create('div', {'class': 'settings-container-lower'});
        this.H1 = CNode.create('h1', {'textContent': 'Settings'});
        this.THEME_SPAN = CNode.create('span', {'textContent': 'Theme'});
        this.THEME_ICON = CNode.create('i', {'class': 'fa-solid fa-circle-half-stroke fa-flip-horizontal', 'id': 'theme-btn'});

        this.attachEventListeners();
        return this.render();
    }

    render() {
        this.HOST.appendChild(this.UPPER);
        this.HOST.appendChild(this.LOWER);
        this.UPPER.appendChild(this.H1);
        this.LOWER.appendChild(this.THEME_SPAN);
        this.THEME_SPAN.appendChild(this.THEME_ICON);
        return this.HOST
    }

    attachEventListeners() {
        this.THEME_ICON.addEventListener('click', () => {this.view.updateTheme()});
    }
}