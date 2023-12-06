import { LitElement, html } from 'lit';


class MyElement extends LitElement {
    
    render() {
        return html `
            <p>Hello world</p>
        `
    }
}

customElements.define('my-element', MyElement);
