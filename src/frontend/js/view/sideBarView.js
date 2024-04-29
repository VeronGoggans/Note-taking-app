// This class is independent and does not get instantiated by any parent class

class SidebarView {
    constructor() {
        window.addEventListener('resize', () => this.resizeSidebar());
        this._sidebar = document.querySelector('.sidebar');
        this._icon = document.querySelector('.logo');
        this._icon.addEventListener('click', () => {this.toggleSidebar()});
        this._wrapper = document.querySelector('.wrapper');
        this._createNoteButton = document.querySelector('.create-note-btn');
        this._createNoteSpan = this._createNoteButton.querySelector('span');
        this._plusIcon = this._createNoteButton.querySelector('i');
        this._backButton = document.querySelector('.exit-folder-btn');
        this._backSpan = this._backButton.querySelector('span');
        this._backIcon = this._backButton.querySelector('i');
        this._homeButton = document.querySelector('.home-screen-btn');
        this._homeSpan = this._homeButton.querySelector('span');
        this._homeIcon = this._homeButton.querySelector('i');
        this._themeButton = document.querySelector('.settings-btn');
        this._themeSpan = this._themeButton.querySelector('span');
        this._themeIcon = this._themeButton.querySelector('i');
        this._collapsed = false;
        this._size = 'standard';
    }

    /**
     * This method is called when the screen width 
     * becomes smaller then 700 pixels
     */
    collapseButtons() {
        this._createNoteSpan.style.position = 'absolute'
        this._backSpan.style.position = 'absolute'
        this._homeSpan.style.position = 'absolute'
        this._themeSpan.style.position = 'absolute'

        this._createNoteSpan.textContent = ''
        this._backSpan.textContent = ''
        this._homeSpan.textContent = ''
        this._themeSpan.textContent = ''

        // positioning the buttons
        this._homeIcon.style.position = 'relative';
        this._backIcon.style.position = 'relative';
        this._plusIcon.style.position = 'relative';
        this._themeIcon.style.position = 'relative';

        this._homeIcon.style.left = '0';
        this._backIcon.style.left = '0';
        this._plusIcon.style.left = '0';
        this._themeIcon.style.left = '0';

        this._homeButton.style.justifyContent = 'center';
        this._backButton.style.justifyContent = 'center';
        this._createNoteButton.style.justifyContent = 'center';
        this._themeButton.style.justifyContent = 'center';
        document.querySelector('.logo-container').style.justifyContent = 'center'
        document.querySelector('.logo-text').textContent = '';
    }
    
    /**
     * This method is called when the screen width 
     * becomes bigger then 700 pixels
     */
    openButtons() {
        let currentTheme = document.body.classList.toString();
        this._createNoteSpan.style.position = 'relative'
        this._backSpan.style.position = 'relative'
        this._homeSpan.style.position = 'relative'
        this._themeSpan.style.position = 'relative'

        this._createNoteSpan.textContent = 'Note'
        this._backSpan.textContent = 'Back'
        this._homeSpan.textContent = 'Home'
        this._themeSpan.textContent = currentTheme.toString().charAt(0).toUpperCase() + currentTheme.slice(1);
        
        // positioning the buttons
        this._homeIcon.style.position = 'absolute';
        this._backIcon.style.position = 'absolute';
        this._plusIcon.style.position = 'absolute';
        this._themeIcon.style.position = 'absolute';

        this._homeIcon.style.left = '5px';
        this._backIcon.style.left = '5px';
        this._plusIcon.style.left = '5px';
        this._themeIcon.style.left = '5px';

        this._homeButton.style.justifyContent = 'normal';
        this._backButton.style.justifyContent = 'normal';
        this._createNoteButton.style.justifyContent = 'normal';
        this._themeButton.style.justifyContent = 'normal';

        document.querySelector('.logo-container').style.justifyContent = 'normal'
        document.querySelector('.logo-text').textContent = 'ote';
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