import { CNode } from "../../util/CNode.js";

export class NoteExportModal {
    constructor(view) {
        this.view = view;
        this.HOST = CNode.create('div', {'class': 'note-export-modal'});
        this.H2 = CNode.create('h2', {'textContent': 'Export'})
        this.TXT_BTN = CNode.create('button', {'textContent': 'Txt format'});
        this.PDF_BTN = CNode.create('button', {'textContent': 'Pdf format'});

        return this.#render()
    }

    #render() {
        this.HOST.appendChild(this.H2);
        this.HOST.appendChild(this.TXT_BTN);
        this.HOST.appendChild(this.PDF_BTN);
        return this.HOST
    }
}