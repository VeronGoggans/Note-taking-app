import { CNode } from "../util/CNode.js";

export class NoContentMessage {
    constructor() {
        this.HOST = CNode.create('div', {'class': 'no-content-container'});
        this.CIRCLE = CNode.create('div', {'class': 'no-content-circle'});
        this.LIGHTBULB = CNode.create('i', {'class': 'fa-solid fa-lightbulb'});
        this.H2 = CNode.create('h2', {'textContent': 'No Results Found'})
        this.P = CNode.create('p', {'textContent': 'Try to create a note or a folder.'});
        
        return this.render();
    }

    render() {
        this.HOST.appendChild(this.CIRCLE);
        this.CIRCLE.appendChild(this.LIGHTBULB);
        this.HOST.appendChild(this.H2);
        this.HOST.appendChild(this.P);
        return this.HOST;
    }
}