class PreviousViewButton extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {        
        this.render();
        this.addEventListener('click', this.handleClick.bind(this));
    }


    render() {
        this.innerHTML = `
            <i class="bi bi-arrow-left"></i>
        `
    }

    handleClick() {
        this.dispatchEvent(new CustomEvent('PreviousViewButtonClick', { bubbles: true }));
    }
}

customElements.define('previous-view-button', PreviousViewButton);