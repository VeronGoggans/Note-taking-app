// This class is independent and does not get instantiated by any parent class

class SidebarView {
    constructor() {
        window.addEventListener('resize', () => this.sidebarWidth());
        this._sidebar = document.querySelector('.sidebar');
        this._wrapper = document.querySelector('.wrapper');
        this._createNoteButton = document.querySelector('.create-note-btn');
        this._createSNoteSpan = this._createNoteButton.querySelector('span');
        this._backButton = document.querySelector('.exit-folder-btn');
        this._backSpan = this._backButton.querySelector('span');
        this._homeButton = document.querySelector('.home-screen-btn');
        this._homeSpan = this._homeButton.querySelector('span');
        this._settingsButton = document.querySelector('.settings-btn');
        this._settingsSpan = this._settingsButton.querySelector('span');
        this._collapsed = false;
    }

    /**
     * This method is called when the screen width 
     * becomes smaller then 700 pixels
     */
    collapseButtons() {
        this._createSNoteSpan.textContent = '';
        this._backSpan.textContent = '';
        this._homeSpan.textContent = '';
        this._settingsSpan.textContent = '';
    }

    
    /**
     * This method is called when the screen width 
     * becomes bigger then 700 pixels
     */
    openButtons() {
        this._createSNoteSpan.textContent = 'Note';
        this._backSpan.textContent = 'Back';
        this._homeSpan.textContent = 'Home';
        this._settingsSpan.textContent = 'Settings';
    }


    /**
     * This method checks if the app should display 
     * it's small version or large version.
     * 
     * This method is called when the window resizes
     */
    sidebarWidth() {
        if (window.innerWidth < 700) {
            this._collapsed = true;
            this.collapseButtons();
        } else if (window.innerWidth >= 700 && this._collapsed === true) {
            this._collapsed = false;
            this.openButtons();
        }
    }
}

// Instantiate a SidebarView object 
const VIEW = new SidebarView();