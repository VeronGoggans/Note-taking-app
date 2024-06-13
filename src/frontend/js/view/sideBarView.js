// This class is independent and does not get instantiated by any parent class

class SidebarView {
    constructor() {
        window.addEventListener('resize', () => this.resizeSidebar());
        this._sidebar = document.querySelector('.sidebar');
        this._icon = document.querySelector('.logo');
        this._icon.addEventListener('click', () => {this.toggleSidebar()});
        this._wrapper = document.querySelector('.wrapper');
        this._buttonCount = 7;

        this._createNoteButton = document.querySelector('.create-note-btn');
        this._createNoteSpan = this._createNoteButton.querySelector('span');
        this._plusIcon = this._createNoteButton.querySelector('i');

        this._templatesButton = document.querySelector('.templates-btn');
        this._templatesSpan = this._templatesButton.querySelector('span');
        this._templateIcon = this._templatesButton.querySelector('i');

        this._favoritesButton = document.querySelector('.favorites-btn');
        this._favoritesSpan = this._favoritesButton.querySelector('span');
        this._favoritesIcon = this._favoritesButton.querySelector('i');

        this._backButton = document.querySelector('.exit-folder-btn');
        this._backSpan = this._backButton.querySelector('span');
        this._backIcon = this._backButton.querySelector('i');

        this._homeButton = document.querySelector('.home-screen-btn');
        this._homeSpan = this._homeButton.querySelector('span');
        this._homeIcon = this._homeButton.querySelector('i');

        this._themeButton = document.querySelector('.settings-btn');
        this._themeSpan = this._themeButton.querySelector('span');
        this._themeIcon = this._themeButton.querySelector('i');

        this._flashCardButton = document.querySelector('.flash-cards-btn');
        this._flashCardSpan = this._flashCardButton.querySelector('span');
        this._flashCardIcon = this._flashCardButton.querySelector('i');

        this._collapsed = false;
        this._size = 'standard';
        this._sidebarButtons = [this._homeButton, this._backButton, this._createNoteButton,this._flashCardButton, this._templatesButton, this._favoritesButton, this._themeButton]
        this._sidebarSpans = [this._homeSpan, this._backSpan, this._createNoteSpan,this._flashCardSpan, this._templatesSpan, this._favoritesSpan, this._themeSpan]
        this._sidebarIcons = [this._homeIcon, this._backIcon, this._plusIcon,this._flashCardIcon, this._templateIcon, this._favoritesIcon, this._themeIcon]
        
    }

    /**
     * This method is called when the screen width 
     * becomes smaller then 700 pixels
     */
    collapseButtons() {
        for (let i = 0; i < this._buttonCount; i++) {
            this._sidebarSpans[i].style.position = 'absolute';
            this._sidebarSpans[i].textContent = '';

            this._sidebarIcons[i].style.position = 'relative';
            this._sidebarIcons[i].style.left = 0;

            this._sidebarButtons[i].style.justifyContent = 'center';
        }

        document.querySelector('.logo-container').style.justifyContent = 'center'
        document.querySelector('.logo-text').textContent = '';
    }
    
    /**
     * This method is called when the screen width 
     * becomes bigger then 700 pixels
     */
    openButtons() {
        let currentTheme = document.body.classList.toString().charAt(0).toUpperCase() + document.body.classList.toString().slice(1);
        const buttonText = ['Home', 'Back', 'Document', 'Flash cards', 'Templates', 'Favorites', currentTheme]
        for (let i = 0; i < this._buttonCount; i++) {
            this._sidebarSpans[i].style.position = 'relative';
            this._sidebarSpans[i].textContent = buttonText[i];

            this._sidebarIcons[i].style.position = 'absolute';
            this._sidebarIcons[i].style.left = '10px';

            this._sidebarButtons[i].style.justifyContent = 'normal';
        }

        document.querySelector('.logo-container').style.justifyContent = 'normal'
        document.querySelector('.logo-text').textContent = 'eutron';
    }

    toggleSidebar() {
        if (this._sidebar.offsetWidth === 220) {
            this._wrapper.style.transition = '150ms'
            this._wrapper.style.gridTemplateColumns = '70px 1fr';
            this._sidebar.dataset.width = 'small'; 
            this._removeTransition();
            this.collapseButtons();
        } else {
            this._wrapper.style.transition = '150ms'
            this._wrapper.style.gridTemplateColumns = '220px 1fr';
            this._sidebar.dataset.width = 'large';
            this._removeTransition();
            this.openButtons();
        }
    }

    _removeTransition() {
        setTimeout(() => {
            this._wrapper.style.transition = '0ms'
        }, 160);
    }

    /**
     * This method checks if the app should display 
     * it's small version or large version.
     * 
     * This method is called when the window resizes
     */
    resizeSidebar() {
        if (window.innerWidth < 700) {
            this._wrapper.style.gridTemplateColumns = '70px 1fr';
            this._sidebar.dataset.width = 'small';
            this.collapseButtons();
        } else {
            if (this._sidebar.dataset.width !== 'small') {
                this._wrapper.style.gridTemplateColumns = '220px 1fr';
                this.openButtons();
            }
        }
    }
}

// Instantiate a SidebarView object 
const VIEW = new SidebarView();