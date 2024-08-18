// This class is independent and does not get instantiated by any parent class

export class SidebarView {
    constructor(applicationController) {
        this.applicationController = applicationController;
        window.addEventListener('resize', () => this.#resizeSidebar());
        this._sidebar = document.querySelector('.sidebar');
        this._icon = document.querySelector('.logo');
        this._icon.addEventListener('click', () => {this.#toggleSidebar()});
        this._wrapper = document.querySelector('.wrapper');
        this._buttonCount = 6;

        this._templatesButton = document.querySelector('.templates-btn');
        this._templatesSpan = this._templatesButton.querySelector('span');
        this._templateIcon = this._templatesButton.querySelector('i');

        this._notesButton = document.querySelector('.notes-btn');
        this._notesSpan = this._notesButton.querySelector('span');
        this._notsIcon = this._notesButton.querySelector('i');

        this._homeButton = document.querySelector('.home-btn');
        this._homeSpan = this._homeButton.querySelector('span');
        this._homeIcon = this._homeButton.querySelector('i');

        this._settingsButton = document.querySelector('.settings-btn');
        this._themeSpan = this._settingsButton.querySelector('span');
        this._themeIcon = this._settingsButton.querySelector('i');

        this._flashCardButton = document.querySelector('.flashcards-btn');
        this._flashCardSpan = this._flashCardButton.querySelector('span');
        this._flashCardIcon = this._flashCardButton.querySelector('i');

        this._stickyWallButton = document.querySelector('.sticky-wall-btn');
        this._stickyWallSapn = this._stickyWallButton.querySelector('span');
        this._stickyWallIcon = this._stickyWallButton.querySelector('i');

        this._collapsed = false;
        this._size = 'standard';
        this._sidebarButtons = [this._homeButton,this._notesButton,this._flashCardButton , this._templatesButton, this._stickyWallButton, this._settingsButton]
        this._sidebarSpans = [this._homeSpan, this._notesSpan, this._flashCardSpan, this._templatesSpan, this._stickyWallSapn, this._themeSpan]
        this._sidebarIcons = [this._homeIcon, this._notsIcon, this._flashCardIcon, this._templateIcon, this._stickyWallIcon, this._themeIcon]

        document.querySelectorAll('.sidebar .sidebar-content a').forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();

                const anchor = event.target.closest('a[data-view]')
                if (anchor) {
                    if (anchor.getAttribute('data-view') === 'notes') {
                        applicationController.initView('notes', { folder: {'id': 'f-1', 'name': 'Home'} });
                        return;
                    }
                    applicationController.initView(anchor.getAttribute('data-view'));
                }
            });
        });
    }

    /**
     * This method is called when the screen width 
     * becomes smaller then 700 pixels
     */
    #collapseButtons() {
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
    #openButtons() {
        const buttonText = ['Home', 'Notes', 'Flashcards', 'Templates', 'Sticky wall', 'Settings']
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

    #toggleSidebar() {
        if (this._sidebar.offsetWidth === 220) {
            this._wrapper.style.transition = '150ms'
            this._wrapper.style.gridTemplateColumns = '70px 1fr';
            this._sidebar.dataset.width = 'small'; 
            this.#removeTransition();
            this.#collapseButtons();
        } else {
            this._wrapper.style.transition = '150ms'
            this._wrapper.style.gridTemplateColumns = '220px 1fr';
            this._sidebar.dataset.width = 'large';
            this.#removeTransition();
            this.#openButtons();
        }
    }

    #removeTransition() {
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
    #resizeSidebar() {
        if (window.innerWidth < 940) {
            this._wrapper.style.gridTemplateColumns = '70px 1fr';
            this._sidebar.dataset.width = 'small';
            this.#collapseButtons();
        } else {
            if (this._sidebar.dataset.width !== 'small') {
                this._wrapper.style.gridTemplateColumns = '220px 1fr';
                this.#openButtons();
            }
        }
    }
}