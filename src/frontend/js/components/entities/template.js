import { CNode } from "../../util/CNode.js";
import { dateFormat } from "../../util/date.js";
import { formatName, filterNotePreview } from "../../util/formatters.js";

export class Template {
    constructor(template, view) {
        this.id = template.id;
        this.name = template.name;
        this.content = template.content;
        this.created = dateFormat(template.creation);
        this.lastEdit = dateFormat(template.last_edit);
        this.view = view;

        this.#initElements();
        this.#eventListeners();
        return this.#render();
    }

    #initElements() {
        this.HOST = CNode.create('div', { 'class': 'note', 'id': this.id});
        this.HOST.dataset.info = `${this.created}--${this.lastEdit}`;
        this.NAME_BOX = CNode.create('div', { 'class': 'note-name-box' });
        this.H4 = CNode.create('h4', {'textContent': formatName(this.name)});
        this.CONTENT_BOX = CNode.create('div', { 'class': 'note-content-box' });
        this.CONTENT = CNode.create('p', { 'innerHTML': filterNotePreview(this.content) });
        this.UTIL_BAR = CNode.create('div', { 'class': 'note-util-bar' });
        this.DELETE_ICON = CNode.create('i', { 'class': 'fa-solid fa-trash' });
    }

    #render() {
        this.NAME_BOX.append(this.H4);
        this.CONTENT_BOX.appendChild(this.CONTENT);
        this.UTIL_BAR.append(this.DELETE_ICON);
        this.HOST.append(this.NAME_BOX, this.CONTENT_BOX, this.UTIL_BAR);
        return this.HOST
    }

    #eventListeners() {
        this.H4.addEventListener('keydown', (event) => {if (event.key === 'Enter') this.updateName()});
        this.DELETE_ICON.addEventListener('click', () => {this.view.renderDeleteModal(this.id, this.name)});
        this.CONTENT_BOX.addEventListener('click', () => {this.view.handleTemplateCardClick(this.id)});
    }
}