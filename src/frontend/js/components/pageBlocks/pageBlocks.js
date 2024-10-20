class DescriptionPageBlock extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }
    

    render() {
        this.innerHTML = `
            <span class="page-property">
                <i class="bi bi-grip-vertical"></i>Description
            </span>
            <p class="description-block-content">
                <span class="description-block-placeholder">Add your description here...</span>
            </p>
        `;
    }
}

customElements.define('description-page-block', DescriptionPageBlock)