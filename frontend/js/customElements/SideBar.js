const SIDEBAR_TEMPLATE = document.createElement('template');
SIDEBAR_TEMPLATE.innerHTML = `
    <style>
    position: relative;
    display: block;
    padding: 10px;
    background-color: #f3f6fc;
    </style>
`


class SideBar extends HTMLElement {
    constructor() {
        super()
        const _shadow = this.attachShadow({ mode:'open' })
        _shadow.append(SIDEBAR_TEMPLATE.content.cloneNode(true));
        this.title = _shadow.querySelector('')
        this.innerHTML = `<h3>${this.innerText}</h3>`
    }

}


customElements.define('side-bar', SideBar);