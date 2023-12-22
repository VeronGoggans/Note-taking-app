class SidebarView {
    constructor() {
        window.addEventListener('resize', () => this.sidebarWidth());
        this._sidebar = document.querySelector('.sidebar');
        this._wrapper = document.querySelector('.wrapper');
        this._createNoteButton = document.querySelector('.create-note-btn');
        this._backButton = document.querySelector('.exit-folder-btn');
        this._homeButton = document.querySelector('.home-screen-btn');
        this._collapsed = false;
    }

    collapseButtons() {
        console.log('collapse buttons');
        this._createNoteButton.textContent = '';
        this._backButton.textContent = '';
        this._homeButton.textContent = '';
    }


    sidebarWidth() {
        if (window.innerWidth < 700) {
            this._collapsed = true;
            this.collapseButtons();
        } else if (window.innerWidth >= 730 && this._collapsed === true) {
            this._collapsed = false;
        }
    }
}

const VIEW = new SidebarView();