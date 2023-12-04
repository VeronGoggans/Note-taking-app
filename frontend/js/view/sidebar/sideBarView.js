export class SidebarView {
    constructor() {
        window.addEventListener('resize', () => this.sidebarWidth());
        this._sidebar = document.querySelector('.sidebar');
        this._wrapper = document.querySelector('.wrapper');
        this._collapsed = false;
    }


    sidebarWidth() {
        if (window.innerWidth < 730) {
            this._wrapper.style.gridTemplateColumns = '70px 1fr';
            this._collapsed = true;
        } else if (window.innerWidth >= 730 && this._collapsed === true) {
            this._wrapper.style.gridTemplateColumns = '220px 1fr';
            this._collapsed = false;
        }
    }
}