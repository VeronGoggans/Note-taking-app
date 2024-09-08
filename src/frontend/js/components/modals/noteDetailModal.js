import { CNode } from "../../util/CNode.js";
import { dateFormat } from "../../util/date.js";

export class NoteDetailContainer {
    constructor(noteInfo) {
        this.editor = document.querySelector('.editor');
        this.HOST = CNode.create('div', {'class': 'note-details-modal'});
        this.HOST.innerHTML = `
            <h2>Note details</h2>
            <table>
                <tr>
                    <td class="property"><i class="fa-solid fa-file"></i> Words</td>
                    <td class="property-value" id="word-count"></td>
                </tr>
                <tr>
                    <td class="property"><i class="fa-solid fa-clock"></i> Date created</td>
                    <td class="property-value" id="created-date"></td>
                </tr>
                <tr>
                    <td class="property"><i class="fa-solid fa-pen"></i> Last change made </td>
                    <td class="property-value" id="last-change"></td>
                </tr>
            </table>
        `
        
        this.HOST.querySelector('#word-count').textContent = this.#getWordCount();
        this.HOST.querySelector('#created-date').textContent = this.#checkDateForNull(noteInfo.creation);
        this.HOST.querySelector('#last-change').textContent = this.#checkDateForNull(noteInfo.last_edit);
        return this.HOST;
    }

    #checkDateForNull(date) {
        return date === null ? 'Not available' : dateFormat(date);
    }

    #getWordCount() {
        let text = this.editor.innerText;
        return text.split(/[ \n]+/).length;
    }
}